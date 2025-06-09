import { db } from '../db/knex';

export async function getUserProfile(targetUserId: string, viewerId: string) {
    const user = await db('users')
        .where('id', targetUserId)
        .first('id', 'username', 'avatar', 'first_name', 'last_name', 'created_at');

    if (!user) throw new Error('User not found');

    const stats = await db('user_stats')
        .where('user_id', targetUserId)
        .first('wins', 'ties', 'losses');

    const games = await db('user_games')
        .where('user_id', targetUserId)
        .select('game_id', 'category'); // category: 'wishlist' or 'collection'

    const recentSessions = await db('user_game_session as ugs')
        .where('ugs.user_id', targetUserId)
        .join('game_sessions as gs', 'gs.id', 'ugs.session_id')
        .select('gs.id as session_id', 'gs.game_id', 'gs.started_at')
        .orderBy('gs.started_at', 'desc')
        .limit(10);

    const friends = await db('friendships as f')
        // check that user is either the friend-er or the friend-ee
        .where(function () {
            this.where('f.user_id_1', targetUserId).orWhere('f.user_id_2', targetUserId);
        })
        .andWhere('f.status', 'accepted')
        .join('users as u', function () {
            this.on('u.id', '=', db.raw(`
              (CASE
                WHEN f.user_id_1 = ? THEN f.user_id_2
                ELSE f.user_id_1
              END)
            `, [targetUserId]));
        })
        .select('u.id', 'u.username', 'u.first_name', 'u.last_name');

    // Optional: if viewer is not the profile owner, hide some fields
    const isSelf = viewerId === targetUserId;
    if (!isSelf) {
        delete user.first_name;
        delete user.last_name;
        // optionally restrict friends, wishlist, stats, etc
    }

    return {
        user,
        stats: stats || { wins: 0, ties: 0, losses: 0 },
        games: {
            wishlist: games.filter(g => g.category === 'wishlist'),
            collection: games.filter(g => g.category === 'collection'),
        },
        recentSessions,
        friends,
    };
}

export default { getUserProfile };
