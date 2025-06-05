import knex, { Knex } from 'knex';
import config from '../../knexfile'
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';
const envConfig = config[environment];

if (!envConfig) {
  throw new Error(`❌ No Knex config found for NODE_ENV="${environment}"`);
}

const db = knex(envConfig);

export { db };