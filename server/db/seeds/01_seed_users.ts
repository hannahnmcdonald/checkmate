import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

let password: string;

(async () => {
  password = await bcrypt.hash('hunter2', 10);
})();

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    {
      id: uuidv4(),
      email: 'alice@example.com',
      username: 'alice',
      password: password,
      first_name: 'Alice',
      last_name: 'Anderson',
      avatar: 'https://example.com/avatar1.png',
    },
    {
      id: uuidv4(),
      email: 'bob@example.com',
      username: 'bob',
      password: password,
      first_name: 'Bob',
      last_name: 'Brown',
      avatar: 'https://example.com/avatar2.png',
    },
    {
      id: uuidv4(),
      email: 'carol@example.com',
      username: 'carol',
      password: password,
      first_name: 'Carol',
      last_name: 'Cox',
      avatar: 'https://example.com/avatar3.png',
    }
  ]);
}