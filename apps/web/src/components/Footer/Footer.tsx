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
            minHeight="100vh"
            width="100%"
            alignItems="center"
            py="$4"
            pt="$10"
            gap="$2"
            {...(isSmall ? { px: "$2" } : isMedium ? { px: "$4" } : { px: "$6" })}
            {...(isSmall ? { jc: "center" } : { jc: "space-between" })}
        >
            <XStack gap="$4">
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
