import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { YStack, XStack, Text, Image, Spinner } from 'tamagui';
import { Heart, Bookmark } from '@tamagui/lucide-icons';
import { useAuthStore } from '@checkmate/store';
import { PrimaryButton } from '../../components/Styled';
import { IconButton, GameBadge } from './components';
import {
    cleanDescription
} from "../../utils"
import { useGameStore } from '@checkmate/store';

import {
    useSaveGame,
    useRemoveGame,
    useGameSaveStatus,
    useGetGameDetails
} from "@checkmate/hooks"

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
    const user = useAuthStore((s) => s.user);

    const { game, loading, error } = useGetGameDetails(id);
    const { status, loading: statusLoading } = useGameSaveStatus(user ? id : undefined);
    const { mutate: save } = useSaveGame();
    const { mutate: remove } = useRemoveGame();

    const statusMap = useGameStore((s) => s.saveStatus);
    const setSaveStatus = useGameStore((s) => s.setSaveStatus);
    const currentStatus = statusMap[id ?? ""];

    const isWishlisted = currentStatus?.wishlist ?? false;
    const isCollected = currentStatus?.collection ?? false;

    useEffect(() => {
    if (!currentStatus && user && id) {
        fetch(`/api/game/${id}/save-status`)
        .then((res) => res.json())
        .then((data) => {
            setSaveStatus(id, {
            wishlist: data.wishlist ?? false,
            collection: data.collection ?? false,
            });
        })
        .catch(console.error);
    }
    }, [id, currentStatus, setSaveStatus, user]);

    if (loading) {
        return (
            <YStack ai="center" jc="center" height="50vh">
                <Spinner />
            </YStack>
        );
    }

    if (error) {
        return (
            <YStack ai="center" jc="center" py="$4">
                <Text>Error: {error}</Text>
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

    if (!currentStatus) {
        return (
            <YStack ai="center" jc="center" py="$4">
            <Spinner />
            </YStack>
        );
    }

    const { name, description, minPlayers, maxPlayers, image, playingTime, yearPublished } = game;

    const cleanedDescription = cleanDescription(description)

    return (
        <YStack width="100%" gap="$4" px="$4" py="$4" maxWidth={700} mx="auto">
            {image ? (<Image
                source={{ uri: image }}
                width="100%"
                maxWidth="100%"
                aspectRatio={4 / 3}
                borderRadius="$3"
                height='auto'
            />) : (
                <Text textAlign='center' color="grey">No image found</Text>
            )}


            <Text fontSize="$6" fontWeight="700">{name}</Text>

            <Text color="$gray10" fontSize="$2">
                {yearPublished || null} • {playingTime ? `${playingTime} minutes` : null} • {minPlayers && maxPlayers ? `Players: ${minPlayers}-${maxPlayers}` : null}
            </Text>


            <Text whiteSpace="pre-wrap" fontSize="$3" mt="$2">
                {cleanedDescription || "No description"}
            </Text>

            {user && !statusLoading && (
                <XStack gap="$2" mt="$2">
                    <IconButton
                        text="Add to Wishlist"
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
                        text="Add to Collection"
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
            )}

            <Text fontSize="$3" mt="$3" mb="$1">Categories:</Text>
            <XStack flexWrap="wrap" mt="$2">
                {game.categories?.map((category) => (
                    <GameBadge key={category} label={category} type="category" />
                ))}
            </XStack>

            <Text fontSize="$3" mt="$4" mb="$1">Mechanics:</Text>
            <XStack flexWrap="wrap">
                {game.mechanics?.map((m) => (
                    <GameBadge key={m} label={m} type="mechanic" />
                ))}
            </XStack>


            <PrimaryButton
                disabled={!user}
                mt="$3"
                onPress={() => {
                    navigate(`/game/${id}/start-match`);
                }}
            >
                Start a Match
            </PrimaryButton>
            {!user ? (
                <Text mt="$3" color="$red10" textAlign='center'>
                    You must log in to start a match.
                </Text>
            )
                : null
            }

        </YStack>
    );
}
