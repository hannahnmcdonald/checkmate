import { XStack, YStack, Text, Input, Button, Theme, useTheme, useMedia } from 'tamagui'
// ICONS DO NOT WORK
// import { Moon, Sun, Menu } from '@tamagui/lucide-icons'
import { useAuth } from '../../context/AuthContext';
import { useThemeToggle } from '../themeProviderWrapper';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const { user } = useAuth()
    const { theme, toggleTheme } = useThemeToggle()
    const navigate = useNavigate()
    // const media = useMedia()

    return (
        <XStack
            position="sticky"
            top={0}
            zIndex={100}
            padding="$3"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="$backgroundTransparent"
            borderRadius="$6"
            margin="$3"
            shadowColor="$shadowColor"
            shadowOffset={{ width: 0, height: 2 }}
            shadowRadius={10}
            borderWidth={1}
            borderColor="$borderColor"
            backdropFilter="blur(10px)" // enable if supported
        >
            {/* Logo / App Name */}
            <XStack ai="center" gap="$2" onPress={() => navigate('/')}>
                <Text fontWeight="bold" fontSize="$5">♟ Checkmate</Text>
            </XStack>

            {/* Desktop nav buttons or hamburger toggle */}
            <XStack ai="center" gap="$3">
                {user && (
                    <Input
                        placeholder="Search..."
                        size="$3"
                        width={200}
                        backgroundColor="$background"
                    />
                )}

                {user ? (
                    <Button theme="red" size="$2" onPress={() => {
                        fetch('/api/logout', { method: 'POST', credentials: 'include' })
                            .then(() => location.reload())
                    }}>
                        Logout
                    </Button>
                ) : (
                    <Button size="$2" onPress={() => navigate('/login')}>Login</Button>
                )}

                {/* Theme Toggle Icon */}
                {/* <Button
                    size="$2"
                    circular
                    onPress={toggleTheme}
                    icon={theme === 'light' ? <Moon /> : <Sun />}
                /> */}
            </XStack>
        </XStack>
    )
}
