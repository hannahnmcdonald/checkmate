import { Sheet, Button, YStack, Text, XStack } from 'tamagui';
import { Menu } from '@tamagui/lucide-icons';
import { useAuthStore, useNotificationStore } from '@checkmate/store';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export function MenuButton() {
    const [open, setOpen] = React.useState(false);
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const navigate = useNavigate();

    const unreadCount = useNotificationStore(
        (s) => s.notifications.filter((n) => !n.read).length
    );
    const handleLogout = async () => {
        await logout();
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
                                <XStack
                                    jc="space-between"
                                    onPress={() => { navigate('/notifications'); setOpen(false); }}
                                    cursor="pointer"
                                >
                                    <Text>Notifications</Text>
                                    {unreadCount > 0 && (
                                        <Text
                                            color="$color2"
                                            fontWeight="bold"
                                            fontSize="$2"
                                        >
                                            {unreadCount}
                                        </Text>
                                    )}
                                </XStack>       
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
