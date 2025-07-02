import { YStack, XStack, Text } from 'tamagui'
import { FormInput, PrimaryButton } from '../../../../components/Styled';
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import { Search } from '@tamagui/lucide-icons';

export default function FriendSearchBar({ initialQuery = "" }: { initialQuery?: string }) {
    const [query, setQuery] = useState(initialQuery);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = () => {
        if (query.trim()) {
            navigate(`/friend/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <>
            <XStack gap="$2" mt="$2" py="$4" width="100%" maxWidth={500} alignContent='center' mx="auto">
                <Text fontSize="$6" fontWeight="700" color="$color" textAlign='center'>
                    Find your friends!
                </Text>

                <FormInput
                    flex={1}
                    size="$4"
                    theme="tealDark"
                    borderWidth={2}
                    br="$3"
                    px="$3"
                    fontSize="$1"
                    placeholder="Search for friends..."
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
                    theme="tealDark"
                    color="white"
                    onPress={handleSubmit}
                    disabled={!query}
                >
                    <Search color="white" />
                </PrimaryButton>
            </XStack>
        </>
    )
}
