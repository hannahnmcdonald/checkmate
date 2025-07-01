import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import fetch from 'node-fetch'
import { XMLParser } from 'fast-xml-parser'

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

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
  categories?: string[];
  mechanics?: string[];

}

export async function getBoardGameDetails(gameId: string): Promise<BoardGameDetails> {
  const url = `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}&stats=1`;

  try {
    const response = await fetch(url);
    const xml = await response.text();
    const parsed = parser.parse(xml);

    const item = parsed.items?.item;
    const links = Array.isArray(item.link) ? item.link : [item.link];

    const categories = links
      .filter((l: { [x: string]: string; }) => l["@_type"] === "boardgamecategory")
      .map((l: { [x: string]: any; }) => l["@_value"]);

    const mechanics = links
      .filter((l: { [x: string]: string; }) => l["@_type"] === "boardgamemechanic")
      .map((l: { [x: string]: any; }) => l["@_value"]);


    if (!item || item.error) {
      console.warn(`BGG returned invalid item for ID ${gameId}`);
      throw new Error(`BoardGameGeek returned an invalid item for ID ${gameId}`);
    }

    const details: BoardGameDetails = {
      id: item["@_id"],
      name: Array.isArray(item.name)
        ? item.name.find((n: any) => n["@_type"] === "primary")?.["@_value"] || "Unknown"
        : item.name?.["@_value"] || "Unknown",
      yearPublished: item.yearpublished?.["@_value"],
      description: item.description,
      image: item.image || undefined,
      thumbnail: item.thumbnail || undefined,

      minPlayers: item.minplayers?.["@_value"]
        ? parseInt(item.minplayers["@_value"], 10)
        : undefined,
      maxPlayers: item.maxplayers?.["@_value"]
        ? parseInt(item.maxplayers["@_value"], 10)
        : undefined,
      playingTime: item.playingtime?.["@_value"]
        ? parseInt(item.playingtime["@_value"], 10)
        : undefined,
      categories,
      mechanics
    };
    console.log(details)
    return details;
  } catch (error) {
    console.error("Error fetching game details from BGG:", error);
    throw new Error("Failed to fetch game details from BoardGameGeek");
  }
}

export async function getTrendingGames() {
  const response = await fetch('https://boardgamegeek.com/xmlapi2/hot?type=boardgame');
  const xml = await response.text();
  const parsed = parser.parse(xml);

  const hotItems = parsed.items.item || [];

  const detailedGames = await Promise.all(
    hotItems.slice(0, 10).map(async (item: { [x: string]: any; name: { [x: string]: string; }; }) => {
      const id = item['@_id'];
      const name = item.name?.['@_value'] || 'Unknown';

      const detailRes = await fetch(
        `https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`
      );
      const detailXml = await detailRes.text();
      const detailParsed = parser.parse(detailXml);
      const thing = detailParsed.items?.item;

      const description = thing?.description || '';
      const minPlayers = thing?.minplayers?.['@_value'] || 1;
      const maxPlayers = thing?.maxplayers?.['@_value'] || 1;
      const imageUrl = thing?.image || thing?.thumbnail || '';

      return {
        id,
        name,
        imageUrl,
        description,
        minPlayers,
        maxPlayers,
      };
    })
  );

  return detailedGames;
}


export default { getBoardGameDetails, getTrendingGames };