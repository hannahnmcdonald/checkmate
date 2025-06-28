import {
    XStack,
    YStack,
    Text,
    Input,
    Button,
    Theme,
} from 'tamagui';
import logo from '../../images/CheckMateNavLogo.png';
import { useAuth } from '@checkmate/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Navbar() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <YStack
            position="absolute"
            top={10}
            left={10}
            right={10}
            zIndex={100}
            bg="rgba(255,255,255,0.8)"
            opacity={1}
            borderRadius="$4"
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
                        <Button size="$2" onPress={() => navigate('/games')}>
                            Games
                        </Button>
                        <Button size="$2" onPress={() => navigate('/friends/search')}>
                            Friends
                        </Button>
                        <Button size="$2" onPress={() => navigate('/profile')}>
                            Profile
                        </Button>
                        <Button
                            size="$2"
                            onPress={() => {
                                fetch('/api/logout', { method: 'POST', credentials: 'include' }).then(() =>
                                    location.reload()
                                )
                            }}
                        >
                            Logout
                        </Button>
                    </XStack>
                )}

                {!user && (
                    <XStack ai="center" gap="$3">
                        <Button size="$2" onPress={() => navigate('/login')}>
                            Login
                        </Button>
                        {/* <Button size="$2" onPress={() => navigate('/register')}>
                            Register
                        </Button> */}
                    </XStack>
                )}
            </XStack>
        </YStack >
    );
}
