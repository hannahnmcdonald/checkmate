import { YStack, XStack, Text } from 'tamagui'
import { FormInput, PrimaryButton } from '../../components/Styled';
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Search } from '@tamagui/lucide-icons';

export default function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
    const [query, setQuery] = useState(initialQuery);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = () => {
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <>
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
                    value={query}
                    onChangeText={setQuery}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSubmit();
                    }}
                    focusStyle={{
                        borderColor: "#6BCB77",
                    }}
                />
                <PrimaryButton
                    size="$4"
                    theme="active"
                    backgroundColor="#4D96FF"
                    color="white"
                    onPress={handleSubmit}
                >
                    <Search color="white" />
                </PrimaryButton>
            </XStack>
        </>
    )
}
