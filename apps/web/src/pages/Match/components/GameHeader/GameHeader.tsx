import React from "react";
import { XStack, Image, Text, YStack } from "tamagui";
import { GameImage } from "../../../Game/components";
import { Space } from "@tamagui/lucide-icons";

type GameHeaderProps = {
  game: {
    name: string;
    thumbnail?: string | null;
    minPlayers: number;
    maxPlayers: number;
    playingTime?: string | null;
  };
};

export default function GameHeader({ game }: GameHeaderProps) {
  return (
    <XStack ai="center" gap="$3">
      <GameImage src={game.thumbnail || undefined} rounded={true} />
      <YStack width="70%" jc="space-between" gap="$4">
        <Text fontSize="$4" fontWeight="700">
          {game?.name}
        </Text>
        <Text fontSize="0.8rem">
          {`Players: ${game.minPlayers} - ${game.maxPlayers}`}
        </Text>
        {game.playingTime && (
          <Text fontSize="0.8rem" fontWeight="700">
            {`Playing Time: ${game.playingTime}`}
          </Text>
        )}
      </YStack>
    </XStack>
  );
}
