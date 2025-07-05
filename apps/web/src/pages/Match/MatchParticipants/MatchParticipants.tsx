import React from 'react';
import { XStack, Text, Checkbox, Avatar } from "tamagui";

export default function StartMatchFriendCard({ friend, checked, onChange }) {
    return (
        <XStack
            ai="center"
            gap="$2"
            p="$2"
            borderWidth={1}
            borderColor="$gray6"
            borderRadius="$2"
            jc="space-between"
        >
            <XStack ai="center" gap="$2" px="$4">
                <Avatar circular size="$3" src={friend.avatar} />
                <Text>{friend.username}</Text>
            </XStack>
            <Checkbox mx="$2" checked={checked} onCheckedChange={onChange} borderColor="$color2" />
        </XStack>
    );
}
