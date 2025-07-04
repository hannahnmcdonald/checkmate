import { YStack, Text } from 'tamagui'
import React from 'react';

export default function WelcomeBanner() {
    return (
        <YStack gap="$2" px="$4" py="$1" alignItems="center">
            <Text fontSize="2rem" fontWeight="700" color="$color" py="$2">
                Welcome to CheckMate!
            </Text>
            <Text fontSize="$2" color="$color2">
                Track your board game sessions, explore new favorites, and connect with friends who love games as much as you do.
            </Text>
        </YStack>
    )
};