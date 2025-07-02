import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const bggCache = new Map<string, any>();

// Fetch BGG is now checking if the cache has the game first so we can limit api calls
// this will reset every 1 hr
async function fetchBggGame(gameId: string) {
    if (bggCache.has(gameId)) {
        return bggCache.get(gameId);
    }
    const response = await axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`);
    bggCache.set(gameId, response.data);
    return response.data;
}

/**
 * Saves a game to the user_games table
 * @param userId 
 * @param game_id 
 * @param category Enum - either 'wishlist' or 'collection'
 */
export async function dbSaveUserGame(userId: string, game_id: string, category: string) {
    if (!['wishlist', 'collection'].includes(category)) {
        throw new Error('Invalid category');
    }

    await db('user_games').insert({
        id: uuidv4(),
        user_id: userId,
        game_id,
        category,
        created_at: new Date(),
    });
}

/**
 * Removes a game from the user's saved games
 * @param userId 
 * @param game_id 
 * @param category Enum - either 'wishlist' or 'collection'
 */
export async function dbRemoveUserGame(userId: string, game_id: string, category: string) {
    await db('user_games')
        .where({ user_id: userId, game_id, category })
        .del();
}

/**
 * GETs all the games of the specific category that the user has saved
 * @param userId 
 * @param category Enum - either 'wishlist' or 'collection'
 * @param page which page the user is trying to request
 * @param limit how many results max this call with return
 * @param sortBy example: 'created_at'
 * @param sortOrder asc or desc
 * @returns The games of the specific category that the user has saved, with the limit and page # in mind and with the sorting parameters
 */
export async function dbGetUserGamesWithDetails(
    userId: string,
    category?: string,
    page = 1,
    limit = 10,
    sortBy = 'created_at',
    sortOrder: 'asc' | 'desc' = 'desc'
) {
    const offset = (page - 1) * limit;
    // only sorting options I will support as of *now*
    const validSortFields = ['created_at', 'category'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'created_at';

    // Get the data first 
    const baseQuery = db('user_games')
        .where({ user_id: userId })
        .modify((qb) => {
            if (category === 'wishlist' || category === 'collection') {
                qb.andWhere({ category });
            }
        });

    // transform the data to work with our parameters of limit and sortBy
    const totalQuery = baseQuery.clone().count('* as total');
    const resultsQuery = baseQuery.clone()
        .select('game_id', 'category', 'created_at')
        .limit(limit)
        .offset(offset)
        .orderBy(sortField, sortOrder);

    // calculating the total amount of results && how many pages this will translate too
    const [totalResult, userGames] = await Promise.all([totalQuery, resultsQuery]);
    const total = parseInt(totalResult[0].total, 10);
    const totalPages = Math.ceil(total / limit);

    // fetch the data for each game to return - we want to see some game details on the list for a great UI experience
    const gameDetails = await Promise.all(
        userGames.map(async (game: any) => {
            try {
                const bggData = await fetchBggGame(game.game_id);
                return {
                    ...game,
                    bgg: bggData,
                };
            } catch (err) {
                return { ...game, bgg: null };
            }
        })
    );

    return { total, totalPages, currentPage: page, games: gameDetails };
}

// TODO: Add error handling
export async function dbGetUserSavedGames(userId: string) {
    return await db("user_games")
        .select("game_id", "category")
        .where("user_id", userId);
}

