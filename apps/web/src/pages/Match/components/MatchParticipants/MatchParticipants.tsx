import React from 'react';
import { XStack, Text, Checkbox, Avatar } from "tamagui";
import { Check } from '@tamagui/lucide-icons';
import { getAvatarUrl } from '../../../../utils';

type Props = {
    friend: {
        id: string;
        username: string;
        avatar?: string | null;
    };
    checked: boolean;
    onChange: () => void;
};

export default function MatchParticipants({ friend, checked, onChange }: Props) {

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
                <Avatar circular size="$3">
                    <Avatar.Image src={getAvatarUrl(friend.avatar)} />
                </Avatar>
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

// http://localhost:5173/match/2234ea4b-6b26-47cc-aaa4-201001b644c8