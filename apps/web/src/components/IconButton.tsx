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
            size="$2"
            p="$2"
            circular
            onPress={onToggle}
            backgroundColor={selected ? '#4D96FF' : 'transparent'}
        >
            <Icon color={selected ? 'white' : '#999'} fill={selected ? 'white' : 'transparent'} />
        </Button>
    );
}
