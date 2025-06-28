import {
    XStack,
    YStack,
    Text,
    Input,
    Button,
    Theme,
} from 'tamagui';
// import { Moon, Sun } from '@tamagui/lucide-icons'
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
                            height: 32,       // or whatever size you want
                            width: 'auto',    // maintain natural aspect ratio
                            display: 'block',
                        }}
                    />
                </XStack>

                <XStack ai="center" gap="$3">
                    {user && (
                        <Input
                            placeholder="Search..."
                            size="$3"
                            width={200}
                            bg="$background"
                        />
                    )}

                    {user ? (
                        <Button
                            size="$2"
                            onPress={() => {
                                fetch('/api/logout', {
                                    method: 'POST',
                                    credentials: 'include',
                                }).then(() => location.reload());
                            }}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Button size="$2" onPress={() => navigate('/login')}>
                            Login
                        </Button>
                    )}
                </XStack>
            </XStack>
        </YStack>
    );
}
