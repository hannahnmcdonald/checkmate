import React from "react";
import { XStack, Text, YStack } from "tamagui";
import { useNotificationStore } from "@checkmate/store";
import {
  markNotificationRead as markReadAPI,
  deleteNotification as deleteAPI,
} from "@checkmate/api";
import { Notification } from "@checkmate/types";
import { PrimaryButton } from "../../../../components/styled";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

type Props = {
  n: Notification;
};

export default function NotificationItem({ n }: Props) {
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const remove = useNotificationStore((s) => s.deleteNotification);

  const navigate = useNavigate();

  const goToNotificationTarget = () => {
    const { reference_id, type } = n;
    console.log("Notification:", n);
    console.log("Reference ID:", reference_id, "Type:", type);
    if (!reference_id || !type) {
      console.warn("Missing referenceId or type:", n);
      return;
    }

    const route =
      type === "friend_request"
        ? `/profile/${reference_id}`
        : type === "match_pending" || type === "match_invite"
        ? `/match/${reference_id}`
        : type === "match_final"
        ? `/match/${reference_id}/finalize`
        : null;

    if (route) {
      console.log("Navigating to:", route);
      navigate(route);
    } else {
      console.warn("No valid route for type:", n.type);
    }
  };

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
      remove(n.id);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <YStack
      jc="space-between"
      ai="center"
      px="$3"
      py="$5"
      minHeight={80}
      bg={n.read ? "$background" : "$color1"}
      br="$2"
      borderWidth={1}
      gap="$2"
      borderLeftColor={n.read ? "$color1" : "$color2"}
      borderLeftWidth={n.read ? 0.5 : 4}
      background={n.read ? "$background" : "$backgroundHover"}
      onPress={() => goToNotificationTarget()}
      pressStyle={{ scale: 0.97 }}
      cursor="pointer"
    >
      <XStack jc="space-between" ai="center" gap="$4">
        {!n.read && <Text color="$color2">●</Text>}
        <Text fontWeight={n.read ? "400" : "800"} fontSize="$3">
          {n.message}
        </Text>
        <XStack gap="$2">
          {!n.read && (
            <PrimaryButton
              size="$2"
              onPress={(e) => {
                e.stopPropagation();
                handleMarkRead();
              }}
            >
              Mark read
            </PrimaryButton>
          )}
          <PrimaryButton
            size="$2"
            theme="maroonDark"
            onPress={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            Delete
          </PrimaryButton>
        </XStack>
      </XStack>
      <Text fontSize="$1" color="$color1" alignSelf="flex-end" mt="$1">
        {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
      </Text>
    </YStack>
  );
}
