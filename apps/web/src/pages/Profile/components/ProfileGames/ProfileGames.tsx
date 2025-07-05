import React from 'react';
import GameCarousel from '../../../Game/components/GameCarousel/GameCarousel';
import { XStack } from 'tamagui';

type ProfileGamesProps = {
    savedGames: {
        category: string;
        game: {
            id: string;
            name: string;
            description?: string;
            image?: string;
            minPlayers?: number;
            maxPlayers?: number;
        } | null;
    }[];
    isLoggedIn: boolean;
};

export default function ProfileGames({
    savedGames,
    isLoggedIn
}: ProfileGamesProps) {
    const cleanedGames = savedGames
        .filter((g) => g.game) // skip nulls
        .map((g) => ({
            id: g.game!.id,
            imageUrl: g.game!.image ?? '',
            name: g.game!.name,
            description: g.game!.description ?? '',
            minPlayers: g.game!.minPlayers ?? 1,
            maxPlayers: g.game!.maxPlayers ?? 1,
        }));

    console.log("cleanedGames:", cleanedGames);
    console.log(
        "savedGames for carousel:",
        savedGames
            .filter((g) => g.game)
            .map((g) => ({
                game_id: g.game!.id,
                category: g.category,
            }))
    );


    return (
        <GameCarousel
            games={cleanedGames}
            header={
                <XStack gap="$2">
                    {/* You can put toggle tabs or header content here */}
                </XStack>
            }
            savedGames={
                savedGames
                    .filter((g) => g.game)
                    .map((g) => ({
                        game_id: g.game!.id,
                        category: g.category,
                    }))
            }
            isLoggedIn={isLoggedIn}
        />
    );
}
