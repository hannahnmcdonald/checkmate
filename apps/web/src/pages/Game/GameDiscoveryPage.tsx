import { YStack, Separator } from 'tamagui'
import React from 'react';
import TrendingGames from '../Home/Components/TrendingGames';
import { GameSearchBar } from './components';

export default function GameDiscoveryPage() {
    // TODO: Implement search functionality
    // AND add a search icon to the input field
    // AND take user to search results page on submit

    // TODO: Would be nice to have a search categories option to add near the search bar
    return (
        <YStack
            gap="$4"
            px="$4"
            py="$6"
            minHeight="100vh"
            width="100%"
        >
            <GameSearchBar />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <TrendingGames />

            <Separator my="$1" borderBottomColor="#4D96FF" />
        </YStack>
    )
}
