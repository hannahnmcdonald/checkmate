import { YStack, XStack, Text, Separator, Form } from 'tamagui'
import GameCarousel from '../../components/GameCarousel';
import Footer from '../../components/Footer';
import { FormInput, PrimaryButton } from '../../components/Styled';
import React from 'react';
import { Search } from '@tamagui/lucide-icons';

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

            <Text fontSize="$6" fontWeight="700" color="$color" textAlign='center'>
                Find your next game
            </Text>

            <Text fontSize="$3" color="$gray10" textAlign='center' maxWidth={600} mx="auto">
                Search thousands of board games by name, category, or player count.
            </Text>

            <XStack gap="$2" mt="$2" width="100%" maxWidth={500} alignContent='center' mx="auto">
                <FormInput
                    flex={1}
                    size="$4"
                    borderColor="#4D96FF"
                    borderWidth={2}
                    br="$3"
                    px="$3"
                    fontSize="$1"
                    placeholder="Search for a game..."
                    // value={query}
                    // onChangeText={setQuery}
                    focusStyle={{
                        borderColor: "#6BCB77",
                    }}
                />
                <PrimaryButton
                    size="$4"
                    theme="active"
                    backgroundColor="#4D96FF"
                    color="white"
                // onPress={handleSearch}
                >
                    <Search color="white" />
                </PrimaryButton>
            </XStack>

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <GameCarousel />

            <Separator my="$1" borderBottomColor="#4D96FF" />

            <Footer />
        </YStack>
    )
}
