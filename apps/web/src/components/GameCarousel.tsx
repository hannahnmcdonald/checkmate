import { XStack, YStack, Text, Button, Image, ScrollView } from 'tamagui'
import GameCard from './GameCard'
import React, { useState, useEffect, useRef } from 'react'

type Game = {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
};

export default function GameCarousel() {
    const [games, setGames] = useState<Game[]>([])
    const scrollRef = useRef<ScrollView>(null);
    const [scrollX, setScrollX] = useState(0);

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

    useEffect(() => {
        fetch('/api/game/trending')
            .then((res) => res.json())
            .then((data) => {
                setGames(data)
            })
            .catch(console.error)
    }, [])

    return (
        <YStack gap="$3">
            <XStack ai="center" jc="space-between" mb="$2" px="$4">
                <Text fontSize="$5" fontWeight="700">
                    Popular Games
                </Text>
                <XStack gap="$2">
                    <Button
                        size="$2"
                        onPress={() => scrollBy(-200)}
                        theme="alt1"
                    >
                        ◀
                    </Button>
                    <Button
                        size="$2"
                        onPress={() => scrollBy(200)}
                        theme="alt1"
                    >
                        ▶
                    </Button>
                </XStack>
            </XStack>

            <ScrollView horizontal
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}>
                <XStack gap="$4">
                    {games.map((game) => (
                        <GameCard
                            key={game.id}
                            id={game.id}
                            imageUrl={game.imageUrl}
                            name={game.name}
                            description={game.description}
                            minPlayers={game.minPlayers}
                            maxPlayers={game.maxPlayers}
                        />
                    ))}
                </XStack>
            </ScrollView>
        </YStack>
    )
}
