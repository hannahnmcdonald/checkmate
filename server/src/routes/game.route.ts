import { Router } from 'express';
import { getBoardGameDetails, getTrendingGames } from '../services/game.service';

const game = Router();

game.get('/game/trending', async (req, res) => {
    console.log('Received request for trending games');
    try {
        const games = await getTrendingGames()

        if (!games || games.length === 0) {
            console.warn('No trending games found');
            return res.status(404).json({ error: 'No trending games found' });
        }
        res.setHeader('Cache-Control', 'no-store')
        console.log('Trending games fetched:', games)
        res.json(games)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch trending games' })
    }
})

game.get('/game/:id', async (req, res) => {
    console.log("Hit /game/:id route, id =", req.params.id);
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