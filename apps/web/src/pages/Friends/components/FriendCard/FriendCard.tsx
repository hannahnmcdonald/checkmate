import { Card, YStack, Text, Image } from "tamagui";
import React from 'react';
import { Friend } from "@checkmate/types";
import { getAvatarUrl } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@checkmate/store";

interface FriendCardProps {
    user: Friend;
    action?: React.ReactNode;
    theme: string;
    onPress?: (userId: string) => void;
}

export default function FriendCard({ user, action, theme, onPress }: FriendCardProps) {
    const navigate = useNavigate();
    const currentUser = useAuthStore((s) => s.user);
    const targetRoute = currentUser && currentUser.id === user.id ? "/profile" : `/profile/${user.id}`;

    return (
        <Card
            bordered
            elevate
            width={160}
            p="$3"
            ai="center"
            theme={theme}
            onPress={() => {
                navigate(targetRoute);
                onPress?.(user.id);
            }}
            hoverStyle={{
                backgroundColor: "$backgroundHover",
                borderColor: "$color2",
                cursor: "pointer",
            }}
            pressStyle={{
                backgroundColor: "$backgroundHover",
                borderColor: "$color2",
            }}
            focusStyle={{
                outlineColor: "$color2",
                outlineWidth: 2,
                outlineStyle: "solid",
            }}
        >
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
