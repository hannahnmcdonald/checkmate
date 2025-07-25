import React from "react";
import { YStack, XStack, Text, Spinner } from "tamagui";
import { useNotificationStore } from "@checkmate/store";
import { useNotifications } from "@checkmate/hooks";
import { NotificationItem } from "./components";
import { PrimaryButton } from "../../components/Styled";

export default function NotificationsPage() {
  const { notifications, loading, error, markAll, clearRead } =
    useNotifications();

  if (loading) return <Spinner my="$8" />;
  if (error) return <Text color="$red10">{error}</Text>;

  console.log("Notifications:", notifications);

  return (
    <YStack gap="$4" p="$4" maxWidth={600} mx="auto">
      <XStack jc="space-between" ai="center" flexWrap="wrap" gap="$2">
        <Text fontSize="1.5rem" fontWeight="700" flexShrink={1}>
          Notifications
        </Text>
        <XStack gap="$2" flexWrap="wrap" justifyContent="flex-end">
          <PrimaryButton size="$2" onPress={markAll}>
            Mark all read
          </PrimaryButton>
          <PrimaryButton size="$2" theme="red" onPress={clearRead}>
            Clear read
          </PrimaryButton>
        </XStack>
      </XStack>

      {notifications.length === 0 ? (
        <Text>No notifications</Text>
      ) : (
        <YStack gap="$2" width="100%">
          {notifications.map((n) => (
            <NotificationItem key={n.id} n={n} />
          ))}
        </YStack>
      )}
    </YStack>
  );
}
