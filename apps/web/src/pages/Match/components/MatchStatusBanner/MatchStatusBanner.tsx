import React, { JSX } from "react";
import { XStack, Text } from "tamagui";
import { Info, CircleCheck, CircleCheckBig, OctagonX } from "@tamagui/lucide-icons";

type MatchStatusBannerProps = {
    anyDeclined: boolean;
    isCompleted: boolean;
    allAccepted: boolean;
    icon: JSX.Element;
};

export default function MatchStatusBanner({
    anyDeclined,
    isCompleted,
    allAccepted
}: MatchStatusBannerProps) {
    const icon = isCompleted
        ? <CircleCheckBig color="#fff" size={16} />
        : allAccepted
            ? <CircleCheck color="#fff" size={16} />
            : <Info color="#fff" size={16} />;

    if (anyDeclined) {
        return (
            <XStack
                ai="center"
                gap="$2"
                p="$2"
                borderRadius="$2"
                backgroundColor="#EF4444"
            >
                <OctagonX color="#4A1A1A" size={16} />
                <Text fontSize="$2" color="#4A1A1A">
                    One or more participants declined this match. This match will not proceed.
                </Text>
            </XStack>
        );
    }

    return (
        <XStack
            ai="center"
            gap="$2"
            p="$2"
            borderRadius="$2"
            backgroundColor="$color3"
        >
            {icon}
            <Text fontSize="$2" color="$background">
                {isCompleted
                    ? "Match completed."
                    : allAccepted
                        ? "All players have accepted."
                        : "Waiting for all participants to accept."}
            </Text>
        </XStack>
    );
}
