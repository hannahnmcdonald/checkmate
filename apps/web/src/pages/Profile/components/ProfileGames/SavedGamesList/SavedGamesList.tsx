import React from 'react';
import { XStack, Text, YStack, Image } from 'tamagui';
import { PrimaryButton } from '../../../../../components/Styled';
import { useMedia } from 'tamagui';

type SavedGamesListProps = {
    games: {
        category: string;
        game: {
            id: string;
            name: string;
            image?: string;
        };
    }[];
    onRemove: (gameId: string, category: string) => void;
    onViewDetails: (gameId: string) => void;
};

function truncateText(text: string, maxLength: number) {
    if (!text) return "";
    return text.length <= maxLength ? text : text.slice(0, maxLength) + "...";
}

export default function SavedGamesList({
    games,
    onRemove,
    onViewDetails
}: SavedGamesListProps) {

    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;
    const isMedium = !isSmall && !isLarge;

    // Determine max length depending on screen size
    const maxLength = isSmall ? 12 : isMedium ? 20 : 30;

    // TODO: Route from wishlist or collection to greater dashboard
    return (
        <YStack gap="$3">
            {games.map(({ game, category }) => (game ? (
                <XStack
                    key={game.id}
                    ai="center"
                    jc="space-between"
                    p="$2"
                    borderWidth={1}
                    borderColor="$color2"
                    bg="$backgroundHover"
                    borderRadius="$2"
                >
                    <XStack ai="center" gap="$2">
                        <Image
                            source={{ uri: game.image ?? '' }}
                            width={50}
                            height={50}
                            borderRadius="$2"
                        />
                        <Text fontWeight="600" fontSize=".75rem">
                            {truncateText(game.name ?? "Untitled", maxLength)}
                        </Text>
                    </XStack>
                    <XStack
                        gap="$2"
                        flexWrap="wrap"
                        jc={isSmall ? "flex-start" : "flex-end"}
                    >
                        <PrimaryButton
                            size={isSmall ? "$1" : "$2"}
                            onPress={() => onViewDetails(game.id)}
                        >
                            View
                        </PrimaryButton>
                        <PrimaryButton
                            size={isSmall ? "$1" : "$2"}
                            theme="marronDark"
                            onPress={() => onRemove(game.id, category)}
                        >
                            Remove
                        </PrimaryButton>
                    </XStack>
                </XStack>
            ) : (
                <YStack p="$3">
                    <Text>Could not load game details for this item.</Text>
                </YStack>
            )
            ))}
        </YStack>
    );
}
