import { Router, Request, Response } from 'express';
import { searchBoardGames } from '../services/search.service';

const router = Router();

interface SearchQuery {
  q?: string;
}

router.get<{}, any, any, SearchQuery>(
  '/search',
  async (req: Request<{}, any, any, SearchQuery>, res: Response): Promise<void> => {
    const query = req.query.q;

    if (!query) {
      res.status(400).json({ error: 'Missing query parameter: q' });
      return;
    }

    try {
      const games = await searchBoardGames(query);
      res.json({ games });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch data from BoardGameGeek' });
    }
  }
);

export default router;
