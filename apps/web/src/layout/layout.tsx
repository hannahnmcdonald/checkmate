import { Theme, YStack } from 'tamagui'
import React from 'react';
import { Navbar, Footer } from '../components';

interface LayoutProps {
    children: React.ReactNode;
    theme: string;
}

export default function Layout({ children, theme }: LayoutProps) {
    return (
        <Theme name={theme}>
            <YStack bg="$background" minHeight="100vh" px="$4" py="$4">
                <Navbar theme={theme} />
                {children}
                <Footer />
            </YStack>
        </Theme>
    )
}
