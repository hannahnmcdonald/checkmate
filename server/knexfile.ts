import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '5433', 10),
      
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: './db/migrations',
      extension: 'ts',
    },
  },
};

export default config;