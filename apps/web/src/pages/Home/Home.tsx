import { YStack, Text, Separator } from 'tamagui'
import Footer from '../../components/Footer';
import React from 'react';
import TrendingGames from './Components/TrendingGames';
import SearchBar from '../../components/GameSearchBar/GameSearchBar';

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
            <YStack gap="$2" px="$4" py="$1" alignItems="center">
                <Text fontSize="2rem" fontWeight="700" color="$color" py="$2">
                    Welcome to CheckMate!
                </Text>
                <Text fontSize="$2" color="$color2">
                    Track your board game sessions, explore new favorites, and connect with friends who love games as much as you do.
                </Text>
            </YStack>

            <Separator my="$1" />

            <SearchBar />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <TrendingGames />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <Footer />
        </YStack>
    )
}
