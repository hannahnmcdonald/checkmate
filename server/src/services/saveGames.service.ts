import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

export async function dbRemoveUserGame(userId: string, game_id: string, category: string) {
    await db('user_games')
        .where({ user_id: userId, game_id, category })
        .del();
}

export async function dbGetUserGamesWithDetails(userId: string, category?: string) {
    const query = db('user_games')
        .where({ user_id: userId })
        .select('game_id', 'category', 'created_at');

    if (category === 'wishlist' || category === 'collection') {
        query.andWhere({ category });
    }

    const userGames = await query;

    const gameDetails = await Promise.all(
        userGames.map(async (game) => {
            try {
                const response = await axios.get(`https://www.boardgamegeek.com/xmlapi2/thing?id=${game.game_id}`);
                return {
                    ...game,
                    bgg: response.data
                };
            } catch (err) {
                return { ...game, bgg: null };
            }
        })
    );

    return gameDetails;
}
