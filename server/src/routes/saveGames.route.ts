import { Router } from 'express';
import { protectedRoute } from '../middleware/authMiddleware';
import { Request } from 'express';
import {
    dbSaveUserGame,
    dbRemoveUserGame,
    dbGetUserGamesWithDetails,
    dbGetUserSavedGames,
    dbGetUserGameSaveStatus
} from '../services/saveGames.service'

interface AuthenticatedRequest extends Request {
    user?: { id: string;[key: string]: any };
}

const saveGamesRoute = Router();

saveGamesRoute.post('/save-game', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;
    const { game_id, category } = req.body;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        await dbSaveUserGame(userId, game_id, category);
        res.status(201).json({ message: 'Game saved' });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Game already saved in this category' });
        }
        res.status(500).json({ error: 'Failed to save game' });
    }
});

saveGamesRoute.delete('/remove-game', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;
    const { game_id, category } = req.body;
    console.log(game_id, category, userId)

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        await dbRemoveUserGame(userId, game_id, category);
        res.status(200).json({ message: 'Game removed' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove game' });
    }
})

saveGamesRoute.get('/saved-games/:gameId', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;
    const { gameId } = req.params;

    if (!userId || !gameId) {
        return res.status(400).json({ error: 'Missing user ID or game ID' });
    }

    try {
        const status = await dbGetUserGameSaveStatus(userId, gameId);
        res.json(status);
    } catch (err) {
        console.error('Error fetching saved status:', err);
        res.status(500).json({ error: 'Failed to fetch saved status' });
    }
});

// ?sortBy=created_at&sortOrder=asc|desc
saveGamesRoute.get('/game-by-category', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const {
        category,
        page = '1',
        limit = '10',
        sortBy = 'created_at',
        sortOrder = 'desc'
    } = req.query;

    try {
        const games = await dbGetUserGamesWithDetails(
            userId,
            category as string,
            parseInt(page as string, 10),
            parseInt(limit as string, 10),
            sortBy as string,
            (['asc', 'desc'].includes(sortOrder as string) ? (sortOrder as 'asc' | 'desc') : 'desc')
        );
        res.status(200).json(games);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

saveGamesRoute.get('/saved-games', protectedRoute, async (req: AuthenticatedRequest, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const savedGames = await dbGetUserSavedGames(userId);
        res.json({ savedGames });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch saved games' });
    }
});


export default saveGamesRoute;