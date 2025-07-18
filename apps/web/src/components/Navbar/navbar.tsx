import {
    XStack,
    YStack,
    Theme,
} from 'tamagui';
import { PrimaryButton } from '../Styled';
import logo from '../../images/navbarlogo.png'
import { useAuthStore } from '@checkmate/store';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { MenuButton } from './MenuButton';
import { useMedia } from 'tamagui';
import { NotificationButton } from '../index'

export default function Navbar(theme: string) {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const navigate = useNavigate();
    const media = useMedia();
    const isSmallScreen = media.sm;

    return (
        <Theme name={theme}>
            <YStack
                position="sticky"
                top={18}
                zIndex={100}
                bg="rgba(255,255,255,0.15)"
                backdropFilter="blur(10px)"
                borderBottomWidth={2}
                borderBottomColor="$color2"
                shadowColor="black"
                shadowOpacity={0.3}
                shadowRadius={20}
                py="$2"
                px="$4"
                borderRadius={20}
                jc="space-between"
            >
                <XStack
                    width="100%"
                    jc="space-between"
                    ai="center"
                    px="$1"
                    py="$1"
                >
                    <XStack
                        onPress={() => navigate('/')}
                    >
                        <img
                            src={logo}
                            alt="Checkmate Logo"
                            style={{
                                height: 32,
                                width: 'auto',
                                display: 'block',
                            }}
                        />

                    </XStack>
                    {!isSmallScreen ? (
                        <XStack gap="$2">
                            <PrimaryButton size="$2" onPress={() => navigate('/games')}>
                                Discover
                            </PrimaryButton>
                            {user && (
                                <><PrimaryButton size="$2" onPress={() => navigate('/friends')}>
                                    Friends
                                </PrimaryButton><PrimaryButton size="$2" onPress={() => navigate('/profile')}>
                                        Profile
                                    </PrimaryButton><PrimaryButton
                                        size="$2"
                                        onPress={async () => {
                                            await logout();
                                            window.location.href = "/login";
                                        }}
                                    >
                                        Logout
                                    </PrimaryButton>
                                    <NotificationButton />
                                </>
                            )}

                            {!user && window.location.pathname !== '/login' && (
                                <PrimaryButton size="$2" color="$background" onPress={() => navigate('/login')}>
                                    Login
                                </PrimaryButton>
                            )}

                        </XStack>
                    ) : (
                        <MenuButton />
                    )}
                </XStack>
            </YStack >
        </Theme >
    );
}
