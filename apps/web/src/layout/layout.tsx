import { Theme, YStack } from 'tamagui'
import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    theme: string;
}

export default function Layout({ children, theme }: LayoutProps) {
    return (
        <Theme name={theme}>
            <YStack bg="$background" minHeight="100vh" px="$4" py="$4">
                {children}
            </YStack>
        </Theme>
    )
}
