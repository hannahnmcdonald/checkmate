import React from "react";
import { XStack, YStack, Text, Avatar, Spinner } from "tamagui";
import { PrimaryButton } from "../../../../components/Styled";
import { useAvatar } from "@checkmate/hooks";

export default function AvatarUploader({
  currentUrl,
  onSaved,
}: {
  currentUrl?: string | null;
  onSaved?: (url: string) => void;
}) {
  const { upload, uploading, error, clearError } = useAvatar();
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const pick = () => inputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearError();
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) return alert("Please choose an image");
    if (f.size > 5 * 1024 * 1024) return alert("Max size 5MB");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onUpload = async () => {
    if (!file) return;
    const url = await upload(file);
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    onSaved?.(url);
  };

  const shown = preview ?? currentUrl ?? undefined;

  return (
    <YStack gap="$3">
      <XStack ai="center" gap="$3">
        <Avatar circular size="$6">
          {shown ? (
            <Avatar.Image src={shown} alt="Avatar" />
          ) : (
            <Avatar.Image src={"../images/default-avatar.png"}></Avatar.Image>
          )}
        </Avatar>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
        />

        <PrimaryButton onPress={pick} disabled={uploading}>
          {preview ? "Choose another" : "Choose image"}
        </PrimaryButton>

        <PrimaryButton
          onPress={onUpload}
          disabled={!file || uploading}
          theme="green"
        >
          {uploading ? <Spinner size="small" /> : "Upload"}
        </PrimaryButton>
      </XStack>

      {error && <Text color="$red10">{error}</Text>}
      <Text color="$gray10" fontSize="0.75rem">
        PNG/JPG/WebP up to 5MB. Square images look best.
      </Text>
    </YStack>
  );
}
