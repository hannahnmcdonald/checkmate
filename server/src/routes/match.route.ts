import { Router } from 'express';
import { getMatchFriends, finalizeMatch } from '../services/match.service';
// import protectedRoute from './auth/protected.route';
import { protectedRoute } from '../middleware/authMiddleware';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { id: string; [key: string]: any };
}

const matchRoute = Router();

matchRoute.get('/game/:id/match', protectedRoute, async (req: AuthenticatedRequest, res) => {
    console.log('match GET', req.user, req.params)
  const userId = req.user?.id;
  const gameId = req.params.id;

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const friends = await getMatchFriends(userId);
    res.json({ friends });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch friends' });
  }
});

matchRoute.post('/game/:id/match', protectedRoute, async (req, res) => {
  const { session_id, players } = req.body;

  if (!session_id || !players || !Array.isArray(players)) {
    return res.status(400).json({ error: 'Missing session_id or players' });
  }

  try {
    await finalizeMatch(session_id, players);
    res.status(200).json({ message: 'Match results recorded successfully' });
  } catch (err) {
    console.error('POST /game/:id/match error:', err);
    res.status(500).json({ error: 'Failed to record match results' });
  }
});

export default matchRoute;