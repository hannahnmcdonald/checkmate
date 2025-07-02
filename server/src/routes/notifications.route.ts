import { Router } from 'express';
import {
    getAllNotifications,
    markNotificationsRead,
    markAllNotificationsRead,
    deleteNotification,
    clearReadNotifications
} from '../services/notifications.service';

import { protectedRoute } from '../middleware/authMiddleware';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: { id: string;[key: string]: any };
}

const notificationRoute = Router();

// GET /notifications
notificationRoute.get('/notifications', protectedRoute, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.id;
    console.log('NOTIFICATIONS', userId)

    try {
        const notifications = await getAllNotifications(userId)
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH /notifications/:id/read
notificationRoute.patch('/notifications/:id/read', protectedRoute, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.id;
    const notificationId = req.params.id;

    try {
        await markNotificationsRead(userId, notificationId)
        res.status(204).send();
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PATCH /notifications/mark-all-read
notificationRoute.patch('/notifications/mark-all-read', protectedRoute, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.id;

    try {
        await markAllNotificationsRead(userId)
        res.status(204).send();
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /notifications/:id
notificationRoute.delete('/notifications/:id', protectedRoute, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.id;
    const notificationId = req.params.id;

    try {
        await deleteNotification(userId, notificationId)
        res.status(204).send();
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /notifications/clear-read
notificationRoute.delete('/clear-read', protectedRoute, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const userId = req.user.id;

    try {
        await clearReadNotifications(userId)
        res.status(204).send();
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default notificationRoute;
