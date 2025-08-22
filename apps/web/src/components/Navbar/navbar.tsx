// src/components/navbar/Navbar.tsx
import React from "react";
import {
  XStack,
  YStack,
  Theme,
  useMedia,
  Button,
  Popover,
  Avatar,
  Text,
} from "tamagui";
import { LogOut } from "@tamagui/lucide-icons";
import { useAuthStore } from "@checkmate/store";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../Styled";
import { NotificationButton } from "../index";
import { MenuButton } from "./MenuButton";
import logo from "../../images/navbarlogo.png";

export default function Navbar({ theme }: { theme: string }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const media = useMedia();

  // Treat > sm as desktop (use gtSm; adjust to gtMd if you want a wider cutoff)
  const isDesktop = !!media.gtSm;

  // Resolve avatar (string or { value })
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

  return (
    <Theme name={theme}>
      <YStack
        position="sticky"
        top={18}
        zIndex={100}
        bg="rgba(255,255,255,0.15)"
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
      >
        <XStack width="100%" jc="space-between" ai="center" px="$1" py="$1">
          {/* Logo */}
          <XStack onPress={() => navigate("/")}>
            <img
              src={logo}
              alt="Checkmate Logo"
              style={{ height: 32, width: "auto", display: "block" }}
            />
          </XStack>

          {/* Right cluster */}
          {isDesktop ? (
            // DESKTOP: Discover/Friends + Bell + Avatar dropdown (or Login)
            <XStack gap="$2" ai="center">
              <PrimaryButton size="$2" onPress={() => navigate("/games")}>
                Discover
              </PrimaryButton>

              {user && (
                <PrimaryButton size="$2" onPress={() => navigate("/friends")}>
                  Friends
                </PrimaryButton>
              )}

              {user && <NotificationButton />}

              {user ? (
                <AvatarMenu
                  avatarUrl={avatarUrl}
                  initials={initials}
                  name={displayName}
                  onProfile={() => navigate("/profile/me")}
                  onSettings={() => navigate("/settings")}
                  onLogout={async () => {
                    await logout();
                    window.location.href = "/login";
                  }}
                />
              ) : (
                window.location.pathname !== "/login" && (
                  <PrimaryButton
                    size="$2"
                    color="$background"
                    onPress={() => navigate("/login")}
                  >
                    Login
                  </PrimaryButton>
                )
              )}
            </XStack>
          ) : (
            // MOBILE: Bell + Hamburger; links live inside MenuButton sheet
            <XStack ai="center" gap="$2">
              {user && <NotificationButton />}
              <MenuButton />
            </XStack>
          )}
        </XStack>
      </YStack>
    </Theme>
  );
}

function AvatarMenu({
  avatarUrl,
  initials,
  name,
  onProfile,
  onSettings,
  onLogout,
}: {
  avatarUrl?: string;
  initials: string;
  name: string;
  onProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}) {
  return (
    <Popover size="$3" allowFlip>
      <Popover.Trigger asChild>
        <Button aria-label="Account menu" variant="outlined" px="$2">
          <Avatar circular size="$3" hoverStyle={{ scale: 1.05 }}>
            {avatarUrl ? (
              <Avatar.Image src={avatarUrl} alt={`${name} avatar`} />
            ) : (
              <Avatar.Fallback>{initials}</Avatar.Fallback>
            )}
          </Avatar>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        p="$2"
        w={220}
        boc="$color6"
        bw={1}
        br="$6"
        elevate
        borderColor={"$color2"}
      >
        <MenuItem onPress={onProfile}>Profile</MenuItem>
        <MenuItem onPress={onSettings}>Settings</MenuItem>
        <SeparatorLine />
        <MenuItem tone="danger" icon={LogOut} onPress={onLogout}>
          Logout
        </MenuItem>
      </Popover.Content>
    </Popover>
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
  icon?: React.ComponentType<{ size?: number }>;
}) {
  return (
    <Button
      size="$3"
      w="100%"
      variant="ghost"
      justifyContent="flex-start"
      onPress={onPress}
      theme={tone === "danger" ? "red" : undefined}
      icon={Icon ? <Icon size={16} /> : undefined}
    >
      {children}
    </Button>
  );
}

function SeparatorLine() {
  return <YStack my="$2" h={2} mx="$2" w="100%" bc="$color2" opacity={0.5} />;
}
