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
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is missing' });
        }
        const profile = await getFullUserProfile(userId);
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error fetching /me:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default meRoute;
