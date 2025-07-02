import { Card, XStack, Text, Image, Button } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { PrimaryButton } from './Styled'
import { Heart, PlusSquare } from '@tamagui/lucide-icons';
import { useAuth } from '@checkmate/state';
import { useMedia } from 'tamagui';
import { useSaveGame } from "../hooks/useSaveGame";
import { useRemoveGame } from "../hooks/useRemoveGame";
import { useSavedGames } from '../hooks/useSavedGames';

export default function GameCard({
    id,
    imageUrl,
    name,
    description,
    minPlayers,
    maxPlayers,
}: {
    id: string
    imageUrl: string
    name: string
    description: string
    minPlayers: number
    maxPlayers: number
}) {
    const { state } = useAuth();
    const navigate = useNavigate()

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCollected, setIsCollected] = useState(false);


    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;
    const isMedium = !isSmall && !isLarge;

    const { mutate: save, loading: saving, error: saveError } = useSaveGame();
    const { mutate: remove, loading: removing, error: removeError } = useRemoveGame();

    // TO DO: Only need this if user is logged in
    const { savedGames } = useSavedGames();
    console.log(savedGames)
    useEffect(() => {
        if (savedGames) {
            setIsWishlisted(
                savedGames.some(g => g.game_id === id && g.category === "wishlist")
            );
            setIsCollected(
                savedGames.some(g => g.game_id === id && g.category === "collection")
            );
        }
    }, [savedGames, id]);

    return (
        <Card
            elevate
            bordered
            width="100%"
            maxWidth={isLarge ? 200 : 400}
            padding="$4"
            gap="$3"
            bg="$backgroundHover"
        >
            <Image
                source={{ uri: imageUrl }}
                width="100%"
                height={100}
                borderRadius="$2"
            />

            <Text fontWeight="700"
                numberOfLines={2}
                fontSize="$2"
                py={25}
            >
                {name}
            </Text>

            <Text color="$color2" fontSize={12} numberOfLines={3}>
                {description}
            </Text>

            <Text color="$color3" fontSize={14} ellipsizeMode="tail">
                Players: {minPlayers} - {maxPlayers}
            </Text>

            {state.user ? (
                <XStack gap="$2" mt="auto">
                    <Button
                        size="$2"
                        circular
                        // theme={isWishlisted ? 'maroonDark' : 'alt1'}
                        icon={Heart}
                        onPress={() => save(id, "wishlist")}
                    />
                    <Button
                        size="$2"
                        circular
                        // theme={isCollected ? 'maroonDark' : 'alt1'}
                        icon={PlusSquare}
                        onPress={() => save(id, "collection")}
                    />
                </XStack>
            ) : null}

            <PrimaryButton
                size="$2"
                onPress={() => navigate(`/game/${id}`)}
            >
                View Details
            </PrimaryButton>
        </Card>
    )
}
