import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
    const userSessions = await knex('user_game_session').select(
        'id',
        'user_id',
        'session_id as game_session_id',
        'result',
        'created_at',
        'updated_at'
    );

    for (const session of userSessions) {
        await knex('game_session_participants').insert({
            id: uuidv4(),
            user_id: session.user_id,
            game_session_id: session.game_session_id,
            name: null,
            is_external: false,
            result: session.result,
            approved: true,
            invited_by: null,
            responded_at: session.updated_at,
            created_at: session.created_at,
            updated_at: session.updated_at
        });
    }
}

export async function down(knex: Knex): Promise<void> {
  await knex('game_session_participants')
    .where({ is_external: false, invited_by: null })
    .del();
}
