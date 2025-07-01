import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
// import { parseStringPromise } from 'xml2js';

interface BoardGameDetails {
  id: string;
  name: string;
  yearPublished?: string;
  description?: string;
  imageUrl?: string;
  thumbnail?: string;
  minPlayers?: number;
  maxPlayers?: number;
  playingTime?: number;
  categories?: string[];
  mechanics?: string[];
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

export async function searchBoardGames(query: string): Promise<BoardGameDetails[]> {
  const searchUrl = 'https://boardgamegeek.com/xmlapi2/search';

  try {
    // Step 1: Search
    const searchRes = await axios.get(searchUrl, {
      params: { query, type: 'boardgame' },
    });
    const searchParsed = parser.parse(searchRes.data);
    const items = Array.isArray(searchParsed.items?.item)
      ? searchParsed.items.item
      : [searchParsed.items?.item].filter(Boolean);

    // TODO: Add more here? Add pagination?
    // Limit to top 10 results for performance
    const limitedItems = items.slice(0, 10);

    // Step 2: Fetch details for each ID
    const detailedGames = await Promise.all(
      limitedItems.map(async (item: any) => {
        const id = item['@_id'];

        const thingRes = await axios.get(`https://boardgamegeek.com/xmlapi2/thing`, {
          params: { id, stats: 1 },
        });

        const thingParsed = parser.parse(thingRes.data);
        const thing = thingParsed.items?.item;

        return {
          id,
          name: Array.isArray(thing.name)
            ? thing.name.find((n: any) => n['@_type'] === 'primary')?.['@_value'] || 'Unknown'
            : thing.name?.['@_value'] || 'Unknown',
          yearPublished: thing.yearpublished?.['@_value'],
          description: thing.description || '',
          imageUrl: thing.image || '',
          thumbnail: thing.thumbnail || '',
          minPlayers: thing.minplayers?.['@_value']
            ? parseInt(thing.minplayers['@_value'], 10)
            : undefined,
          maxPlayers: thing.maxplayers?.['@_value']
            ? parseInt(thing.maxplayers['@_value'], 10)
            : undefined,
          playingTime: thing.playingtime?.['@_value']
            ? parseInt(thing.playingtime['@_value'], 10)
            : undefined,
        };
      })
    );

    return detailedGames;
  } catch (error) {
    console.error('Error fetching board game data:', error);
    throw new Error('Failed to fetch board game data.');
  }
}
