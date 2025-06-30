import React, { useEffect, useState } from "react";
import { XStack, Text } from "tamagui";
import { useLocation } from "react-router-dom";

const colorPalette = [
    "#ED5F00", // red/orange
    "#299764", // green
    "#0081f1", // blue
    // "#F7CE00", // yellow
    "#D23197", // pink
    "#8445BC", // purple
    "#DC3D43", // dark red
];

const letters = "CheckMate".split("");

export default function AnimatedLogo() {
    const [letterColors, setLetterColors] = useState<string[]>([]);
    const location = useLocation();

    useEffect(() => {
        const newColors = letters.map(() =>
            colorPalette[Math.floor(Math.random() * colorPalette.length)]
        );
        setLetterColors(newColors);
    }, [location.pathname]);

    return (
        <XStack ai="center" gap="$1">
            {letters.map((letter, index) => (
                <Text
                    key={index}
                    fontWeight="700"
                    fontSize="1.75rem"
                    textShadowColor="black"
                    textShadowOffset={{ width: 0, height: 0 }}
                    textShadowRadius={2}
                    color={letterColors[index]}
                >
                    {letter}
                </Text>
            ))}
        </XStack>
    );
}
