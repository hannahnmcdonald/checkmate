import { Router } from 'express';
import { getBoardGameDetails, getTrendingGames } from '../services/game.service';

const game = Router();

game.get('/game/trending', async (req, res) => {
    try {
        const games = await getTrendingGames()

        if (!games || games.length === 0) {
            console.warn('No trending games found');
            return res.status(404).json({ error: 'No trending games found' });
        }
        res.setHeader('Cache-Control', 'no-store')
        res.json(games)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch trending games' })
    }
})

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