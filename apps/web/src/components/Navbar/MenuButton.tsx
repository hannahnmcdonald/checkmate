import { Sheet, Button, YStack, Text } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { useAuthStore } from '@checkmate/store';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function MenuButton() {
    const [open, setOpen] = React.useState(false);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout(); // clears Zustand store + hits /logout
        setOpen(false);
        navigate('/login');
    };

    return (
        <>
            <Button icon={Menu} onPress={() => setOpen(true)} />
            <Sheet
                open={open}
                onOpenChange={setOpen}
                snapPoints={[80]}
                modal
                dismissOnSnapToBottom
            >
                <Sheet.Overlay />
                <Sheet.Handle />
                <Sheet.Frame>
                    <YStack gap="$4" padding="$4">
                        <Text onPress={() => { navigate('/games'); setOpen(false); }}>
                            Discover
                        </Text>

                        {!user && window.location.pathname !== '/login' && (
                            <Text onPress={() => { navigate('/login'); setOpen(false); }}>
                                Login
                            </Text>
                        )}

                        {user && (
                            <>
                                <Text onPress={() => { navigate('/profile'); setOpen(false); }}>
                                    Profile
                                </Text>
                                <Text onPress={() => { navigate('/friends'); setOpen(false); }}>
                                    Friends
                                </Text>
                                <Text onPress={handleLogout}>
                                    Logout
                                </Text>
                            </>
                        )}
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    );
}
