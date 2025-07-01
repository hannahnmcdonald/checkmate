import GameCard from './GameCard';
import { YStack, XStack } from 'tamagui'
import React from 'react';
import { useMedia } from 'tamagui';


type Game = {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number
};

export function GameGrid({ games }: { games: Game[] }) {
    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;
    const isMedium = !isSmall && !isLarge;
    return (
        <>
            {isLarge ? (
                <XStack gap="$4">
                    {games.map((game) => (
                        <GameCard key={game.id} {...game} />
                    ))}
                </XStack>
            ) : isMedium ? (
                <XStack
                    flexWrap="wrap"
                    gap="$4"
                    px="$4"
                    jc="space-between"
                >
                    {games.map((game) => (
                        <YStack key={game.id} width="31%">
                            <GameCard {...game} />
                        </YStack>
                    ))}
                </XStack>
            ) : (
                <YStack gap="$4" alignItems="center" px="$4">
                    {games.map((game) => (
                        <YStack key={game.id} width="80%">
                            <GameCard {...game} />
                        </YStack>
                    ))}
                </YStack>
            )}
        </>
    );
}
