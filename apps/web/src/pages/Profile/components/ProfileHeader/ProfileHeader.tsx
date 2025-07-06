import React from 'react';
import { Text } from 'tamagui'

type ProfileHeaderProps = {
    name?: string;
};

export default function ProfileHeader({ name }: ProfileHeaderProps) {
    return (
        <Text fontSize="2rem">{name ? `Welcome back, ${name}!` : "Welcome!"}</Text>
    )
}