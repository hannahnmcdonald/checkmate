import React from "react";
import { XStack, Text, Image } from "tamagui";
import { getAvatarUrl } from "../../../../utils";

type FinalParticipantRowProps = {
    username: string;
    avatar?: string | null;
    result: "win" | "tie" | "loss";
};

export default function FinalParticipantRow({
    username,
    avatar,
    result,
}: FinalParticipantRowProps) {
    const badgeColor =
        result === "win" ? "$green10" :
            result === "tie" ? "$yellow10" :
                "$red10";

    return (
        <XStack
            ai="center"
            gap="$2"
            p="$2"
            borderWidth={1}
            borderColor={badgeColor}
            borderRadius="$2"
        >
            <Image
                src={getAvatarUrl(avatar)}
                width={32}
                height={32}
                borderRadius={9999}
            />
            <Text fontWeight="600" px="$2">{username}</Text>
        </XStack>
    );
}
