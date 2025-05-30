import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface BoardGame {
  id: string;
  name: string;
  yearPublished?: string;
}

export async function searchBoardGames(query: string): Promise<BoardGame[]> {
  const url = 'https://boardgamegeek.com/xmlapi/search';
  try {
    const response = await axios.get(url, {
      params: { search: query },
    });

    const result = await parseStringPromise(response.data);
    const games = result.boardgames?.boardgame || [];

    return games.map((game: any) => ({
      id: game.$.objectid,
      name: Array.isArray(game.name) ? game.name[0]._ : game.name._,
      yearPublished: game.yearpublished?.[0] || undefined,
    }));
  } catch (error) {
    console.error('Error fetching data from BGG:', error);
    throw new Error('Failed to fetch data from BoardGameGeek');
  }
}
