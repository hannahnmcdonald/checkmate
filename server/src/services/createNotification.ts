import { Knex } from 'knex';
import { db } from '../db/knex';
import { v4 as uuidv4 } from 'uuid';

interface CreateNotificationInput {
    recipientId: string;
    senderId?: string;
    message: string;
    trx?: Knex.Transaction;
    type: 'friend_request' | 'friend_accept' | 'match_invite' | 'match_result' | 'match_updated' | 'achievement';
}

export async function createNotification({
    recipientId,
    senderId,
    message,
    type,
    trx,
}: CreateNotificationInput) {
    const query = trx ?? db;

    return await query('notifications').insert({
        id: uuidv4(),
        recipient_id: recipientId,
        sender_id: senderId ?? null,
        message,
        read: false,
        created_at: new Date(),
        type: type
    });
}
