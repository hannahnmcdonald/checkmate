import { XStack, YStack, Text } from "tamagui";
import { FriendCard } from "../index";
import React from 'react';
// import { Friend } from '@checkmate/types';
export interface Friend {
  id: string;
  username: string;
  avatarUrl?: string;
  joinedDate?: string;
  mutualFriendsCount?: number;
}

interface FriendGridProps {
  users: Friend[];
  actionButton?: (user: Friend) => React.ReactNode;
  emptyText?: string;
  title?: string
}

const themes = ['maroonDark', 'greenDark', 'medBlueDark', 'magentaDark']

export default function FriendGrid({ users, actionButton, emptyText = "No friends yet", title }: FriendGridProps) {
  const noFriends = !users || users.length === 0

  // TODO: Export this into a separate profile version
  return (
    <YStack gap="$4" py="$4">
      <Text textAlign="center" fontSize="1.5rem">{title}</Text>

      {noFriends ? (
        <Text textAlign="center" fontSize=".75rem">{emptyText}</Text>
      ) : (
        <XStack
          flexWrap="wrap"
          gap="$4"
          jc="center"
        >
          {users.map((user, idx) => (
            <FriendCard
              key={user.id}
              user={user}
              action={actionButton ? actionButton(user) : undefined}
              theme={themes[idx % themes.length]}
            />
          ))}
        </XStack>
      )}
    </YStack>
  );
}
