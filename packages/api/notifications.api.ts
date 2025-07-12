import { Notification } from "@checkmate/types";

export async function getNotifications(): Promise<Notification[]> {
    const res = await fetch("/api/notifications", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json();
}

export async function markNotificationRead(id: string): Promise<void> {
    const res = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to mark notification as read");
}

export async function markAllNotificationsRead(): Promise<void> {
    const res = await fetch("/api/notifications/mark-all-read", {
        method: "PATCH",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to mark all notifications as read");
}

export async function deleteNotification(id: string): Promise<void> {
    const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to delete notification");
}

export async function clearReadNotifications(): Promise<void> {
    const res = await fetch("/api/clear-read", {
        method: "DELETE",
        credentials: "include"
    });
    if (!res.ok) throw new Error("Failed to clear read notifications");
}
