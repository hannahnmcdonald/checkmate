import React from "react";
import { XStack, Text, Image, Select } from "tamagui";
import {
  ChevronDown,
  BadgeCheck,
  OctagonX,
  Hourglass,
} from "@tamagui/lucide-icons";
import { PrimaryButton } from "../../../../components/Styled";
import { getAvatarUrl } from "../../../../utils";

type Participant = {
  user_id: string;
  username: string;
  avatar?: string | null;
  approved: boolean | null;
};

type ParticipantRowProps = {
  participant: Participant;
  stateUserId?: string;
  allAccepted: boolean;
  isCompleted: boolean;
  anyDeclined: boolean;
  results: Record<string, "win" | "tie" | "loss">;
  setResults: React.Dispatch<
    React.SetStateAction<Record<string, "win" | "tie" | "loss">>
  >;
  handleRespond: (accept: boolean) => void;
  respondLoading: boolean;
};

export default function ParticipantRow({
  participant: p,
  stateUserId,
  allAccepted,
  isCompleted,
  anyDeclined,
  results,
  setResults,
  handleRespond,
  respondLoading,
}: ParticipantRowProps) {
  return (
    <XStack
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
        if (p.user_id === stateUserId && p.approved === null && !anyDeclined) {
          return (
            <XStack gap="$2" jc="center">
              <PrimaryButton
                onPress={() => handleRespond(true)}
                disabled={respondLoading}
              >
                Accept
              </PrimaryButton>
              <PrimaryButton
                onPress={() => handleRespond(false)}
                disabled={respondLoading}
                theme="red"
              >
                Decline
              </PrimaryButton>
            </XStack>
          );
        }
        if (p.approved === null && p.user_id !== stateUserId) {
          return <Hourglass />;
        }
        if (p.approved === false) {
          return <OctagonX color="#EF4444" />;
        }
        if (p.approved === true && allAccepted && !isCompleted) {
          return (
            <Select
              value={results[p.user_id] || ""}
              onValueChange={(value) =>
                setResults((prev) => ({
                  ...prev,
                  [p.user_id]: value as "win" | "tie" | "loss",
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
  );
}
