import React from "react";
import { XStack, Text, Button } from "tamagui";
import { useNotificationStore } from "@checkmate/store";
import {
    markNotificationRead as markReadAPI,
    deleteNotification as deleteAPI,
} from "@checkmate/api";
import { Notification } from "@checkmate/types";

type Props = {
    n: Notification;
};

export default function NotificationItem({ n }: Props) {
    const markAsRead = useNotificationStore((s) => s.markAsRead);
    const remove = useNotificationStore((s) => s.deleteNotification);

    const handleMarkRead = async () => {
        try {
            await markReadAPI(n.id);
            markAsRead(n.id); // Update store
        } catch (err) {
            console.error("Failed to mark read", err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAPI(n.id);
            remove(n.id); // Update store
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    return (
        <XStack
            jc="space-between"
            ai="center"
            px="$3"
            py="$2"
            bg={n.read ? "$background" : "$color1Light"}
            br="$2"
            borderWidth={1}
            borderColor="$gray6"
            gap="$2"
        >
            <Text fontWeight={n.read ? "400" : "700"}>{n.message}</Text>

            <XStack gap="$2">
                {!n.read && (
                    <Button size="$2" onPress={handleMarkRead}>
                        Mark read
                    </Button>
                )}
                <Button size="$2" theme="red" onPress={handleDelete}>
                    Delete
                </Button>
            </XStack>
        </XStack>
    );
}
