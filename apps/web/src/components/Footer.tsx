import { XStack, Text, YStack } from 'tamagui'

export default function Footer() {
    return (
        <YStack
            width="100%"
            alignItems="center"
            py="$4"
            gap="$2"
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
