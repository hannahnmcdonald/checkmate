import { Router } from 'express';
import { protectedRoute } from '../middleware/authMiddleware';
import { getUserProfile } from '../services/profile.service';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { id: string;[key: string]: any };
}

const profileRoute = Router();

profileRoute.get('/profile/:userId', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const targetUserId = req.params.userId;

    try {
        const profile = await getUserProfile(targetUserId);
        res.json({ profile });
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default profileRoute;