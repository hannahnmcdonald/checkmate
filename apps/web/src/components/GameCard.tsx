import { Card, XStack, Text, Image, Button } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { PrimaryButton } from './Styled'
import { Heart, PlusSquare } from '@tamagui/lucide-icons';

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
    const navigate = useNavigate()

    return (
        <Card
            elevate
            bordered
            width="100%"
            maxWidth={200}
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

            <XStack gap="$2" mt="auto">
                <Button
                    size="$2"
                    circular
                    icon={Heart}
                    onPress={() => {
                        // handle wishlist toggle
                    }}
                />
                <Button
                    size="$2"
                    circular
                    icon={PlusSquare}
                    onPress={() => {
                        // handle add to collection
                    }}
                />
            </XStack>

            <PrimaryButton
                size="$2"
                onPress={() => navigate(`/game/${id}`)}
            >
                View Details
            </PrimaryButton>
        </Card>
    )
}
