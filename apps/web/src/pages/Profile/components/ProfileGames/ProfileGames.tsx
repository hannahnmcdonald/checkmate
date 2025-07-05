import SavedGamesList from './SavedGamesList/SavedGamesList';
import { Text, YStack, XStack, ScrollView } from 'tamagui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bookmark } from '@tamagui/lucide-icons';
import { useMedia } from 'tamagui';
import {
    useRemoveGame
} from "@checkmate/hooks"

type ProfileGamesProps = {
    wishlist: {
        category: string;
        game: Record<string, any> | null;
    }[];
    collection: {
        category: string;
        game: Record<string, any> | null;
    }[];
    isLoggedIn: boolean;
    refetchProfile: () => Promise<void>;
};

export default function ProfileGames({
    collection,
    wishlist,
    isLoggedIn,
    refetchProfile
}: ProfileGamesProps) {

    const navigate = useNavigate();
    const { mutate: removeGame } = useRemoveGame();

    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;
    const isMedium = !isSmall && !isLarge;

    const handleRemove = async (gameId: string, category: string) => {
        try {
            await removeGame(gameId, category);
            if (refetchProfile) {
                await refetchProfile();
            }
        } catch (err) {
            console.error(err);
        }
    };


    const handleViewDetails = (gameId: string) => {
        navigate(`/game/${gameId}`);
    };

    return (
        <XStack
            gap="$4"
            py="$4.5"
            flexWrap="wrap"
            jc="space-between"
            ai="flex-start"
            width="100%"
        >
            <YStack
                width={isMedium ? "48%" : "100%"}
                height={400}
                borderWidth={1}
                borderColor="$gray6"
                borderRadius="$4"
                overflow="hidden"
            >

                <XStack ai="center" gap="$2" mb="$2" p="$3">
                    <Heart size="$1" />
                    <Text fontSize="$2" fontWeight="700">
                        Wishlist
                    </Text>
                </XStack>

                <ScrollView flexGrow={1} contentContainerStyle={{ padding: 8 }}>
                    <SavedGamesList
                        games={wishlist.filter((g) => g.game)}
                        onRemove={handleRemove}
                        onViewDetails={handleViewDetails}
                    />
                </ScrollView>
            </YStack>

            <YStack
                width={isMedium ? "48%" : "100%"}
                height={400}
                borderWidth={1}
                borderColor="$gray6"
                borderRadius="$4"
                overflow="hidden"
            >

                <XStack ai="center" gap="$2" mb="$2" p="$3">
                    <Bookmark size="$1" />
                    <Text fontSize="$2" fontWeight="700">
                        Collection
                    </Text>
                </XStack>
                <ScrollView flexGrow={1} contentContainerStyle={{ padding: 8 }}>
                    <SavedGamesList
                        games={collection.filter((g) => g.game)}
                        onRemove={handleRemove}
                        onViewDetails={handleViewDetails}
                    />
                </ScrollView>
            </YStack>
        </XStack>

    );
}
