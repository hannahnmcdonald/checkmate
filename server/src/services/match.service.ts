import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';
import { withTransaction } from '../db/withTransaction';

interface MatchPlayer {
  user_id: string;
  result: 'win' | 'tie' | 'loss';
}

export async function getMatchFriends(userId: string, gameId: string) {

    try {
        const friends = await db('friendships as f')
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
    

        console.log('Friends:', friends);

        const session_id = uuidv4();

        await withTransaction(async (trx) => {
          await trx('game_sessions').insert({
            id: session_id,
            started_at: trx.fn.now(),
            game_id: gameId
          });
        });
    
        return { friends, session_id };

    } catch (error) {
        console.error('Error retrieving friends:', error);
        throw error;
    }

}

export async function finalizeMatch(sessionId: string, players: MatchPlayer[]) {
  try {
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

            console.log('Field to Update:', fieldToUpdate)
    
          if (!fieldToUpdate) throw new Error(`Invalid result: ${player.result}`);
    
          await trx('user_stats')
          .insert({
            id: uuidv4(),
            user_id: player.user_id,
            wins: fieldToUpdate === 'wins' ? 1 : 0,
            losses: fieldToUpdate === 'losses' ? 1 : 0,
            ties: fieldToUpdate === 'ties' ? 1 : 0,
            updated_at: trx.fn.now()
          })
          .onConflict('user_id')
          .merge({
            [fieldToUpdate]: trx.raw(`"user_stats"."${fieldToUpdate}" + 1`),
            updated_at: trx.fn.now()
          });
        }
      });
    } catch (error) {
        console.error('Error saving game session:', error);
        throw error;
    }
  }
  
    