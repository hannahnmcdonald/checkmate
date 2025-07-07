import React from "react";
import { XStack, Image, Text } from "tamagui";

type GameHeaderProps = {
    game: {
        name: string;
        thumbnail?: string | null;
    };
};

export default function GameHeader({ game }: GameHeaderProps) {
    return (
        <XStack ai="center" gap="$3">
            <Image
                src={game?.thumbnail || ""}
                width={80}
                aspectRatio={4 / 3}
                borderRadius="$2"
            />
            <Text fontSize="$6" fontWeight="700">
                {game?.name}
            </Text>
        </XStack>
    );
}
