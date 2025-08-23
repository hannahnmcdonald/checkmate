import { useAvatarStore } from "@checkmate/store";

export default function useAvatar() {
  const uploading = useAvatarStore((s) => s.uploading);
  const error = useAvatarStore((s) => s.error);
  const lastUrl = useAvatarStore((s) => s.url);
  const upload = useAvatarStore((s) => s.upload);
  const clearError = useAvatarStore((s) => s.clearError);

  // expose a simple API for components
  return { uploading, error, lastUrl, upload, clearError };
}
