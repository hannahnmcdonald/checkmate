// import { knex as setupKnex } from 'knex';
// import knexConfig from '../../knexfile';

// export const testDb = setupKnex(knexConfig.test);

// export async function resetTestDB() {
//   await testDb.migrate.rollback(undefined, true);
//   await testDb.migrate.latest();
//   await testDb.seed.run();
// }

// // beforeAll(async () => {
// //   await resetTestDB();
// // });

// // afterAll(async () => {
// //   await testDb.destroy();
// // });
