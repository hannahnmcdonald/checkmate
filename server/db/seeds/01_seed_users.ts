import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  await knex('user_privacy').del();
  await knex('users').del();

  const password = await bcrypt.hash('hunter2', 10);

  const users = [
    {
      id: uuidv4(),
      email: 'alice@example.com',
      username: 'alice',
      password,
      first_name: 'Alice',
      last_name: 'Anderson',
      avatar: 'https://example.com/avatar1.png',
    },
    {
      id: uuidv4(),
      email: 'bob@example.com',
      username: 'bob',
      password,
      first_name: 'Bob',
      last_name: 'Brown',
      avatar: 'https://example.com/avatar2.png',
    },
    {
      id: uuidv4(),
      email: 'carol@example.com',
      username: 'carol',
      password,
      first_name: 'Carol',
      last_name: 'Cox',
      avatar: 'https://example.com/avatar3.png',
    },
  ];

  await knex('users').insert(users);

  const privacy = users.map((user, i) => ({
    user_id: user.id,
    stats: i === 0 ? 'friends' : 'public',
    games: i === 1 ? 'private' : 'friends',
    friends: 'friends',
    sessions: 'private',
    avatar: 'public',
    created_at: new Date(),
    updated_at: new Date(),
  }));

  await knex('user_privacy').insert(privacy);
}
