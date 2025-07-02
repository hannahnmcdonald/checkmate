import { Button } from 'tamagui';
import React from 'react';

export function IconButton({
    selected,
    onToggle,
    Icon,
}: {
    selected: boolean;
    onToggle: () => void;
    Icon: React.ElementType;
}) {
    return (
        <Button
            size="$3"
            p="$2"
            circular
            onPress={onToggle}
            backgroundColor={selected ? '$color2' : 'transparent'}
        >
            <Icon color={selected ? 'white' : '#999'} fill={selected ? 'white' : 'transparent'} />
        </Button>
    );
}
