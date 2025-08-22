import React from "react";
import { Sheet, Button, YStack, Text, XStack, Avatar } from "tamagui";
import { Menu, LogOut } from "@tamagui/lucide-icons";
import { useAuthStore, useNotificationStore } from "@checkmate/store";
import { useNavigate } from "react-router-dom";

export function MenuButton() {
  const [open, setOpen] = React.useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const unreadCount = useNotificationStore(
    (s) => s.notifications.filter((n) => !n.read).length
  );

  // Resolve avatar: string or { value }
  const rawAvatar = (user as any)?.avatar;
  const avatarUrl =
    typeof rawAvatar === "string"
      ? rawAvatar
      : rawAvatar && typeof rawAvatar === "object"
      ? rawAvatar.value
      : undefined;
  const displayName =
    (user as any)?.first_name || (user as any)?.username || "Player";
  const initials = String(displayName).slice(0, 1).toUpperCase();

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Button
        icon={Menu}
        aria-label="Open menu"
        onPress={() => setOpen(true)}
        variant="outlined"
      />
      <Sheet
        open={open}
        onOpenChange={setOpen}
        snapPoints={[90]} // tall, comfy
        modal
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame p="$4" gap="$3">
          {/* Header (only when logged in) */}
          {user && (
            <XStack ai="center" gap="$3" mb="$1">
              <Avatar circular size="$4">
                {avatarUrl ? (
                  <Avatar.Image src={avatarUrl} alt={`${displayName} avatar`} />
                ) : (
                  <Avatar.Fallback>{initials}</Avatar.Fallback>
                )}
              </Avatar>
              <YStack f={1} minWidth={0}>
                <Text numberOfLines={1} fontWeight="700">
                  {displayName}
                </Text>
                {user?.username && (
                  <Text numberOfLines={1} color="$gray10" fontSize="$2">
                    @{user.username}
                  </Text>
                )}
              </YStack>
            </XStack>
          )}

          {/* Links */}
          <YStack gap="$2" mt="$1">
            <MenuItem onPress={() => go("/games")}>Discover</MenuItem>

            {user ? (
              <>
                <MenuItem onPress={() => go("/friends")}>Friends</MenuItem>
                <MenuItem onPress={() => go("/profile/me")}>Profile</MenuItem>
                <MenuItem onPress={() => go("/settings")}>Settings</MenuItem>

                <MenuItem onPress={() => go("/notifications")}>
                  <XStack jc="space-between" ai="center" w="100%">
                    <Text>Notifications</Text>
                    {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
                  </XStack>
                </MenuItem>

                <SeparatorLine />
                <MenuItem tone="danger" icon={LogOut} onPress={handleLogout}>
                  Logout
                </MenuItem>
              </>
            ) : (
              window.location.pathname !== "/login" && (
                <MenuItem onPress={() => go("/login")}>Login</MenuItem>
              )
            )}
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

function MenuItem({
  children,
  onPress,
  tone,
  icon: Icon,
}: {
  children: React.ReactNode;
  onPress: () => void;
  tone?: "danger";
  icon?: any;
}) {
  return (
    <Button
      w="100%"
      size="$4"
      variant="outlined"
      theme={tone === "danger" ? "red" : undefined}
      justifyContent="flex-start"
      onPress={onPress}
      icon={Icon ? <Icon size={16} /> : undefined}
    >
      {children}
    </Button>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <XStack
      bc="$blue10"
      br={9}
      px="$2"
      h={18}
      ai="center"
      jc="center"
      minWidth={18}
    >
      <Text color="white" fontSize={10} fontWeight="700">
        {children}
      </Text>
    </XStack>
  );
}

function SeparatorLine() {
  return <YStack my="$2" h={1} w="100%" bc="$color6" opacity={0.5} />;
}
