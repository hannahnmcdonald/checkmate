import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('friendships').del();

  const users = await knex('users').select('id', 'username');

  const alice = users.find(u => u.username === 'alice');
  const bob = users.find(u => u.username === 'bob');
  const carol = users.find(u => u.username === 'carol');

  if (!alice || !bob || !carol) throw new Error('Missing seed users');

  await knex('friendships').insert([
    { id: uuidv4(), user_id: alice.id, friend_id: bob.id, status: 'accepted' },
    { id: uuidv4(), user_id: bob.id, friend_id: alice.id, status: 'accepted'},
    { id: uuidv4(), user_id: alice.id, friend_id: carol.id, status: 'accepted' },
    { id: uuidv4(), user_id: carol.id, friend_id: alice.id, status: 'accepted' },
  ]);
}
