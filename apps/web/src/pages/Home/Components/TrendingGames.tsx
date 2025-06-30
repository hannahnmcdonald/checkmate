import React, { useEffect, useState } from 'react';
import GameCarousel from '../../../components/GameCarousel';
import { Text } from 'tamagui';

type Game = {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
};

export default function TrendingGames() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch('/api/game/trending')
            .then((res) => res.json())
            .then(setGames)
            .catch(console.error);
    }, []);

    console.log('games', games)
    return (
        <GameCarousel
            games={games}
            header={
                <Text fontSize="$5" fontWeight="700">
                    Popular Games
                </Text>
            }
        />
    );
}
