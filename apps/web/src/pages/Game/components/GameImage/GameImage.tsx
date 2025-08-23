import React from "react";
import { YStack, Image, Text } from "tamagui";

export default function GameImage({
  src,
  rounded = true,
}: {
  src?: string;
  rounded?: boolean;
}) {
  const [ratio, setRatio] = React.useState(16 / 9); // sensible default

  if (!src) {
    return (
      <Text textAlign="center" color="$gray10">
        No image found
      </Text>
    );
  }

  return (
    <YStack br={rounded ? "$4" : undefined} overflow="hidden">
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 12,
          display: "block",
          objectFit: "cover",
        }}
        loading="lazy"
        decoding="async"
      />
    </YStack>
  );
}
