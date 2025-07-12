import { create } from "zustand";
import { Notification } from "@checkmate/types";

interface NotificationStore {
    notifications: Notification[];
    setNotifications: (list: Notification[]) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    deleteNotification: (id: string) => void;
    clearRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    notifications: [],

    setNotifications: (list) => set({ notifications: list }),

    markAsRead: (id) =>
        set((s) => ({
            notifications: s.notifications.map((n) =>
                n.id === id ? { ...n, read: true } : n
            ),
        })),

    markAllAsRead: () =>
        set((s) => ({
            notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

    deleteNotification: (id) =>
        set((s) => ({
            notifications: s.notifications.filter((n) => n.id !== id),
        })),

    clearRead: () =>
        set((s) => ({
            notifications: s.notifications.filter((n) => !n.read),
        })),
}));
