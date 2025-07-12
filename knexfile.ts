import path from 'path';
import dotenv from 'dotenv';

const __dirname = process.cwd();

dotenv.config({
  path: path.resolve(__dirname, 'server', '.env'),
});

const config = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT || '5432', 10),
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: path.join(__dirname, 'server', 'db', 'migrations'),
      extension: 'ts',
    },
    seeds: {
      directory: path.join(__dirname, 'server', 'db', 'seeds'),
    },
  },
};

export default config;


// npx ts-node ./node_modules/knex/bin/cli.js migrate:latest
// npx ts-node ./node_modules/knex/bin/cli.js migrate:make add_metadata_to_user_games

