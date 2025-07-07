import { XStack, YStack, ScrollView, Button } from 'tamagui';
import GameCard from '../GameCard/GameCard';
import React, { useRef, useState } from 'react';
import { useMedia } from 'tamagui';

type Game = {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
};

export default function GameCarousel({
    games,
    header,
    savedGames,
    isLoggedIn
}: {
    games: Game[];
    header?: React.ReactNode;
    savedGames: { game_id: string; category: string }[];
    isLoggedIn: boolean;
}) {
    const scrollRef = useRef<ScrollView>(null);
    const [scrollX, setScrollX] = useState(0);
    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;
    const isMedium = !isSmall && !isLarge;

    const scrollBy = (offset: number) => {
        const newScrollX = Math.max(0, scrollX + offset);
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                x: newScrollX,
                animated: true,
            });
        }
        setScrollX(newScrollX);
    };

    console.log(isLoggedIn)

    return (
        <YStack gap="$3">
            <XStack ai="center" jc="space-between" mb="$2" px="$4">
                {header}
                {isLarge && (
                    <XStack gap="$2">
                        <Button size="$2" onPress={() => scrollBy(-200)} theme="alt1">
                            ◀
                        </Button>
                        <Button size="$2" onPress={() => scrollBy(200)} theme="alt1">
                            ▶
                        </Button>
                    </XStack>
                )}
            </XStack>

            {isLarge ? (
                <ScrollView
                    horizontal
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                    }}
                >
                    <XStack gap="$2">
                        {games.map((game) => (
                            <GameCard
                                key={game.id}
                                {...game}
                                savedGames={savedGames}
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </XStack>
                </ScrollView>
            ) : isMedium ? (
                <XStack flexWrap="wrap" gap="$4" px="$4" jc="space-between">
                    {games.map((game) => (
                        <YStack key={game.id} width="31%">
                            <GameCard
                                {...game}
                                savedGames={savedGames}
                                isLoggedIn={isLoggedIn}
                            />
                        </YStack>
                    ))}
                </XStack>
            ) : (
                <YStack gap="$4" alignItems="center" px="$2">
                    {games.map((game) => (
                        <YStack key={game.id} width="80%">
                            <GameCard
                                {...game}
                                savedGames={savedGames}
                                isLoggedIn={isLoggedIn}
                            />
                        </YStack>
                    ))}
                </YStack>
            )}
        </YStack>
    );
}