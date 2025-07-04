import { YStack, Separator } from 'tamagui'
import React from 'react';
import { TrendingGames, WelcomeBanner } from './Components';
import { GameSearchBar } from '../Game/components';

export default function HomePage() {
    // TODO: Implement search functionality
    // AND add a search icon to the input field
    // AND take user to search results page on submit
    return (
        <YStack
            gap="$4"
            px="$4"
            py="$6"
            minHeight="100vh"
            width="100%"
        >

            <WelcomeBanner />

            <Separator my="$1" />

            <GameSearchBar />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <TrendingGames />

            <Separator my="$1" borderBottomColor="#4D96FF" />
        </YStack>
    )
}
