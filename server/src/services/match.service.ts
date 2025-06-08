import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';
import { withTransaction } from '../db/withTransaction';

interface MatchPlayer {
  user_id: string;
  result: 'win' | 'tie' | 'loss';
}

export async function getMatchFriends(userId: string) {

    try {
        const friends = await db('friendships')
        .where({ user_id: userId, status: 'accepted' })
        .orWhere({ friend_id: userId, status: 'accepted' })
        .join('users', function () {
        this.on('users.id', '=', db.raw('CASE WHEN friendships.user_id = ? THEN friendships.friend_id ELSE friendships.user_id END', [userId]));
        })
        .select('users.id', 'users.username', 'users.avatar');

    return friends;
    } catch (error) {
        console.error('Error retrieving friends:', error);
        throw error;
    }

}

export async function finalizeMatch(sessionId: string, players: MatchPlayer[]) {
  await withTransaction(async (trx) => {
    await trx('game_sessions')
      .where({ id: sessionId })
      .update({ ended_at: trx.fn.now() });

    for (const player of players) {
      await trx('user_game_session').insert({
        id: uuidv4(),
        session_id: sessionId,
        user_id: player.user_id,
        result: player.result,
        created_at: trx.fn.now(),
        updated_at: trx.fn.now(),
      });

      const fieldToUpdate =
        player.result === 'win' ? 'wins' :
        player.result === 'tie' ? 'ties' :
        player.result === 'loss' ? 'losses' : null;

      if (!fieldToUpdate) throw new Error(`Invalid result: ${player.result}`);

      await trx('user_stats')
        .where({ user_id: player.user_id })
        .increment(fieldToUpdate, 1)
        .update({ updated_at: trx.fn.now() });
    }
  });
}