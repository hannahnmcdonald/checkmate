import {
    XStack,
    YStack,
    Text,
    Input,
    Button,
    Theme,
} from 'tamagui';
import { PrimaryButton } from '../Styled';
// import logo from '../../images/CheckMateNavLogo.png';
import AnimatedLogo from './AnimatedLogo';
import { useAuth } from '@checkmate/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Navbar(theme: string) {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Theme name={theme}>
            <YStack
                position="sticky"
                top={18}
                zIndex={100}
                bg="rgba(255,255,255,0.08)"
                backdropFilter="blur(10px)"
                borderBottomWidth={2}
                borderBottomColor="#4D96FF"
                shadowColor="black"
                shadowOpacity={0.3}
                shadowRadius={20}
                py="$2"
                px="$4"
                borderRadius={20}
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
                        {/* <img
                            src={logo}
                            alt="Checkmate Logo"
                            style={{
                                height: 32,
                                width: 'auto',
                                display: 'block',
                            }}
                        /> */}

                        <AnimatedLogo />
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
                            <PrimaryButton size="$2" color="$background" onPress={() => navigate('/login')}>
                                Login
                            </PrimaryButton>
                            {/* <PrimaryButton size="$2" onPress={() => navigate('/register')}>
                            Register
                        </PrimaryButton> */}
                        </XStack>
                    )}
                </XStack>
            </YStack >
        </Theme>
    );
}
