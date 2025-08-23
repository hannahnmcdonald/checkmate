import { create } from "zustand";
import { uploadAvatar } from "@checkmate/api";

type State = {
  uploading: boolean;
  error?: string;
  url?: string; // last uploaded url (optional)
};

type Actions = {
  upload: (file: File) => Promise<string>; // returns url
  clearError: () => void;
};

export const useAvatarStore = create<State & Actions>((set) => ({
  uploading: false,
  error: undefined,
  url: undefined,

  async upload(file) {
    set({ uploading: true, error: undefined });
    try {
      const { publicUrl } = await uploadAvatar(file);
      set({ uploading: false, url: publicUrl });
      return publicUrl;
    } catch (e: any) {
      set({ uploading: false, error: e?.message ?? "Upload error" });
      throw e;
    }
  },

  clearError() {
    set({ error: undefined });
  },
}));
