import { Card, XStack, Text, Image, Button } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { PrimaryButton } from './Styled'
import { Heart, Bookmark } from '@tamagui/lucide-icons';
import { useMedia } from 'tamagui';
import { IconButton } from './IconButton';
import { useSaveGame } from "../hooks/useSaveGame";
import { useRemoveGame } from "../hooks/useRemoveGame";


export default function GameCard({
    id,
    imageUrl,
    name,
    description,
    minPlayers,
    maxPlayers,
    savedGames,
    isLoggedIn,
}: {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    savedGames: { game_id: string; category: string }[];
    isLoggedIn: boolean;
}) {
    const navigate = useNavigate()

    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCollected, setIsCollected] = useState(false);

    const { mutate: save } = useSaveGame();
    const { mutate: remove } = useRemoveGame();

    useEffect(() => {
        if (savedGames) {
            setIsWishlisted(
                savedGames.some((g) => g.game_id === id && g.category === "wishlist")
            );
            setIsCollected(
                savedGames.some((g) => g.game_id === id && g.category === "collection")
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
                aspectRatio={4 / 3} // or whatever ratio fits most of your images
                resizeMode="cover"
                backgroundColor="$background"
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

            {isLoggedIn ? (
                <XStack gap="$2" mt="auto">
                    <IconButton
                        selected={isWishlisted}
                        Icon={Heart}
                        onToggle={() => {
                            if (isWishlisted) {
                                remove(id, "wishlist");
                                setIsWishlisted(false);
                            } else {
                                save(id, "wishlist");
                                setIsWishlisted(true);
                            }
                        }}
                    />
                    <IconButton
                        selected={isCollected}
                        Icon={Bookmark}
                        onToggle={() => {
                            if (isCollected) {
                                remove(id, "collection");
                                setIsCollected(false);
                            } else {
                                save(id, "collection");
                                setIsCollected(true);
                            }
                        }}
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
