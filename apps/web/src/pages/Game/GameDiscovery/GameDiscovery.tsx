import { YStack, Text, Separator } from 'tamagui'
import Footer from '../../../components/Footer';
import React from 'react';
import TrendingGames from '../../Home/Components/TrendingGames';
import SearchBar from '../../../components/GameSearchBar/GameSearchBar';

export default function GameDiscoveryPage() {
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
            <SearchBar />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <TrendingGames />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <Footer />
        </YStack>
    )
}
