import React, { useEffect, useState } from 'react';
import { GameCarousel } from '../../../Game/components';
import { Text } from 'tamagui';
import { useAuthStore } from '@checkmate/store';
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
    const { user } = useAuthStore();
    const { savedGames } = useSavedGames();

    useEffect(() => {
        fetch('/api/game/trending')
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Error ${res.status}: ${text}`);
                }
                return res.json();
            })
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
            isOwner={!!user}
        />
    );
}
