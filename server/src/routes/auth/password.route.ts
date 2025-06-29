import { Router } from 'express';
import { protectedRoute } from '../../middleware/authMiddleware';
import { Request } from 'express';
import { changeUserPassword, forgotPassword, resetPassword, updateProfile } from '../../services/auth/password.service';

const passwordRoute = Router();

interface AuthenticatedRequest extends Request {
    user?: { id: string;[key: string]: any };
}

passwordRoute.patch('/update-profile', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;
    const { first_name, last_name, username, avatar } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await updateProfile(first_name, last_name, username, avatar, userId);
        res.status(200).json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

passwordRoute.patch('/change-password', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;
    const { current_password, new_password } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    try {
        await changeUserPassword(current_password, new_password, userId)
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to change password' });
    }
});

passwordRoute.post('/forgot-password', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const { email } = req.body;

    try {
        await forgotPassword(email)
        res.status(200).json({ message: 'If user exists, password reset sent' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

passwordRoute.post('/reset-password', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const { token } = req.params;
    const { new_password } = req.body;

    try {
        await resetPassword(token, new_password)
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

export default passwordRoute;


