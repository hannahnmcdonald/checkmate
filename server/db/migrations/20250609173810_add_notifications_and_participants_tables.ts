import { Knex } from 'knex';

export async function up(knex: Knex) {
    await knex.schema.createTable('game_session_participants', (table) => {
        table.uuid('id').primary();
        table.uuid('game_session_id').notNullable()
            .references('id').inTable('game_sessions').onDelete('CASCADE');

        table.uuid('user_id').nullable(); // null = external guest
        table.string('name').nullable();  // required if user_id is null

        table.boolean('is_external').notNullable().defaultTo(false);
        table.enum('result', ['win', 'loss', 'tie']).nullable();
        table.boolean('approved').nullable(); // true = accepted result, false = rejected, null = no response yet

        table.uuid('invited_by').nullable()
            .references('id').inTable('users').onDelete('SET NULL');

        table.timestamp('responded_at').nullable();
        table.timestamps(true, true); // created_at, updated_at
    });

    await knex.schema.createTable('notifications', (table) => {
        table.uuid('id').primary();

        table.uuid('recipient_id').notNullable()
            .references('id').inTable('users').onDelete('CASCADE');

        table.uuid('sender_id')
            .references('id').inTable('users').onDelete('SET NULL');

        table.enum('type', [
            'friend_request',
            'friend_accept',
            'match_invite',
            'match_result',
            'match_updated',
            'achievement'
        ]).notNullable();

        table.uuid('reference_id').nullable(); // e.g. friendship or game_session
        table.text('message').nullable();

        table.boolean('read').notNullable().defaultTo(false);
        table.timestamp('read_at').nullable();

        table.boolean('deleted_by_user').notNullable().defaultTo(false);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    await knex.schema.dropTableIfExists('notifications');
    await knex.schema.dropTableIfExists('game_session_participants');
}
