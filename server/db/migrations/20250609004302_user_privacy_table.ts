import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('user_privacy', (table) => {
        table.uuid('user_id').primary().references('id').inTable('users').onDelete('CASCADE');

        table.enum('stats', ['public', 'friends', 'private']).notNullable().defaultTo('friends');
        table.enum('games', ['public', 'friends', 'private']).notNullable().defaultTo('friends');
        table.enum('friends', ['public', 'friends', 'private']).notNullable().defaultTo('friends');
        table.enum('sessions', ['public', 'friends', 'private']).notNullable().defaultTo('private');
        table.enum('avatar', ['public', 'friends', 'private']).notNullable().defaultTo('public');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_privacy');
}
