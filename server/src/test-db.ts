import knex from 'knex';
import knexfileConfig from '../knexfile';

// Ensure config has the correct structure
const { development, ...restConfig } = knexfileConfig;
const configWithDevelopment: KnexConfig = {
  development: development || {},
  ...restConfig,
};
interface KnexConfig {
  development: object;
  [key: string]: any; // Allow properties of any type
}

const typedConfig: KnexConfig = configWithDevelopment;
const db = knex(typedConfig.development); // ensure this is the right environment
console.log('✅ Connecting to DB in development mode', db.client.config.client);
async function testConnection() {
  try {
    console.log('Connecting to DB...');
    console.log('DB Config:', {
      client: db.client.config.client,
        host: db.client.config.connection?.host,
        port: db.client.config.connection?.port,
        database: db.client.config.connection?.database,
    });
    const result = await db.raw('SELECT 1+1 AS result');
    console.log('Connected! Result:', result.rows);
  } catch (err) {
    console.error('DB ERROR:', err);
  } finally {
    await db.destroy(); // ✅ important!
  }
}

testConnection();