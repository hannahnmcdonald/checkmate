import { v4 as uuidv4 } from 'uuid';
import { withTransaction } from '../db/withTransaction';
import { createNotification } from './createNotification';

interface MatchPlayer {
  user_id: string;
  result: 'win' | 'tie' | 'loss';
}

export async function createMatch(creatorId: string, gameId: string, invitedUserIds: string[]) {
  const sessionId = uuidv4();

  await withTransaction(async (trx) => {
    await trx('game_sessions').insert({
      id: sessionId,
      game_id: gameId,
      status: 'pending',
      started_at: trx.fn.now(),
    });

    await trx('game_session_participants').insert({
      id: uuidv4(),
      game_session_id: sessionId,
      user_id: creatorId,
      is_external: false,
      approved: true,
      invited_by: creatorId,
      responded_at: trx.fn.now(),
      created_at: trx.fn.now(),
      updated_at: trx.fn.now(),
    });

    for (const userId of invitedUserIds) {
      await trx('game_session_participants').insert({
        id: uuidv4(),
        game_session_id: sessionId,
        user_id: userId,
        is_external: false,
        approved: null,
        invited_by: creatorId,
        created_at: trx.fn.now(),
        updated_at: trx.fn.now(),
      });

      await createNotification({
        trx,
        recipientId: userId,
        senderId: creatorId,
        message: `You were invited to a match`,
        type: 'match_invite',
      });
    }
  });

  return sessionId;
}

export async function respondToMatch(sessionId: string, userId: string, accept: boolean) {
  await withTransaction(async (trx) => {
    await trx('game_session_participants')
      .where({ game_session_id: sessionId, user_id: userId })
      .update({
        approved: accept,
        responded_at: trx.fn.now(),
        updated_at: trx.fn.now(),
      });

    const otherParticipants = await trx('game_session_participants')
      .where({ game_session_id: sessionId })
      .whereNot('user_id', userId)
      .whereNotNull('user_id')
      .andWhere('is_external', false)
      .select('user_id');

    const sender = await trx('users').where({ id: userId }).first();

    for (const p of otherParticipants) {
      await createNotification({
        trx,
        recipientId: p.user_id,
        senderId: userId,
        message: `${sender?.username ?? 'A player'} has ${accept ? 'accepted' : 'declined'} the match.`,
        type: 'match_updated',
      });
    }

    const [allAcceptedRow] = await trx('game_session_participants')
      .where({ game_session_id: sessionId })
      .whereNotNull('user_id')
      .andWhere('is_external', false)
      .andWhere('approved', true)
      .count('* as count');

    const [totalParticipantsRow] = await trx('game_session_participants')
      .where({ game_session_id: sessionId })
      .whereNotNull('user_id')
      .andWhere('is_external', false)
      .count('* as count');

    const allAccepted = allAcceptedRow.count === totalParticipantsRow.count;

    if (allAccepted) {
      const match = await trx('game_sessions').where({ id: sessionId }).first();

      if (match.status === 'completed') {
        const participants = await trx('game_session_participants')
          .where({ game_session_id: sessionId, approved: true, is_external: false })
          .select('user_id', 'result');

        for (const p of participants) {
          const field = p.result === 'win' ? 'wins' : p.result === 'loss' ? 'losses' : 'ties';

          await trx('user_stats')
            .insert({
              id: uuidv4(),
              user_id: p.user_id,
              [field]: 1,
              updated_at: trx.fn.now(),
            })
            .onConflict('user_id')
            .merge({
              [field]: trx.raw(`"user_stats"."${field}" + 1`),
              updated_at: trx.fn.now(),
            });
        }
      } else {
        await trx('game_sessions')
          .where({ id: sessionId })
          .update({ status: 'in_progress' });

        const participants = await trx('game_session_participants')
          .where({ game_session_id: sessionId })
          .whereNotNull('user_id')
          .andWhere('is_external', false)
          .select('user_id');

        for (const p of participants) {
          await createNotification({
            trx,
            recipientId: p.user_id,
            senderId: userId,
            message: 'The match has started!',
            type: 'match_updated',
          });
        }
      }
    }
  });
}

export async function finalizeMatch(sessionId: string, players: MatchPlayer[]) {
  await withTransaction(async (trx) => {
    await trx('game_sessions')
      .where({ id: sessionId })
      .update({
        ended_at: trx.fn.now(),
        status: 'completed',
      });

    for (const player of players) {
      await trx('game_session_participants')
        .where({ game_session_id: sessionId, user_id: player.user_id })
        .update({
          result: player.result,
          updated_at: trx.fn.now(),
        });

      await createNotification({
        trx,
        recipientId: player.user_id,
        senderId: undefined,
        message: `Your match in session ${sessionId} has been finalized with result: ${player.result}`,
        type: 'match_result',
      });
    }

    const [approvedCountRow] = await trx('game_session_participants')
      .where({ game_session_id: sessionId })
      .whereNotNull('user_id')
      .andWhere('is_external', false)
      .andWhere('approved', true)
      .count('* as count');

    const [totalMembersRow] = await trx('game_session_participants')
      .where({ game_session_id: sessionId })
      .whereNotNull('user_id')
      .andWhere('is_external', false)
      .count('* as count');

    if (approvedCountRow.count === totalMembersRow.count) {
      const confirmedPlayers = await trx('game_session_participants')
        .where({ game_session_id: sessionId, approved: true, is_external: false })
        .select('user_id', 'result');

      for (const p of confirmedPlayers) {
        const field = p.result === 'win' ? 'wins' : p.result === 'loss' ? 'losses' : 'ties';

        await trx('user_stats')
          .insert({
            id: uuidv4(),
            user_id: p.user_id,
            [field]: 1,
            updated_at: trx.fn.now(),
          })
          .onConflict('user_id')
          .merge({
            [field]: trx.raw(`"user_stats"."${field}" + 1`),
            updated_at: trx.fn.now(),
          });
      }
    }
  });
}

export default { createMatch, respondToMatch, finalizeMatch };
