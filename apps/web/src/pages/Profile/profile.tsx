import React from 'react'
import { Theme, YStack, Text } from 'tamagui'
import ProfileHeader from './components/ProfileHeader/ProfileHeader'
import ProfileStats from './components/ProfileStats/ProfileStats'
import ProfileGames from './components/ProfileGames/ProfileGames'
import ProfileFriends from './components/ProfileFriends/ProfileFriends'
import ProfileMatches from './components/ProfileMatches/ProfileMatches'

export default function ProfilePage() {
    return (
        <Theme name="medBlueDark">
            <YStack p="$4">
                <Text fontSize="$8" color="$color">
                    Profile
                </Text>
                <ProfileHeader />
                <ProfileStats />
                <ProfileGames />
                <ProfileFriends />
                <ProfileMatches />
            </YStack>
        </Theme>
    )
}
