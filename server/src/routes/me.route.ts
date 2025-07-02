import { Router } from 'express';
import { getFullUserProfile } from '../services/profile.service';
import { protectedRoute } from '../middleware/authMiddleware';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { id: string;[key: string]: any };
}

const meRoute = Router();

meRoute.get('/me', protectedRoute, async (req: AuthenticatedRequest, res) => {
    try {
        console.log('REQ.USER in /me route:', req.user);
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const profile = await getFullUserProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching /me:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default meRoute;
