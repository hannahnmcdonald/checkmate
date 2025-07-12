import { Card, XStack, Text, Image, Button } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { PrimaryButton } from '../../../../components/Styled'
import { Heart, Bookmark } from '@tamagui/lucide-icons';
import { useMedia } from 'tamagui';
import { IconButton } from '../index'
import {
    useSaveGame,
    useRemoveGame
} from "@checkmate/hooks";
import { useGameStore } from "@checkmate/store";
import { cleanDescription } from "../../../../utils"

export default function GameCard({
    id,
    imageUrl,
    name,
    description,
    minPlayers,
    maxPlayers,
    savedGames,
    isOwner,
}: {
    id: string;
    imageUrl: string;
    name: string;
    description: string;
    minPlayers: number;
    maxPlayers: number;
    savedGames: { game_id: string; category: string }[];
    isOwner: boolean;
}) {

    const statusMap = useGameStore((s) => s.saveStatus);
    const setSaveStatus = useGameStore((s) => s.setSaveStatus);

    const currentStatus = statusMap[id];

    const navigate = useNavigate()

    const media = useMedia();
    const isSmall = media.sm;
    const isLarge = media.lg;

    const isWishlisted = currentStatus?.wishlist ?? false;
    const isCollected = currentStatus?.collection ?? false;

    const { mutate: save } = useSaveGame();
    const { mutate: remove } = useRemoveGame();

    const cleanedDescription = cleanDescription(description)

    useEffect(() => {
    if (!(id in statusMap) && savedGames) {
        const wishlist = savedGames.some(g => g.game_id === id && g.category === "wishlist");
        const collection = savedGames.some(g => g.game_id === id && g.category === "collection");

        setSaveStatus(id, { wishlist, collection });
    }
    }, [statusMap, id, savedGames, setSaveStatus]);

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
                aspectRatio={4 / 3}
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

            <Text whiteSpace="pre-wrap" numberOfLines={10}>
                {cleanedDescription}
            </Text>

            <Text color="$color3" fontSize={14} ellipsizeMode="tail">
                Players: {minPlayers} - {maxPlayers}
            </Text>

            {isOwner ? (
                <XStack gap="$2" mt="auto">
                    <IconButton
                        selected={isWishlisted}
                        Icon={Heart}
                        onToggle={() => {
                            if (isWishlisted) {
                            remove(id, "wishlist");
                            setSaveStatus(id, {
                                wishlist: false,
                                collection: currentStatus?.collection ?? false,
                                });
                            } else {
                            save(id, "wishlist");
                            setSaveStatus(id, { ...currentStatus, wishlist: true });
                            }
                        }}
                    />
                    <IconButton
                        selected={isCollected}
                        Icon={Bookmark}
                        onToggle={() => {
                            if (isCollected) {
                            remove(id, "collection");
                            setSaveStatus(id, { ...currentStatus, collection: false });
                            } else {
                            save(id, "collection");
                            setSaveStatus(id, {
                                wishlist: currentStatus?.wishlist ?? false,
                                collection: true,
                                });
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
