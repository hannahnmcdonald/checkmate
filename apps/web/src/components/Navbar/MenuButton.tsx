import { Sheet, Button, YStack, Text } from 'tamagui'
import { Menu } from '@tamagui/lucide-icons'
import { useAuth } from '@checkmate/state';
import { useNavigate } from 'react-router-dom';
import React from 'react'

export function MenuButton() {
    const [open, setOpen] = React.useState(false)
    const { state } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Button
                icon={Menu}
                onPress={() => setOpen(true)}
            />
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
                        <Text onPress={() => { navigate('/games'); setOpen(false); }}>Discover</Text>
                        {!state.user && window.location.pathname !== '/login' && (
                            <Text onPress={() => { logout(); setOpen(false); window.location.href = "/login"; }}>Login</Text>
                        )}
                        {state.user &&
                            <>
                                <Text onPress={() => { navigate('/profile'); setOpen(false); }}>Profile</Text>
                                <Text onPress={() => { navigate('/friends'); setOpen(false); }}>Friends</Text>
                                <Text onPress={() => {
                                    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).then(() => location.reload());
                                }}>Logout</Text></>
                        }
                    </YStack>
                </Sheet.Frame>
            </Sheet>
        </>
    )
}
