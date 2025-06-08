import { Router } from 'express';
import { protectedRoute } from '../middleware/authMiddleware';
import { searchUsersByUsername } from '../services/friends.service';
import { Request } from 'express';

const friendRoute = Router();

interface AuthenticatedRequest extends Request {
    user?: { id: string; [key: string]: any };
}

friendRoute.get('/friendsearch', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const query = req.query.query as string;
    const userId = req.user?.id || '';
  
    if (!query || query.trim().length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }
  
    try {
      const results = await searchUsersByUsername(query, userId);
      res.json({ results });
    } catch (err) {
      console.error('Error searching users:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
});

export default friendRoute;
  