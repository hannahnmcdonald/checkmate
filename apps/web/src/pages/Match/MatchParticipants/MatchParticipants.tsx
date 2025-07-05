import React from 'react';
import { XStack, Text, Checkbox, Avatar } from "tamagui";
import { Check } from '@tamagui/lucide-icons';

type Props = {
    friend: {
        id: string;
        username: string;
        avatar?: string | null;
    };
    checked: boolean;
    onChange: () => void;
};

export default function StartMatchFriendCard({ friend, checked, onChange }: Props) {
    console.log(friend.username, checked);
    console.log(`Checkbox for ${friend.username}:`, checked);

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
                <Avatar
                    circular
                    size="$3"
                    src={friend.avatar || ""}
                />
                <Text>{friend.username}</Text>
            </XStack>
            <Checkbox
                mx="$2"
                key={`${friend.id}-${checked}`} // ensures remount per row
                checked={checked}
                onCheckedChange={onChange}
                borderColor="$color2">
                <Checkbox.Indicator>
                    <Check />
                </Checkbox.Indicator>
            </Checkbox>
        </XStack >
    );
}
