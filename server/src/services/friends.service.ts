import { db } from '../db/knex';

export async function searchUsersByUsername(query: string, currentUserId: string) {
    try {
      const results = await db('users')
        .whereILike('username', `%${query}%`)
        .andWhereNot('id', currentUserId)
        .select('id', 'username', 'avatar')
        .limit(20);
  
      return results;
    } catch (error) {
      console.error('Error in searchUsersByUsername:', error);
      throw new Error('Failed to search users');
    }
}

export default searchUsersByUsername;
  