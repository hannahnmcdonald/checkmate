import { Router } from 'express';
import { searchBoardGames } from '../../services/bbg/search.service';

const search = Router();

interface SearchQuery {
  q?: string;
}

search.get(
  '/search', async (req, res) => {
  const query: SearchQuery = req.query as SearchQuery;

  if (!query.q) {
    res.status(400).json({ error: 'Missing query parameter: q' }); 
    return;
  }

  try {
    const games = await searchBoardGames(query.q);
    res.json({ games });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from BoardGameGeek' });
  } 
});

export default search;
