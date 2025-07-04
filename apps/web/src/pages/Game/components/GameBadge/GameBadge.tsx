import { Text, XStack } from "tamagui";
// import { Brain, Dice5, Swords, DollarSign, Rocket } from "@tamagui/lucide-icons";

const categoryColors = {
    "Economic": "#4D96FF",
    "Fantasy": "#6BCB77",
    "Party Game": "#FFD93D",
    "Deduction": "#FF6B6B",
    "Science Fiction": "#A55EEA",
    "Adventure": "#E879F9",
    "Exploration": "#F87171",
    "City Building": "#F8AE0C",
    "Video Game Theme": "#330EA5",
    "Space Exploration": "#CEDC3F",
    "Card Game": "#DD22FD",
    "Novel-based": "#0F4B6E",
    "Territory Building": "#98BFAF",
    "Medieval": "#CD4C4C",
    "Number": "#69C4D8",
    "Political": "#2e1484",
    "Negotiation": "#b4b613",
    "Environmental": "#0c6fba",
    "Civilization": "#c03065",
    "Industry / Manufacturing": "#6c6ae3",
    "Humor": "#ef3c93",
    // fallback/default color:
    "default": "#999",
};

const categoryIcons = {
    "Party Game": "🎲",
    "Deduction": "🧠",
    "Wargame": "⚔️",
    "Economic": "💰",
    "Fantasy": "🧙",
    "Science Fiction": "🚀",
    "Exploration": "🗺️",
    "Adventure": "🧗‍♂️",
    "City Building": "🏰",
    "Video Game Theme": "🎮",
    "Space Exploration": "🌌",
    "Card Game": "🃏",
    "Novel-based": "📖",
    "Territory Building": "🧭",
    "Medieval": "🏰",
    "Number": "➕",
    "Political": "🗳️",
    "Negotiation": "☎️",
    "Environmental": "🌱",
    "Civilization": "🌆",
    "Industry / Manufacturing": "🏗️",
    "Humor": "😄"
};

// TODO: migrate to lucide icons? 
// const categoryIcons = {
//     "Party Game": <Dice5 size={12} color="white" />,
//     "Deduction": <Brain size={12} color="white" />,
//     "Wargame": <Swords size={12} color="white" />,
//     "Economic": <DollarSign size={12} color="white" />,
//     "Science Fiction": <Rocket size={12} color="white" />,
// };

// TODO: Make these badges look different than the category
const mechanicColors = {
    "Deck Building": "#666",
    "Worker Placement": "#888",
    "Cooperative Play": "#AAA",
    default: "#555",
};

export default function GameBadge({
    label,
    type,
}: {
    label: string;
    type: "category" | "mechanic";
}) {
    const bg =
        type === "category"
            ? categoryColors[label] || categoryColors.default
            : mechanicColors[label] || mechanicColors.default;

    const icon = type === "category" ? categoryIcons[label] : null;

    return (
        <XStack
            gap="$1"
            px="$2"
            py="$1"
            br={16}
            bg={bg}
            ai="center"
            jc="center"
            mr="$2"
            mb="$2"
        >
            <Text color="white" fontSize="$2" px="$2">
                {icon} {label}
            </Text>
        </XStack>
    );
}
