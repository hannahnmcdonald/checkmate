import { db } from '../db/knex';
import withPrivacy from '../utils/withPrivacy.util';

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
    return await db('user_game_session')
        .where('user_id', userId)
        .select('*')
        .orderBy('updated_at', 'desc')
        .limit(5)
};

export async function getUserProfile(targetId: string) {

    const [user, stats, games, sessions, friends, privacy] = await Promise.all([
        db('users').where('id', targetId).first(),
        db('user_stats').where('user_id', targetId).first(),
        db('user_games').where('user_id', targetId),
        getUserSessions(targetId),
        getUserFriends(targetId),
        db('user_privacy').where('user_id', targetId).first(),
    ]);

    const isFriend = getUserFriends !== null;
    console.log('isFriend', isFriend);

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
    const [user, stats, games, sessions, friends] = await Promise.all([
        db('users').where('id', userId).select('username', 'first_name', 'last_name', 'avatar').first(),
        db('user_stats').where('user_id', userId).first(),
        db('user_games').where('user_id', userId),
        db('user_game_session as ugs')
            .where('ugs.user_id', userId)
            .join('game_sessions as gs', 'gs.id', 'ugs.session_id')
            .select('gs.id as session_id', 'gs.game_id', 'gs.started_at')
            .orderBy('gs.started_at', 'desc')
            .limit(10),
        db('friendships as f')
            .where(function () {
                this.where('f.user_id_1', userId).orWhere('f.user_id_2', userId);
            })
            .andWhere('f.status', 'accepted')
            .join('users as u', function () {
                this.on('u.id', '=', db.raw(`
            (CASE WHEN f.user_id_1 = ? THEN f.user_id_2 ELSE f.user_id_1 END)
          `, [userId]));
            })
            .select('u.id', 'u.username', 'u.first_name', 'u.last_name'),
    ]);

    return {
        user,
        stats: stats || { wins: 0, losses: 0, ties: 0 },
        games: {
            wishlist: games.filter(g => g.category === 'wishlist'),
            collection: games.filter(g => g.category === 'collection'),
        },
        recentSessions: sessions,
        friends,
    };
}


export default { getUserProfile, getFullUserProfile };
