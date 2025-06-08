import axios from 'axios';
import { parseStringPromise } from 'xml2js';

interface BoardGameDetails {
  id: string;
  name: string;
  yearPublished?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  minPlayers?: number;
  maxPlayers?: number;
  playingTime?: number;
}

export async function getBoardGameDetails(gameId: string): Promise<BoardGameDetails> {
  const url = `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}&stats=1`;

  try {
    const response = await axios.get(url);
    const result = await parseStringPromise(response.data, { explicitArray: false });

    const item = result.items.item;

    const details: BoardGameDetails = {
      id: item.$.id,
      name: Array.isArray(item.name)
        ? item.name.find((n: any) => n.$.type === 'primary')?.$.value
        : item.name.$.value,
      yearPublished: item.yearpublished?.$.value,
      description: item.description,
      image: item.image,
      thumbnail: item.thumbnail,
      minPlayers: item.minplayers?.$.value ? parseInt(item.minplayers.$.value, 10) : undefined,
      maxPlayers: item.maxplayers?.$.value ? parseInt(item.maxplayers.$.value, 10) : undefined,
      playingTime: item.playingtime?.$.value ? parseInt(item.playingtime.$.value, 10) : undefined,
    };

    return details;
  } catch (error) {
    console.error('Error fetching game details from BGG:', error);
    throw new Error('Failed to fetch game details from BoardGameGeek');
  }
}