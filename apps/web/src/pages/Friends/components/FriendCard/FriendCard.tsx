import { Card, YStack, Text, Image } from "tamagui";
import React from 'react';
import { Friend } from "@checkmate/types";
import { getAvatarUrl } from "../../../../utils";

interface FriendCardProps {
    user: Friend;
    action?: React.ReactNode;
    theme: string
}

export default function FriendCard({ user, action, theme }: FriendCardProps) {

    return (
        <Card bordered elevate width={160} p="$3" ai="center" theme={theme}>
            <Image
                src={getAvatarUrl(user.avatar)}
                width={60}
                height={60}
                borderRadius={30}
            />

            <Text mt="$2" fontWeight="700">
                {user.username}
            </Text>

            {action && (
                <YStack mt="$2">
                    {action}
                </YStack>
            )}
        </Card>
    );
}
