import React from "react";
import { useParams } from "react-router-dom";
import { YStack, XStack, Text, Image } from "tamagui";
import { useMatchDetails, useGameDetails } from "@checkmate/hooks";

export default function MatchFinalPage() {
    const { matchId } = useParams<{ matchId: string }>();

    const { data: matchData, loading: matchLoading, error: matchError } = useMatchDetails(matchId);
    const { game, loading: gameLoading } = useGameDetails(matchData?.match?.game_id);

    if (matchLoading || gameLoading) {
        return <Text>Loading...</Text>;
    }

    if (matchError || !matchData?.match) {
        return <Text>{matchError || "Match not found."}</Text>;
    }

    const { participants } = matchData;

    // Group participants by result
    const winners = participants.filter(p => p.result === "win");
    const ties = participants.filter(p => p.result === "tie");
    const losers = participants.filter(p => p.result === "loss");

    return (
        <YStack
            p="$4"
            gap="$4"
            maxWidth={600}
            width="100%"
            mx="auto"
        >
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

            <Text fontWeight="600">Final Results:</Text>

            {winners.length > 0 && (
                <>
                    <Text>Winners:</Text>
                    <YStack gap="$2">
                        {winners.map(p => (
                            <ParticipantRow key={p.user_id} username={p.username} avatar={p.avatar} />
                        ))}
                    </YStack>
                </>
            )}

            {ties.length > 0 && (
                <>
                    <Text>Tied:</Text>
                    <YStack gap="$2">
                        {ties.map(p => (
                            <ParticipantRow key={p.user_id} username={p.username} avatar={p.avatar} />
                        ))}
                    </YStack>
                </>
            )}

            {losers.length > 0 && (
                <>
                    <Text>Losers:</Text>
                    <YStack gap="$2">
                        {losers.map(p => (
                            <ParticipantRow key={p.user_id} username={p.username} avatar={p.avatar} />
                        ))}
                    </YStack>
                </>
            )}
        </YStack>
    );
}

function ParticipantRow({ username, avatar }: { username: string; avatar?: string | null }) {
    return (
        <XStack
            ai="center"
            gap="$2"
            p="$2"
            borderWidth={1}
            borderColor="$gray6"
            borderRadius="$2"
        >
            <Image
                src={avatar || ""}
                width={32}
                height={32}
                borderRadius={9999}
            />
            <Text>{username}</Text>
        </XStack>
    );
}
