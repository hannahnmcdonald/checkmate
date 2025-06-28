import React from 'react'
import { Theme, YStack, Text } from 'tamagui'

export default function ProfilePage() {
    return (
        <Theme name="blueDark">
            <YStack p="$4">
                <Text fontSize="$8" color="$color">
                    Profile
                </Text>
                <Text color="$color2">
                    Welcome to your profile page.
                </Text>
                <Text color="$color3">
                    Here you can edit your information.
                </Text>
            </YStack>
        </Theme>
    )
}
