import { useEffect, useState } from "react";
import {
    getNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification as apiDelete,
    clearReadNotifications as apiClearRead,
} from "@checkmate/api";
import { useNotificationStore } from "@checkmate/store";

export default function useNotifications() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        notifications,
        setNotifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearRead,
    } = useNotificationStore();

    // Initial load
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (err: any) {
                setError(err.message || "Failed to load notifications");
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [setNotifications]);

    // Actions
    const handleMarkRead = async (id: string) => {
        await markNotificationRead(id);
        markAsRead(id);
    };

    const handleMarkAll = async () => {
        await markAllNotificationsRead();
        markAllAsRead();
    };

    const handleDelete = async (id: string) => {
        await apiDelete(id);
        deleteNotification(id);
    };

    const handleClearRead = async () => {
        await apiClearRead();
        clearRead();
    };

    return {
        notifications,
        loading,
        error,
        markRead: handleMarkRead,
        markAll: handleMarkAll,
        remove: handleDelete,
        clearRead: handleClearRead,
    };
}
