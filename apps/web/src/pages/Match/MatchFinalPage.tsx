import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { YStack, XStack, Text, Image } from "tamagui";
import { useMatchDetails, useGameDetails } from "@checkmate/hooks";
import { getAvatarUrl } from "../../utils";
import {
    GameHeader,
    FinalParticipantRow
} from "./components"

export default function MatchFinalPage() {
    const { matchId } = useParams<{ matchId: string }>();

    const { data: matchData, loading: matchLoading, error: matchError } = useMatchDetails(matchId);
    const [gameId, setGameId] = useState<string | undefined>();
    const { game, loading: gameLoading } = useGameDetails(gameId);

    useEffect(() => {
        if (matchData?.match?.game_id) {
            setGameId(matchData.match.game_id);
        }
    }, [matchData]);

    if (matchLoading || gameLoading) {
        return <Text>Loading...</Text>;
    }

    if (matchError || !matchData?.match) {
        return <Text>{matchError || "Match not found."}</Text>;
    }

    const { participants } = matchData;

    const winners = participants.filter(p => p.result === "win");
    const ties = participants.filter(p => p.result === "tie");
    const losers = participants.filter(p => p.result === "loss");

    return (
        <YStack p="$4" gap="$4" maxWidth={600} width="100%" mx="auto">
            <GameHeader game={game} />

            <Text fontWeight="600">Final Results:</Text>

            {winners.length > 0 && (
                <>
                    <Text>Winners:</Text>
                    <YStack gap="$2">
                        {winners.map(p => (
                            <FinalParticipantRow
                                key={p.user_id}
                                username={p.username}
                                avatar={p.avatar}
                                result={p.result}
                            />
                        ))}
                    </YStack>
                </>
            )}

            {ties.length > 0 && (
                <>
                    <Text>Tied:</Text>
                    <YStack gap="$2">
                        {ties.map(p => (
                            <FinalParticipantRow
                                key={p.user_id}
                                username={p.username}
                                avatar={p.avatar}
                                result={p.result}
                            />
                        ))}
                    </YStack>
                </>
            )}

            {losers.length > 0 && (
                <>
                    <Text>Losers:</Text>
                    <YStack gap="$2">
                        {losers.map(p => (
                            <FinalParticipantRow
                                key={p.user_id}
                                username={p.username}
                                avatar={p.avatar}
                                result={p.result}
                            />
                        ))}
                    </YStack>
                </>
            )}
        </YStack>
    );
}
