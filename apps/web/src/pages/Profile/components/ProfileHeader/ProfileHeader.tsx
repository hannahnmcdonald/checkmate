import React from "react";
import { XStack, YStack, Text, Avatar } from "tamagui";

type Props = {
  isOwner: boolean;
  displayName: string;
  username?: string | null;
  avatarUrl?: string | null;
};

export default function ProfileHeader({
  isOwner,
  displayName,
  username,
  avatarUrl,
}: Props) {
  const title = isOwner
    ? `Welcome back, ${displayName}!`
    : `${displayName}’s profile`;

  console.log({ avatarUrl });

  return (
    <XStack ai="center" jc="space-between" p="$3" maw={1000} mx="auto">
      <XStack ai="center" gap="$3">
        <Avatar circular size="$6">
          <Avatar.Image
            src={avatarUrl ?? undefined}
            alt={`${displayName} avatar`}
          />
          <Avatar.Fallback backgroundColor="$gray6" />
        </Avatar>
        <YStack>
          <Text fontSize="1.5rem" fontWeight="700">
            {title}
          </Text>
          {!isOwner && username ? (
            <Text fontSize="$3" color="$gray10">
              @{username}
            </Text>
          ) : null}
        </YStack>
      </XStack>
    </XStack>
  );
}
