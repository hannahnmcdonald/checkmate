import { Card, YStack, Text, Image, Button } from 'tamagui'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { PrimaryButton } from './Styled'

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
            width={200}
            height={400}
            padding="$4"
            gap="$3"
            bg="$backgroundHover"
        >
            {/* Game Image */}
            <Image
                source={{ uri: imageUrl }}
                width="100%"
                height={100}
                borderRadius="$2"
            />

            {/* Game name */}
            <Text fontWeight="700"
                numberOfLines={2}
                fontSize="$2"
                py={25}
            >
                {name}
            </Text>

            {/* Description */}
            <Text color="$color2" fontSize={12} numberOfLines={3}>
                {description}
            </Text>

            {/* Players */}
            <Text color="$color3" fontSize={14} ellipsizeMode="tail">
                Players: {minPlayers} - {maxPlayers}
            </Text>

            {/* View Details */}
            <PrimaryButton
                size="$2"
                onPress={() => navigate(`/game/${id}`)}
            >
                View Details
            </PrimaryButton>
        </Card>
    )
}
