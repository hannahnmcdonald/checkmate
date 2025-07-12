interface Notification {
    id: string;
    message: string;
    read: boolean;
}

interface NotificationsStore {
    notifications: Notification[];
    setNotifications: (n: Notification[]) => void;
    markAsRead: (id: string) => void;
}
