import { db } from '../db/knex';
import withPrivacy from '../utils/withPrivacy.util';
import { getBoardGameDetails } from './game.service';

// TODO: this is a duplicate of the one in the friends service 
export async function getUserFriends(userId: string) {
    return await db('friendships as f')
        .where(function () {
            this.where('f.user_id_1', userId).orWhere('f.user_id_2', userId);
        })
        .andWhere('f.status', 'accepted')
        .join('users as u', function () {
            this.on('u.id', '=', db.raw(
                'CASE WHEN f.user_id_1 = ? THEN f.user_id_2 ELSE f.user_id_1 END',
                [userId]
            ));
        })
        .select('u.id', 'u.username', 'u.avatar')
        .distinctOn('u.id');
};

export async function getUserSessions(userId: string) {

    if (!userId) {
        console.error('getUserSessions called without userId');
        throw new Error('userId is required');
    }

    const recentSessionsRaw = await db('game_session_participants as gsp')
        .where('gsp.user_id', userId)
        .join('game_sessions as gs', 'gs.id', 'gsp.game_session_id')
        .select(
            'gs.id as session_id',
            'gs.game_id',
            'gs.started_at',
            'gsp.result as result'
        )
        .orderBy('gs.started_at', 'desc')
        .limit(10);

    // get gme details from recent sessions using BGG
    const recentSessions = await Promise.all(
        recentSessionsRaw.map(async (session) => {
            const gameData = await getBoardGameDetails(session.game_id);

            const players = await db('game_session_participants as gsp')
                .join('users as u', 'u.id', 'gsp.user_id')
                .where('gsp.game_session_id', session.session_id)
                .andWhereNot('gsp.user_id', userId)
                .select('u.id as user_id', 'u.username', 'u.avatar');

            return {
                session_id: session.session_id,
                started_at: session.started_at,
                game_id: session.game_id,
                title: gameData?.name || 'Unknown',
                image: gameData?.image || null,
                result: session.result || null,
                players
            };
        })
    );
    return recentSessions;
};

export async function getUserProfile(targetId: string) {

    console.log('targetId', targetId)

    const [user, stats, games, sessions, friends, privacy] = await Promise.all([
        db('users').where('id', targetId).first(),
        db('user_stats').where('user_id', targetId).first(),
        db('user_games').where('user_id', targetId),
        getUserSessions(targetId),
        getUserFriends(targetId),
        db('user_privacy').where('user_id', targetId).first(),
    ]);

    const isFriend = getUserFriends !== null;

    return {
        user: {
            username: user.username,
            avatar: withPrivacy(user.avatar, privacy.avatar, targetId, isFriend),
            first_name: withPrivacy(user.first_name, 'private', targetId, isFriend),
            last_name: withPrivacy(user.last_name, 'private', targetId, isFriend),
        },
        stats: withPrivacy(stats || { wins: 0, losses: 0, ties: 0 }, privacy.stats, targetId, isFriend),
        games: {
            wishlist: withPrivacy(games.filter((g: { category: string; }) => g.category === 'wishlist'), privacy.games, targetId, isFriend),
            collection: withPrivacy(games.filter((g: { category: string; }) => g.category === 'collection'), privacy.games, targetId, isFriend)
        },
        recentSessions: withPrivacy(sessions, privacy.sessions, targetId, isFriend),
        friends: withPrivacy(friends, privacy.friends, targetId, isFriend)
    };
}


export async function getFullUserProfile(userId: string) {
    const [user, stats, games, friends] = await Promise.all([
        db('users')
            .where('id', userId)
            .select('username', 'first_name', 'last_name', 'avatar')
            .first(),
        db('user_stats').where('user_id', userId).first(),
        db('user_games').where('user_id', userId),
        db('friendships as f')
            .where(function () {
                this.where('f.user_id_1', userId).orWhere('f.user_id_2', userId);
            })
            .andWhere('f.status', 'accepted')
            .join('users as u', function () {
                this.on('u.id', '=', db.raw(
                    `(CASE WHEN f.user_id_1 = ? THEN f.user_id_2 ELSE f.user_id_1 END)`,
                    [userId]
                ));
            })
            .select('u.id', 'u.username', 'u.first_name', 'u.last_name'),
    ]);

    // Handle the case where user does not exist
    if (!user) {
        throw new Error(`User with id ${userId} not found`);
    }

    // Now safe to use user.id
    const userRecentSessions = await getUserSessions(user.id);

    return {
        user,
        stats: stats || { wins: 0, losses: 0, ties: 0 },
        games: {
            wishlist: games.filter(g => g.category === 'wishlist'),
            collection: games.filter(g => g.category === 'collection'),
        },
        recentSessions: userRecentSessions,
        friends,
    };
}



export default { getUserProfile, getFullUserProfile };
