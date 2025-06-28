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
            bg="white"
            opacity={0.95}
            borderRadius="$4"
            borderWidth={1}
            borderColor="$borderColor"
            shadowColor="black"
            shadowOpacity={0.1}
            shadowRadius={10}
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
                            theme="red"
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
