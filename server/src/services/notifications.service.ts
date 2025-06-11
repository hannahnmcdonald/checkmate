import { db } from '../db/knex';

export async function getAllNotifications(userId: string) {
    return await db('notifications')
        .where({ recipient_id: userId, deleted_by_user: false })
        .orderBy('created_at', 'desc')
        .limit(20);
}

export async function markNotificationsRead(userId: string, notificationId: string) {
    return await db('notifications')
        .where({ id: notificationId, recipient_id: userId })
        .update({ read: true, read_at: new Date() });
}

export async function markAllNotificationsRead(userId: string) {
    return await db('notifications')
        .where({ recipient_id: userId, read: false, deleted_by_user: false })
        .update({ read: true, read_at: new Date() });
}

export async function deleteNotification(userId: string, notificationId: string) {
    return await db('notifications')
        .where({ id: notificationId, recipient_id: userId })
        .update({ deleted_by_user: true });
}

export async function clearReadNotifications(userId: string) {
    return await db('notifications')
        .where({ recipient_id: userId, read: true })
        .update({ deleted_by_user: true });
}