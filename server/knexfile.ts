import type { Knex } from 'knex';
import path from 'path';
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
      directory: path.join(__dirname, 'db', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds'),
    },
  },
};

export default config;