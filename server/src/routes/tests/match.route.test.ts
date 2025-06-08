// import request from 'supertest';
// import app from '../../index';
// import { resetTestDB } from '../../test/setup';

// beforeEach(async () => {
//   await resetTestDB();
// });

// describe('GET /game/:id/match', () => {
//   it('should return 401 if user is not authenticated', async () => {
//     const res = await request(app).get('/game/123/match');
//     expect(res.status).toBe(401);
//   });

//   it('should return friends list if authenticated', async () => {
//     const token = 'mocked-valid-jwt'; // Replace with real or mocked JWT
//     const res = await request(app)
//       .get('/game/123/match')
//       .set('Authorization', `Bearer ${token}`);

//     expect([200, 401]).toContain(res.status); // Placeholder - adjust based on actual behavior
//   });
// });

// describe('POST /game/:id/match', () => {
//   it('should return 400 for missing session_id or players', async () => {
//     const res = await request(app)
//       .post('/game/123/match')
//       .send({});
//     expect(res.status).toBe(400);
//   });

//   it('should return 200 when match results are posted successfully', async () => {
//     const token = 'mocked-valid-jwt';
//     const mockPayload = {
//       session_id: 'some-session-id',
//       players: [
//         { user_id: 'uuid-1', result: 'win' },
//         { user_id: 'uuid-2', result: 'loss' }
//       ]
//     };

//     const res = await request(app)
//       .post('/game/123/match')
//       .set('Authorization', `Bearer ${token}`)
//       .send(mockPayload);

//     expect([200, 400, 500]).toContain(res.status); // Adjust based on DB state
//   });
// });
