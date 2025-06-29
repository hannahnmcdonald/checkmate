import {
    XStack,
    YStack,
    Theme,
} from 'tamagui';
import { PrimaryButton } from '../Styled';
// import logo from '../../images/CheckMateNavLogo.png';
import AnimatedLogo from './AnimatedLogo';
import { useAuth } from '@checkmate/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { X } from '@tamagui/lucide-icons';

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
                borderBottomColor="$color2"
                shadowColor="black"
                shadowOpacity={0.3}
                shadowRadius={20}
                py="$2"
                px="$4"
                borderRadius={20}
                jc="space-between"
            // ac="space-between"
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
                    <XStack gap="$2">
                        {user && (
                            <><PrimaryButton size="$2" onPress={() => navigate('/games')}>
                                Games
                            </PrimaryButton><PrimaryButton size="$2" onPress={() => navigate('/friends/search')}>
                                    Friends
                                </PrimaryButton><PrimaryButton size="$2" onPress={() => navigate('/profile')}>
                                    Profile
                                </PrimaryButton><PrimaryButton
                                    size="$2"
                                    onPress={() => {
                                        fetch('/api/logout', { method: 'POST', credentials: 'include' }).then(() => location.reload()
                                        );
                                    }}
                                >
                                    Logout
                                </PrimaryButton></>
                        )}

                        {!user && window.location.pathname !== '/login' && (
                            <PrimaryButton size="$2" color="$background" onPress={() => navigate('/login')}>
                                Login
                            </PrimaryButton>
                        )}

                        {/* {!user && window.location.pathname !== '/register' && window.location.pathname !== '/' && (
                            <PrimaryButton size="$2" color="$background" onPress={() => navigate('/register')}>
                                Register
                            </PrimaryButton>
                        )} */}
                    </XStack>
                </XStack>
            </YStack >
        </Theme >
    );
}
