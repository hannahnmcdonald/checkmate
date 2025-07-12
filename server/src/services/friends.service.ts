import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';
import { createNotification } from './createNotification';
import { withTransaction } from '../db/withTransaction';

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
  const [user_id_1, user_id_2] = [userA, userB].sort();

  await withTransaction(async (trx) => {
    await trx('friendships').insert({
      id: uuidv4(),
      user_id_1,
      user_id_2,
      status: 'pending',
      created_at: new Date()
    });

    const sender = await trx('users').where({ id: user_id_1 }).first();

    await createNotification({
      trx,
      recipientId: user_id_2,
      senderId: user_id_1,
      message: `${sender?.username ?? 'Someone'} sent you a friend request`,
      type: 'friend_request',
    });

  });
}

export async function acceptFriendRequest(userA: string, userB: string): Promise<number> {
  const [user_id_1, user_id_2] = [userA, userB].sort();

  return await withTransaction(async (trx) => {
    const updatedRows = await trx('friendships')
      .where({ user_id_1, user_id_2, status: 'pending' })
      .update({
        status: 'accepted',
        updated_at: new Date()
      });

    const sender = await trx('users').where({ id: user_id_2 }).first();

    await createNotification({
      trx,
      recipientId: user_id_1,
      senderId: user_id_2,
      message: `${sender?.username ?? 'Your friend'} accepted your request`,
      type: 'friend_accept'
    });
    return updatedRows;
  });
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
