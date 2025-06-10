import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';


export async function getAllFriends(userId: string) {
  try {
    const results = await db('friendships as f')
      .where(function () {
        this.where('f.user_id_1', userId).orWhere('f.user_id_2', userId);
      })
      .andWhere('f.status', 'accepted')
      .join('users as u', function () {
        this.on('u.id', '=', db.raw(
          'CASE WHEN f.user_id_1 = ? THEN f.user_id_2 ELSE f.user_id_1 END',
          [userId]
        ));
      })
      .select('u.id', 'u.username', 'u.avatar')
      .distinctOn('u.id');

    return results;

  } catch (error) {
    console.error('Error retrieving friends list', error);
    throw new Error('Failed to retrieve friends list');
  }
}

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
};

export async function addFriendRequest(userA: string, userB: string) {
  const [user_id_1, user_id_2] = [userA, userB].sort(); // enforce order for symmetric model

  await db('friendships').insert({
    id: uuidv4(),
    user_id_1,
    user_id_2,
    status: 'pending',
    created_at: new Date()
  });
};

export async function acceptFriendRequest(userA: string, userB: string): Promise<number> {
  const [user_id_1, user_id_2] = [userA, userB].sort(); // normalize order

  const updatedRows = await db('friendships')
    .where({ user_id_1, user_id_2, status: 'pending' })
    .update({
      status: 'accepted',
      updated_at: new Date()
    });

  return updatedRows; // 0 if no row updated, 1 if success
}

export async function declineFriendRequest(userA: string, userB: string): Promise<number> {
  const [user_id_1, user_id_2] = [userA, userB].sort();

  const deletedRows = await db('friendships')
    .where({ user_id_1, user_id_2, status: 'pending' })
    .del();

  return deletedRows; // 1 if deleted, 0 if not found
}

export async function getIncomingFriendRequests(userId: string) {
  return await db('friendships as f')
    .where('f.status', 'pending')
    .andWhere(function () {
      this.where('f.user_id_1', '!=', userId)
        .andWhere('f.user_id_2', '=', userId);
    })
    .join('users as u', 'u.id', 'f.user_id_1') // requester
    .select('u.id', 'u.username', 'u.avatar', 'f.created_at');
}

export async function getOutgoingFriendRequests(userId: string) {
  return await db('friendships as f')
    .where('f.status', 'pending')
    .andWhere('f.user_id_1', '=', userId)
    .join('users as u', 'u.id', 'f.user_id_2') // recipient
    .select('u.id', 'u.username', 'u.avatar', 'f.created_at');
}


export default { searchUsersByUsername, addFriendRequest, acceptFriendRequest, declineFriendRequest };
