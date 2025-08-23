import { Text, XStack } from "tamagui";
// import { Brain, Dice5, Swords, DollarSign, Rocket } from "@tamagui/lucide-icons";

const categoryColors = {
  Economic: "#4D96FF",
  Fantasy: "#6BCB77",
  "Party Game": "#FFD93D",
  Deduction: "#FF6B6B",
  "Science Fiction": "#A55EEA",
  Adventure: "#E879F9",
  Exploration: "#F87171",
  "City Building": "#F8AE0C",
  "Video Game Theme": "#330EA5",
  "Space Exploration": "#CEDC3F",
  "Card Game": "#DD22FD",
  "Novel-based": "#0F4B6E",
  "Territory Building": "#98BFAF",
  Medieval: "#CD4C4C",
  Number: "#69C4D8",
  Political: "#2e1484",
  Negotiation: "#b4b613",
  Environmental: "#0c6fba",
  Civilization: "#c03065",
  "Industry / Manufacturing": "#6c6ae3",
  Humor: "#ef3c93",
  Puzzle: "#f97316",
  Trains: "#8b5cf6",
  "Expansion for Base-game": "#10b981",
  "Fan Expansion": "#db2777",
  Ancient: "#f59e0b",
  "Action / Dexterity": "#3b82f6",
  Educational: "#22c55e",
  Fighting: "#ef4444",
  Mystery: "#6366f1",
  Miniatures: "#f43f5e",
  Mythology: "#8b5cf6",
  Renaissance: "#e11d48",
  // fallback/default color:
  default: "#999",
};

const categoryIcons = {
  "Party Game": "🎲",
  Deduction: "🧠",
  Wargame: "⚔️",
  Economic: "💰",
  Fantasy: "🧙",
  "Science Fiction": "🚀",
  Exploration: "🗺️",
  Adventure: "🧗‍♂️",
  "City Building": "🏰",
  "Video Game Theme": "🎮",
  "Space Exploration": "🌌",
  "Card Game": "🃏",
  "Novel-based": "📖",
  "Territory Building": "🧭",
  Medieval: "🏰",
  Number: "➕",
  Political: "🗳️",
  Negotiation: "☎️",
  Environmental: "🌱",
  Civilization: "🌆",
  "Industry / Manufacturing": "🏗️",
  Humor: "😄",
  Trains: "🚂",
  "Expansion for Base-game": "➕",
  "Fan Expansion": "⭐",
  Ancient: "🏺",
  "Action / Dexterity": "🤸",
  Educational: "📚",
  Puzzle: "🧩",
  Fighting: "⚔️",
  Mystery: "🕵️",
  Miniatures: "🎨",
  Mythology: "🧙‍♂️",
  Renaissance: "🎭",
};

// TODO: Make these badges look different than the category
const mechanicColors = {
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
      <Text color="white" fontSize="$2" px="$2" mr="$2">
        {icon} {label}
      </Text>
    </XStack>
  );
}
