import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Rename the old columns first
  await knex.schema.alterTable('friendships', (table) => {
    table.renameColumn('user_id', 'old_user_id');
    table.renameColumn('friend_id', 'old_friend_id');
  });

  // Add new columns as nullable first
  await knex.schema.alterTable('friendships', (table) => {
    table.uuid('user_id_1');
    table.uuid('user_id_2');
  });

  // Populate user_id_1 and user_id_2 by normalizing order
  const rows = await knex('friendships').select('id', 'old_user_id', 'old_friend_id');

  for (const row of rows) {
    const [id1, id2] = [row.old_user_id, row.old_friend_id].sort();
    await knex('friendships')
      .where('id', row.id)
      .update({ user_id_1: id1, user_id_2: id2 });
  }

  // Now that values are filled, alter to set NOT NULL
  await knex.schema.alterTable('friendships', (table) => {
    table.uuid('user_id_1').notNullable().alter();
    table.uuid('user_id_2').notNullable().alter();
  });

  // Drop old columns
  await knex.schema.alterTable('friendships', (table) => {
    table.dropColumn('old_user_id');
    table.dropColumn('old_friend_id');
  });

  // Add unique constraint on the symmetric friendship pair
  await knex.schema.alterTable('friendships', (table) => {
    table.unique(['user_id_1', 'user_id_2'], 'unique_friendship_pair');
  });
}

export async function down(knex: Knex): Promise<void> {
  // Restore old columns
  await knex.schema.alterTable('friendships', (table) => {
    table.uuid('user_id');
    table.uuid('friend_id');
  });

  // Copy values back
  const rows = await knex('friendships').select('id', 'user_id_1', 'user_id_2');

  for (const row of rows) {
    await knex('friendships')
      .where('id', row.id)
      .update({
        user_id: row.user_id_1,
        friend_id: row.user_id_2
      });
  }

  // Remove unique constraint and new columns
  await knex.schema.alterTable('friendships', (table) => {
    table.dropUnique(['user_id_1', 'user_id_2'], 'unique_friendship_pair');
    table.dropColumn('user_id_1');
    table.dropColumn('user_id_2');
  });
}
