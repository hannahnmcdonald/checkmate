// seeds/seed_users.js
exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ]);
};
