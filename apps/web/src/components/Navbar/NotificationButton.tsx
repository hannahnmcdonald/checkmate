import { Bell } from "@tamagui/lucide-icons";
import { useNotificationStore } from "@checkmate/store";
import { useNotifications } from "@checkmate/hooks";
import { Button, YStack, Text } from "tamagui";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function NotificationButton() {
    const navigate = useNavigate();
    const unread = useNotificationStore(
        (s) => s.notifications.filter((n) => !n.read).length
    );

    useNotifications();

    return (
        <Button
            onPress={() => navigate("/notifications")}
            icon={Bell}
            size="$2"
        >
            {unread > 0 && (
                <YStack
                    position="absolute"
                    top={2}
                    right={2}
                    bg="$red10"
                    br={999}
                    p="$1"
                    minWidth={18}
                    ai="center"
                >
                    <Text fontSize="$1" color="$background">{unread}</Text>
                </YStack>
            )}
        </Button>
    );
}
