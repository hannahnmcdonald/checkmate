import { Card, YStack, Text, Image } from "tamagui";
import React from 'react';
import { Friend } from "@checkmate/types";

interface FriendCardProps {
    user: Friend;
    action?: React.ReactNode;
}

export function FriendCard({ user, action }: FriendCardProps) {
    return (
        <Card bordered elevate width={160} p="$3" ai="center">
            <Image
                src={user.avatarUrl || "/default-avatar.png"}
                width={60}
                height={60}
                borderRadius={30}
            />

            <Text mt="$2" fontWeight="700">
                {/* {user.username}
                 */}
                USERNAME
            </Text>

            {/* {user.mutualFriendsCount !== undefined && (
                <Text fontSize="$1" color="$gray10">
                    {user.mutualFriendsCount} mutual friends
                </Text>
            )} */}

            {action && (
                <YStack mt="$2">
                    {action}
                </YStack>
            )}
        </Card>
    );
}
