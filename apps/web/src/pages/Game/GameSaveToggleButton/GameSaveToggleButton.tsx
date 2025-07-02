import { Button } from "tamagui";
import React, { useState, useEffect } from "react";
import { useSaveGame } from '../../../hooks/useSaveGame'
import { useRemoveGame } from "../../../hooks/useRemoveGame";

type Props = {
    gameId: string;
    category: "wishlist" | "collection";
    icon: any;
    initiallySaved?: boolean;
};

export function GameSaveToggleButton({ gameId, category, icon, initiallySaved = false }: Props) {
    const { mutate: save } = useSaveGame();
    const { mutate: remove } = useRemoveGame();
    const [saved, setSaved] = useState(initiallySaved);
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        setLoading(true);
        try {
            if (saved) {
                await remove(gameId, category);
                setSaved(false);
            } else {
                await save(gameId, category);
                setSaved(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            size="$2"
            circular
            icon={
                React.createElement(icon, {
                    color: saved ? "white" : "black",
                    fill: saved ? "white" : "transparent",
                })
            }
            theme={"tealDark"}
            onPress={handleToggle}
            disabled={loading}
        />
    );
}
