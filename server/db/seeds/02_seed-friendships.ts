import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing rows
  await knex('friendships').del();

  // Get user IDs
  const users = await knex('users').select('id', 'username');
  const alice = users.find(u => u.username === 'alice');
  const bob = users.find(u => u.username === 'bob');
  const carol = users.find(u => u.username === 'carol');

  if (!alice || !bob || !carol) throw new Error('Missing seed users');

  // Helper to normalize and create a symmetric friendship
  const makeFriendship = (userA: string, userB: string) => {
    const [user_id_1, user_id_2] = [userA, userB].sort();
    return {
      id: uuidv4(),
      user_id_1,
      user_id_2,
      status: 'accepted',
      created_at: new Date()
    };
  };

  // Insert only one row per pair
  await knex('friendships').insert([
    makeFriendship(alice.id, bob.id),
    makeFriendship(alice.id, carol.id),
  ]);
}
