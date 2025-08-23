import React from "react";
import { YStack, XStack, Card, Text, Select } from "tamagui";
import { usePrivacySettings, useCurrentUserProfile } from "@checkmate/hooks";
import { PrimaryButton } from "../../components/Styled";
import { AvatarUploader } from "./components";

type Vis = "public" | "friends" | "private";

const OPTS: { label: string; value: Vis }[] = [
  { label: "Public", value: "public" },
  { label: "Friends", value: "friends" },
  { label: "Private", value: "private" },
];

function Row({
  label,
  value,
  onChange,
  help,
  disabled,
}: {
  label: string;
  value: Vis;
  onChange: (v: Vis) => void;
  help?: string;
  disabled?: boolean;
}) {
  return (
    <YStack gap="$1">
      <XStack ai="center" jc="space-between" gap="$3">
        <Text>{label}</Text>

        <Select
          value={value}
          onValueChange={(v) => onChange(v as Vis)}
          size="$3"
          disabled={disabled}
        >
          {/* Mobile: use a bottom sheet */}
          <Select.Adapt when="sm">
            <Select.Sheet modal dismissOnSnapToBottom>
              <Select.Sheet.Frame>
                <Select.Sheet.ScrollView>
                  <Select.Adapt.Contents />
                </Select.Sheet.ScrollView>
              </Select.Sheet.Frame>
              <Select.Sheet.Overlay />
            </Select.Sheet>
          </Select.Adapt>

          {/* Desktop trigger */}
          <Select.Trigger w={220} jc="space-between">
            <Select.Value placeholder="Select…" />
            <Select.Icon />
          </Select.Trigger>

          {/* Popover menu */}
          <Select.Content zIndex={100000}>
            <Select.ScrollUpButton />
            <Select.Viewport>
              {OPTS.map((o, i) => (
                <Select.Item key={o.value} index={i} value={o.value}>
                  <Select.ItemText>{o.label}</Select.ItemText>
                  <Select.ItemIndicator ml="auto" />
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select>
      </XStack>

      {help && (
        <Text color="$gray10" fontSize="$2">
          {help}
        </Text>
      )}
    </YStack>
  );
}

export default function SettingsPage() {
  const { values, load, update, saving, error } = usePrivacySettings();
  const { data: profile } = useCurrentUserProfile();

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <YStack p="$4" gap="$4" maw={720} mx="auto">
      <Text fontSize="2rem" fontWeight="800" textAlign="center" mb="$4">
        Settings
      </Text>

      <Card p="$5" bordered background="rgba(255,255,255,0.05)">
        <Text fontSize="1.5rem" fontWeight="700" mb="$4">
          Avatar
        </Text>
        <AvatarUploader
          currentUrl={profile?.user.avatar ?? undefined}
          onSaved={(url) => {
            console.log("new avatar URL", url);
          }}
        />
      </Card>

      <Card p="$5" bordered background="rgba(255,255,255,0.05)">
        <YStack gap="$3">
          <Text fontWeight="700" fontSize="1.5rem">
            Privacy
          </Text>
          <Text color="$gray10" fontSize="0.75rem">
            Choose who can see each part of your profile.{" "}
            <Text fontWeight="700">Username is always public.</Text>
          </Text>

          <Row
            label="Matches & Activity"
            value={values.sessions}
            onChange={(v) => update({ sessions: v })}
            disabled={saving}
          />

          <Row
            label="Games (Collection & Wishlist)"
            value={values.games}
            onChange={(v) => update({ games: v })}
            // help="Controls visibility for both your Collection and Wishlist."
            disabled={saving}
          />

          <Row
            label="Friends"
            value={values.friends}
            onChange={(v) => update({ friends: v })}
            disabled={saving}
          />

          <Row
            label="Stats"
            value={values.stats}
            onChange={(v) => update({ stats: v })}
            disabled={saving}
          />

          <Row
            label="Avatar"
            value={values.avatar}
            onChange={(v) => update({ avatar: v })}
            // help="Controls visibility of your avatar image."
            disabled={saving}
          />

          <Row
            label="First Name"
            value={values.first_name}
            onChange={(v) => update({ first_name: v })}
            disabled={saving}
          />

          <Row
            label="Last Name"
            value={values.last_name}
            onChange={(v) => update({ last_name: v })}
            disabled={saving}
          />

          {error && (
            <Text color="$red10" fontSize="$2">
              {error}
            </Text>
          )}

          <XStack jc="flex-end" mt="$2">
            <PrimaryButton disabled={saving} onPress={() => update({})}>
              {saving ? "Saving…" : "Save"}
            </PrimaryButton>
          </XStack>
        </YStack>
      </Card>
    </YStack>
  );
}
