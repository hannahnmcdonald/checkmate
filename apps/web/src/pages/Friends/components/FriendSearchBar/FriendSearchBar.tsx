import { YStack, XStack, Text } from "tamagui";
import { FormInput, PrimaryButton } from '../../../../components/Styled';
import { Search } from "@tamagui/lucide-icons";
import React from "react";

export default function SearchBar({
    query,
    setQuery,
    onSubmit,
}: {
    query: string;
    setQuery: (v: string) => void;
    onSubmit: () => void;
}) {
    return (
        <YStack my="$4">
            <Text fontSize="$6" fontWeight="700" textAlign="center">
                Find Friends
            </Text>
            <XStack gap="$2" mt="$2" width="90%" maxWidth={500} mx="auto" my="$4">
                <FormInput
                    flex={1}
                    size="$4"
                    placeholder="Search users..."
                    value={query}
                    onChangeText={setQuery}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") onSubmit();
                    }}
                />
                <PrimaryButton
                    size="$4"
                    onPress={onSubmit}
                    disabled={!query}
                >
                    <Search />
                </PrimaryButton>
            </XStack>
        </YStack>
    );
}
