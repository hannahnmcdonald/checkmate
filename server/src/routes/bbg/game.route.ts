import { Router } from 'express';
import { getBoardGameDetails } from '../../services/bbg/game.service';

const game = Router();

game.get('/game/:id', async(req, res) => { 

    const gameId = req.params.id;

    if (!gameId) {
        res.status(400).json({ error: 'Missing game ID parameter' });
        return;
     }

    try {
        const gameDetails = await getBoardGameDetails(gameId);
        res.json({ game: gameDetails });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch game details from BoardGameGeek' });
    }
});

export default game;