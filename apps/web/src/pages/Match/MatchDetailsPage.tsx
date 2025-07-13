import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YStack, XStack, Text } from "tamagui";
import {
    useMatchDetails,
    useGameDetails,
    useFinalizeMatch,
    useRespondToMatch
} from "@checkmate/hooks";
import { useAuthStore } from "@checkmate/store";
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
    const user = useAuthStore((s) => s.user);
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
    } = useGameDetails(matchData?.match?.game_id ?? undefined);

    const { mutate: respond, loading: respondLoading, error: respondError } = useRespondToMatch();
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
            await respond(matchId, accept);
            await refetch();
        } catch (error) {
            console.error(error);
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

    const isCompleted = match.status === "completed";
    const allAccepted = participants.every((p) => p.approved === true);
    const anyDeclined = participants.some((p) => p.approved === false);
    const finalized = allAccepted && !isCompleted && !anyDeclined;

    useEffect(() => {
    if (isCompleted && matchId) {
        navigate(`/match/${matchId}/finalize`);
    }
}, [isCompleted, matchId, navigate]);


    // if (isCompleted) {
    //     navigate(`/match/${matchId}/finalize`);
    //     return null;
    // }

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
            {respondError && <Text color="red">{respondError}</Text>}
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
                        stateUserId={user?.id}
                        allAccepted={allAccepted}
                        isCompleted={isCompleted}
                        anyDeclined={anyDeclined}
                        results={results}
                        setResults={setResults}
                        handleRespond={handleRespond}
                        respondLoading={respondLoading}
                    />
                ))}
            </YStack>

            {finalized && (
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
