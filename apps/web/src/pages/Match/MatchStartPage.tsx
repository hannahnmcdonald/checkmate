import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { YStack, XStack, Text, Image } from "tamagui";
import { getGameById, createMatch } from "@checkmate/api";
import { useGetCurrentFriends } from "@checkmate/hooks";
import MatchParticipants from "./components/MatchParticipants/MatchParticipants";
import { PrimaryButton } from "../../components/Styled";
import { GameHeader } from "./components";

export default function MatchStartPage() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const [game, setGame] = useState<any>(null);
  const [loadingGame, setLoadingGame] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { friends, loading: friendsLoading } = useGetCurrentFriends();
  const [selectedFriendIds, setSelectedFriendIds] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!gameId) return;
    (async () => {
      try {
        const res = await getGameById(gameId);
        setGame(res);
      } catch (err) {
        setError("Failed to load game.");
      } finally {
        setLoadingGame(false);
      }
    })();
  }, [gameId]);

  const toggleSelect = (id: string) => {
    setSelectedFriendIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleStartMatch = async () => {
    if (!gameId) return;
    setCreating(true);
    try {
      const { session_id } = await createMatch(gameId, selectedFriendIds);
      await new Promise((res) => setTimeout(res, 3000));
      navigate(`/match/${session_id}`);
    } catch (err) {
      console.error(err);
      setError("Failed to create match.");
    } finally {
      setCreating(false);
    }
  };

  if (loadingGame || friendsLoading) {
    return (
      <YStack p="$4">
        <Text>Loading...</Text>
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack p="$4">
        <Text>{error}</Text>
      </YStack>
    );
  }

  return (
    <YStack p="$4" gap="$4" maxWidth={600} width="100%" mx="auto">
      <GameHeader game={game} />

      <Text>Select friends to invite:</Text>

      <YStack gap="$2">
        {friends.map((friend) => (
          <MatchParticipants
            key={friend.id}
            friend={friend}
            checked={selectedFriendIds.includes(friend.id)}
            onChange={() => toggleSelect(friend.id)}
          />
        ))}
      </YStack>

      <XStack gap="$2" jc="center">
        <PrimaryButton
          onPress={handleStartMatch}
          disabled={creating || selectedFriendIds.length === 0}
          theme="active"
        >
          {creating ? "Starting..." : "Start Match"}
        </PrimaryButton>
        <PrimaryButton onPress={() => navigate(-1)} theme="gray">
          Cancel
        </PrimaryButton>
      </XStack>
    </YStack>
  );
}
