import { Router } from 'express';
import { protectedRoute } from '../middleware/authMiddleware';
import { getUserProfile } from '../services/profile.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { id: string;[key: string]: any };
}

const profileRoute = Router();

profileRoute.get(['/profile', '/profile/:userId'], protectedRoute, async (req: AuthenticatedRequest, res) => {
    const viewerId = req.user?.id || '';
    const targetUserId = req.params.userId || viewerId;

    try {
        const profile = await getUserProfile(targetUserId, viewerId);
        res.json({ profile });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default profileRoute;