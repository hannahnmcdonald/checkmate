import { Router } from 'express';
import { getBoardGameDetails, getTrendingGames } from '../services/game.service';

const game = Router();

let cachedGames: any[] | null = null;
let cacheExpires = 0;

game.get('/game/trending', async (req, res) => {
    const now = Date.now();

    if (cachedGames && now < cacheExpires) {
        console.log('Serving trending games from cache');
        res.setHeader('Cache-Control', 'max-age=36000');
        return res.json(cachedGames);
    }

    try {
        const games = await getTrendingGames();

        if (!games || games.length === 0) {
            console.warn('No trending games found');
            return res.status(404).json({ error: 'No trending games found' });
        }

        cachedGames = games;
        cacheExpires = now + 3600 * 1000; // cache for 1 hour

        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.status(200).json(games);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch trending games' });
    }
});

game.get('/game/:id', async (req, res) => {
    const gameId = req.params.id;

    if (!gameId) {
        res.status(400).json({ error: 'Missing game ID parameter' });
        return;
    }

    try {
        const gameDetails = await getBoardGameDetails(gameId);
        res.json({ game: gameDetails });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Game not found on BoardGameGeek' });
    }
});

export default game;