import React, { useEffect, useState } from 'react';
import GameCarousel from '../../Game/components/GameCarousel/GameCarousel';
import { Text } from 'tamagui';
import { useAuth } from '@checkmate/state';
import { useSavedGames } from "@checkmate/hooks";

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
    const { state } = useAuth();
    const { savedGames } = useSavedGames();

    useEffect(() => {
        fetch('/api/game/trending')
            .then((res) => res.json())
            .then(setGames)
            .catch(console.error);
    }, []);

    return (
        <GameCarousel
            games={games}
            header={
                <Text fontSize="$5" fontWeight="700">
                    Popular Games
                </Text>
            }
            savedGames={savedGames}
            isLoggedIn={!!state.user}
        />
    );
}
