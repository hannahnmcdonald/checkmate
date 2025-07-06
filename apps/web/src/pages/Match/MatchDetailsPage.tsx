import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YStack, XStack, Text, Image, Select } from "tamagui";
import {
    useMatchDetails,
    useGameDetails,
    useFinalizeMatch,
    useRespondToMatch
} from "@checkmate/hooks";
import { useAuth } from "@checkmate/state";
import { PrimaryButton } from "../../components/Styled";
import {
    ChevronDown,
    BadgeCheck,
    OctagonX,
    Hourglass,
    Info,
    CircleCheckBig,
    CircleCheck
} from "@tamagui/lucide-icons";
import { getAvatarUrl } from "../../utils";

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

            {/* Game Info */}
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

            {anyDeclined && (
                <XStack
                    ai="center"
                    gap="$2"
                    p="$2"
                    borderRadius="$2"
                    backgroundColor=" #EF4444"
                >
                    <OctagonX color="#4A1A1A" size={16} />
                    <Text fontSize="$2" color="#4A1A1A">
                        One or more participants declined this match. This match will not proceed.
                    </Text>
                </XStack>
            )
            }

            {!anyDeclined &&
                <XStack
                    ai="center"
                    gap="$2"
                    p="$2"
                    borderRadius="$2"
                    backgroundColor="$color3"
                >
                    {getStatusIcon()}
                    <Text fontSize="$2" color="$background">
                        {isCompleted
                            ? "Match completed."
                            : allAccepted
                                ? "All players have accepted."
                                : "Waiting for all participants to accept."}
                    </Text>
                </XStack>
            }
            <XStack jc="space-between" my="$2">
                <Text>Participants:</Text>
                <Text>
                    {participants.filter((p) => p.approved).length} / {participants.length} accepted
                </Text>
            </XStack>

            {/* Participant List */}
            <YStack gap="$2">
                {participants.map((p) => (
                    <XStack
                        key={p.user_id}
                        ai="center"
                        jc="space-between"
                        p="$2"
                        borderWidth={1}
                        borderColor="$gray6"
                        borderRadius="$2"
                    >
                        <XStack ai="center" gap="$2">
                            <Image
                                src={getAvatarUrl(p.avatar)}
                                width={32}
                                height={32}
                                borderRadius={9999}
                            />
                            <Text>{p.username}</Text>
                        </XStack>

                        {(() => {
                            if (p.user_id === state.user?.id && p.approved === null && !anyDeclined) {
                                return (<XStack gap="$2" jc="center">
                                    <PrimaryButton
                                        onPress={() => handleRespond(true)}
                                        disabled={respond.loading}
                                    >
                                        Accept
                                    </PrimaryButton>
                                    <PrimaryButton
                                        onPress={() => handleRespond(false)}
                                        disabled={respond.loading}
                                        theme="red"
                                    >
                                        Decline
                                    </PrimaryButton>
                                </XStack>
                                )
                            }
                            if (p.approved === null && p.user_id != state.user?.id) {
                                return <Hourglass />;
                            }
                            if (p.approved === false) {
                                return <OctagonX color="#EF4444" />;
                            }
                            if (p.approved === true && allAccepted && !isCompleted && isCreator) {
                                return (
                                    <Select
                                        value={results[p.user_id] || ""}
                                        onValueChange={(value) =>
                                            setResults((prev) => ({
                                                ...prev,
                                                [p.user_id]: value as "win" | "tie" | "loss"
                                            }))
                                        }
                                    >
                                        <Select.Trigger
                                            width={140}
                                            borderWidth={1}
                                            borderColor="$color2"
                                            borderRadius="$2"
                                            backgroundColor="$background"
                                            jc="space-between"
                                            px="$2"
                                            height={36}
                                        >
                                            <Select.Value placeholder="Select" />
                                            <Select.Icon>
                                                <ChevronDown />
                                            </Select.Icon>
                                        </Select.Trigger>
                                        <Select.Content zIndex={200000}>
                                            <Select.ScrollUpButton />
                                            <Select.Viewport>
                                                <Select.Item index={1} value="win">
                                                    <Select.ItemText>Win</Select.ItemText>
                                                </Select.Item>
                                                <Select.Item index={2} value="tie">
                                                    <Select.ItemText>Tie</Select.ItemText>
                                                </Select.Item>
                                                <Select.Item index={3} value="loss">
                                                    <Select.ItemText>Loss</Select.ItemText>
                                                </Select.Item>
                                            </Select.Viewport>
                                            <Select.ScrollDownButton />
                                        </Select.Content>
                                    </Select>
                                );
                            }
                            if (p.approved === true) {
                                return <BadgeCheck />;
                            }
                            return null;
                        })()}
                    </XStack>
                ))}
            </YStack>

            {/* Finalize Button */}
            {
                isCreator && allAccepted && !isCompleted && !anyDeclined && (
                    <>
                        <Text fontSize="$2" color="$color2">
                            Select results for each player before finalizing.
                        </Text>
                        <PrimaryButton
                            onPress={handleFinalize}
                            disabled={
                                finalize.loading ||
                                Object.keys(results).length !== participants.length ||
                                Object.values(results).some((r) => !r)
                            }
                            theme="active"
                        >
                            {finalize.loading ? "Finalizing..." : "Finalize Match"}
                        </PrimaryButton>
                    </>
                )
            }
        </YStack >
    );
}
