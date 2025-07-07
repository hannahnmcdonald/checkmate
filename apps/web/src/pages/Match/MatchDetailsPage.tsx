import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YStack, XStack, Text } from "tamagui";
import {
    useMatchDetails,
    useGameDetails,
    useFinalizeMatch,
    useRespondToMatch
} from "@checkmate/hooks";
import { useAuth } from "@checkmate/state";
import {
    Info,
    CircleCheckBig,
    CircleCheck
} from "@tamagui/lucide-icons";
import {
    FinalizeMatchButton,
    GameHeader,
    ParticipantRow,
    MatchStatusBanner,
    // MatchParticipants
} from "./components";

export default function MatchDetailsPage() {
    const { matchId } = useParams<{ matchId: string }>();
    const { state } = useAuth();
    const navigate = useNavigate();

    const {
        data: matchData,
        loading: matchLoading,
        error: matchError,
        refetch
    } = useMatchDetails(matchId);

    const {
        game,
        loading: gameLoading,
        error: gameError
    } = useGameDetails(matchData?.match?.game_id);

    const respond = useRespondToMatch();
    const finalize = useFinalizeMatch();

    const [results, setResults] = useState<Record<string, "win" | "tie" | "loss">>({});

    if (matchLoading || gameLoading) {
        return <Text>Loading...</Text>;
    }

    if (matchError) {
        return <Text>{matchError}</Text>;
    }

    if (!matchData?.match) {
        return <Text>Match not found.</Text>;
    }

    const handleRespond = async (accept: boolean) => {
        if (!matchId) return;
        try {
            await respond.mutate(matchId, accept);
            await refetch();
        } catch (error) {
            console.log(error)
        }
    };

    const handleFinalize = async () => {
        if (!matchId) return;
        try {
            await finalize.mutate(
                matchId,
                Object.entries(results).map(([user_id, result]) => ({
                    user_id,
                    result
                }))
            );
            navigate(`/match/${matchId}/finalize`);
        } catch { }
    };

    const { match, participants } = matchData;
    const isCreator = match.creator_id === state.user?.id;
    const allAccepted = participants.every((p) => p.approved === true);
    const isCompleted = match.status === "completed";
    const anyDeclined = participants.some(p => p.approved === false);

    console.log(match.status)

    if (isCompleted) {
        navigate(`/match/${matchId}/finalize`);
        return null;
    }

    function getStatusIcon() {
        if (isCompleted) return <CircleCheckBig color="$background" size={16} />;
        if (allAccepted) return <CircleCheck color="$background" size={16} />;
        return <Info color="$background" size={16} />;
    }

    return (
        <YStack
            p="$4"
            gap="$4"
            maxWidth={600}
            width="100%"
            mx="auto"
        >
            {respond.error && <Text color="red">{respond.error}</Text>}
            {finalize.error && <Text color="red">{finalize.error}</Text>}

            <GameHeader game={game} />

            <MatchStatusBanner
                anyDeclined={anyDeclined}
                isCompleted={isCompleted}
                allAccepted={allAccepted}
                icon={getStatusIcon()}
            />

            <XStack jc="space-between" my="$2">
                <Text>Participants:</Text>
                <Text>
                    {participants.filter((p) => p.approved).length} / {participants.length} accepted
                </Text>
            </XStack>

            <YStack gap="$2">
                {participants.map((p) => (
                    <ParticipantRow
                        key={p.user_id}
                        participant={p}
                        stateUserId={state.user?.id}
                        allAccepted={allAccepted}
                        isCompleted={isCompleted}
                        anyDeclined={anyDeclined}
                        results={results}
                        setResults={setResults}
                        handleRespond={handleRespond}
                        respondLoading={respond.loading}
                    />
                ))}
            </YStack>

            {allAccepted && !isCompleted && !anyDeclined && (
                <FinalizeMatchButton
                    onFinalize={handleFinalize}
                    finalizeLoading={finalize.loading}
                    results={results}
                    participantsCount={participants.length}
                />
            )}
        </YStack>
    )
};
