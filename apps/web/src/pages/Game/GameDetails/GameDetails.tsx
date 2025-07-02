import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { YStack, XStack, Text, Image, Button, Spinner } from 'tamagui';
import { Heart, PlusSquare } from '@tamagui/lucide-icons';
import { useAuth } from '@checkmate/state';
import { PrimaryButton } from '../../../components/Styled';
import { Badge } from '../../../components/GameBadge';
import { useSavedGames } from '../../../hooks/useSavedGames';
import { GameSaveToggleButton } from '../GameSaveToggleButton/GameSaveToggleButton';

type Game = {
    id: string;
    image: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    playingTime: string;
    yearPublished: string;
    categories?: [],
    mechanics?: []
};

export default function GameDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state } = useAuth();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

    const { savedGames } = useSavedGames();
    const isWishlisted = savedGames.some(
        (g) => g.game_id === id && g.category === "wishlist"
    );
    const isCollected = savedGames.some(
        (g) => g.game_id === id && g.category === "collection"
    );


    useEffect(() => {
        fetch(`/api/game/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('RAW API RESPONSE:', data);
                setGame(data.game);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <YStack ai="center" jc="center" height="50vh">
                <Spinner />
            </YStack>
        );
    }

    if (!game) {
        return (
            <YStack ai="center" jc="center" py="$4">
                <Text>Game not found.</Text>
            </YStack>
        );
    }

    const { name, description, minPlayers, maxPlayers, image, playingTime, yearPublished } = game;

    return (
        <YStack width="100%" gap="$4" px="$4" py="$4" maxWidth={700} mx="auto">
            <Image
                source={{ uri: image }}
                width="100%"
                maxWidth="100%"
                aspectRatio={16 / 9}
                borderRadius="$3"
                height='auto'
            />

            <Text fontSize="$6" fontWeight="700">{name}</Text>

            <Text color="$gray10" fontSize="$2">
                {yearPublished || null} • {playingTime ? `${playingTime} minutes` : null} • {minPlayers && maxPlayers ? `Players: ${minPlayers}-${maxPlayers}` : null}
            </Text>

            <Text fontSize="$3" mt="$2">
                {description || "No description"}
            </Text>

            {state.user ? (
                <XStack gap="$2" mt="$2">
                    <GameSaveToggleButton
                        gameId={id}
                        category="wishlist"
                        icon={Heart}
                        initiallySaved={isWishlisted}
                    />
                    <GameSaveToggleButton
                        gameId={id}
                        category="collection"
                        icon={PlusSquare}
                        initiallySaved={isCollected}
                    />
                </XStack>
            ) : (null)}

            <Text fontSize="$3" mt="$3" mb="$1">Categories:</Text>
            <XStack flexWrap="wrap" mt="$2">
                {game.categories?.map((category) => (
                    <Badge key={category} label={category} type="category" />
                ))}
            </XStack>

            <Text fontSize="$3" mt="$4" mb="$1">Mechanics:</Text>
            <XStack flexWrap="wrap">
                {game.mechanics?.map((m) => (
                    <Badge key={m} label={m} type="mechanic" />
                ))}
            </XStack>


            <PrimaryButton
                disabled={!state.user}
                mt="$3"
                onPress={() => {
                    navigate(`/game/${id}/start-match`);
                }}
            >
                Start a Match
            </PrimaryButton>
            {!state.user ? (
                <Text mt="$3" color="$red10" textAlign='center'>
                    You must log in to start a match.
                </Text>
            )
                : null
            }

        </YStack>
    );
}
