import { Router, Request } from 'express';
import {
  createMatch,
  respondToMatch,
  finalizeMatch
} from '../services/match.service';
import { protectedRoute } from '../middleware/authMiddleware';
import { db } from '../db/knex';

interface AuthenticatedRequest extends Request {
  user?: { id: string;[key: string]: any };
}

const router = Router();

// POST /match - Create match, invite users
router.post('/match', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const { game_id, invited_user_ids } = req.body;
  const creatorId = req.user?.id;

  console.log('creatorId:', creatorId, 'game_id:', game_id, 'invited_user_ids:', invited_user_ids)

  if (!creatorId || !game_id || !Array.isArray(invited_user_ids)) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  try {
    console.log("...creating")
    const sessionId = await createMatch(creatorId, game_id, invited_user_ids);
    console.log('MatchSession Created', sessionId)
    res.status(201).json({ session_id: sessionId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create match' });
  }
});

// POST /match/:id/respond - Accept/decline match
router.post('/match/:id/respond', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const { accept }: { accept: boolean } = req.body;
  const userId = req.user?.id;
  const sessionId = req.params.id;

  console.log(userId, sessionId)

  if (!accept || typeof accept !== 'boolean' || !userId) {
    return res.status(400).json({ message: 'Invalid payload' });
  }

  try {
    await respondToMatch(sessionId, userId, accept);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to respond to match' });
  }
});

// GET /match/:id - Get match info + participants
router.get('/match/:id', protectedRoute, async (req, res) => {
  const sessionId = req.params.id;

  console.log('GETTING SESSION ID', sessionId)

  try {
    const match = await db('game_sessions').where({ id: sessionId }).first();
    const participants = await db('game_session_participants')
      .leftJoin('users', 'users.id', 'game_session_participants.user_id')
      .where('game_session_id', sessionId)
      .select(
        'game_session_participants.id',
        'user_id',
        'users.username',
        'users.avatar',
        'approved',
        'result',
        'is_external',
        'name',
        'responded_at'
      );

    console.log('GET', match, participants)
    res.json({ match, participants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch match info' });
  }
});

// POST /match/:id/finalize - Submit results
router.post('/match/:id/finalize', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const sessionId = req.params.id;
  const { results } = req.body;

  if (!Array.isArray(results)) {
    return res.status(400).json({ message: 'Invalid results format' });
  }

  try {
    await finalizeMatch(sessionId, results);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to finalize match' });
  }
});

export default router;
