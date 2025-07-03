import { Router } from 'express';
import { protectedRoute } from '../middleware/authMiddleware';
import {
  getAllFriends,
  searchUsersByUsername,
  addFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getIncomingFriendRequests,
  getOutgoingFriendRequests
} from '../services/friends.service';
import { Request } from 'express';

const friendRoute = Router();

interface AuthenticatedRequest extends Request {
  user?: { id: string;[key: string]: any };
}

friendRoute.get('/friends', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id;

  console.log('userId', userId)

  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const friendsList = await getAllFriends(userId);
    res.json(friendsList)
  } catch (error) {
    console.log('Error retrieving friends list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

friendRoute.get('/friends/search', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const query = req.query.q as string;
  const userId = req.user?.id || '';
  console.log('query', query, req.query.q)

  if (!query || query.trim().length < 2) {
    return res.status(400).json({ message: 'Search query must be at least 2 characters' });
  }

  try {
    const results = await searchUsersByUsername(query, userId);
    res.json(results);
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

friendRoute.post('/friend', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id || '';
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: 'Missing user or friend ID' });
  }

  if (userId === friendId) {
    return res.status(400).json({ message: 'Cannot friend yourself' });
  }

  try {
    await addFriendRequest(userId, friendId);
    res.status(201).json({ message: 'Friend request sent' });
  } catch (err: any) {
    if (err.code === '23505') { // unique constraint violation
      return res.status(409).json({ message: 'Friendship already exists' });
    }
    console.error('Error adding friend:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// TODO: Need to account on FE for friendship already existing

friendRoute.post('/friend/accept', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id || '';
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: 'Missing user or friend ID' });
  }

  if (userId === friendId) {
    return res.status(400).json({ message: 'Cannot accept your own friend request' });
  }

  try {
    const updated = await acceptFriendRequest(userId, friendId);
    if (!updated) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error('Error accepting friend request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

friendRoute.post('/friend/decline', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id || '';
  const { friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: 'Missing user or friend ID' });
  }

  if (userId === friendId) {
    return res.status(400).json({ message: 'Cannot decline yourself' });
  }

  try {
    const deleted = await declineFriendRequest(userId, friendId);

    if (!deleted) {
      return res.status(404).json({ message: 'No pending request found' });
    }

    res.status(200).json({ message: 'Friend request declined' });
  } catch (err) {
    console.error('Error declining friend request:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

friendRoute.get('/friends/incoming', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id || '';

  try {
    const requests = await getIncomingFriendRequests(userId);
    res.json({ requests });
  } catch (err) {
    console.error('Error fetching incoming requests:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

friendRoute.get('/friends/outgoing', protectedRoute, async (req: AuthenticatedRequest, res) => {
  const userId = req.user?.id || '';

  try {
    const requests = await getOutgoingFriendRequests(userId);
    res.json({ requests });
  } catch (err) {
    console.error('Error fetching outgoing requests:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default friendRoute;
