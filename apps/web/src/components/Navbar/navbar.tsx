import {
    XStack,
    YStack,
    Text,
    Input,
    Button,
    Theme,
} from 'tamagui';
import { PrimaryButton } from '../styled';
import logo from '../../images/CheckMateNavLogo.png';
import { useAuth } from '@checkmate/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <YStack
            position="fixed"
            top={10}
            left={10}
            right={10}
            zIndex={100}
            bg="rgba(255,255,255,0.35)"
            opacity={1}
            borderRadius="$10"
            backdropFilter="blur(10px)"
        >
            <XStack
                ai="center"
                jc="space-between"
                px="$4"
                py="$3"
                w="100%"
                maxWidth={1200}
                marginHorizontal="auto"
            >
                <XStack
                    ai="center"
                    gap="$2"
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

                {user && (
                    <XStack ai="center" gap="$3">
                        <PrimaryButton size="$2" onPress={() => navigate('/games')}>
                            Games
                        </PrimaryButton>
                        <PrimaryButton size="$2" onPress={() => navigate('/friends/search')}>
                            Friends
                        </PrimaryButton>
                        <PrimaryButton size="$2" onPress={() => navigate('/profile')}>
                            Profile
                        </PrimaryButton>
                        <PrimaryButton
                            size="$2"
                            onPress={() => {
                                fetch('/api/logout', { method: 'POST', credentials: 'include' }).then(() =>
                                    location.reload()
                                )
                            }}
                        >
                            Logout
                        </PrimaryButton>
                    </XStack>
                )}

                {!user && (
                    <XStack ai="center" gap="$3">
                        <PrimaryButton size="$2" onPress={() => navigate('/login')}>
                            Login
                        </PrimaryButton>
                        {/* <PrimaryButton size="$2" onPress={() => navigate('/register')}>
                            Register
                        </PrimaryButton> */}
                    </XStack>
                )}
            </XStack>
        </YStack >
    );
}
