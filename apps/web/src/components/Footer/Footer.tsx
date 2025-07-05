import { XStack, Text, YStack } from 'tamagui'
import React from 'react'
import { useMedia } from 'tamagui';

export default function Footer() {
    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;
    const isMedium = !isSmall && !isLarge;

    return (
        <YStack
            width="100%"
            ai="center"
            py="$4"
            px="$4"
        >
            <XStack
                gap="$4"
                flexWrap="wrap"
                jc="center"
            >
                <Text fontSize="$2" color="$color3">
                    © 2025 CheckMate
                </Text>
                <Text fontSize="$2" color="$color3">
                    About
                </Text>
                <Text fontSize="$2" color="$color3">
                    Contact
                </Text>
                <Text fontSize="$2" color="$color3">
                    GitHub
                </Text>
            </XStack>
        </YStack>
    )
}
