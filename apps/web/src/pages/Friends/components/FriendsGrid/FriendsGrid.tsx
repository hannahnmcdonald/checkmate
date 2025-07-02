import { XStack, YStack, Text } from "tamagui";
import { FriendCard } from "../FriendCard/FriendCard";
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
}

// interface Friend {
//   id: string;
//   username: string;
//   avatarUrl?: string;
//   joinedDate?: string;
//   mutualFriendsCount?: number;
// }

{/* <FriendGrid
  users={friends}
  actionButton={(user) => (
    <Button onPress={() => removeFriend(user.id)}>
      Remove
    </Button>
  )}
  emptyText="No friends yet."
/> */}

// console.log('users', users)

export function FriendGrid({ users, actionButton, emptyText = "No results" }: FriendGridProps) {

  console.log('users', users)
  if (!users || users.length === 0) {
    return <Text textAlign="center">{emptyText}</Text>;
  }

  return (
    <XStack
      flexWrap="wrap"
      gap="$4"
      jc="flex-start"
    >
      {users.map((user) => (
        <FriendCard
          key={user.id}
          user={user}
          action={actionButton ? actionButton(user) : undefined}
        />
      ))}
    </XStack>
  );
}
