import { create } from "zustand";
import {
  fetchPrivacy,
  patchPrivacy,
  Privacy,
  PRIVACY_DEFAULTS,
} from "../api/privacy";

type State = {
  values: Privacy;
  saving: boolean;
  error?: string;
};

type Actions = {
  load: () => Promise<void>;
  update: (patch: Partial<Privacy>) => Promise<void>;
  reset: () => void; // optional helper
};

export const usePrivacyStore = create<State & Actions>((set, get) => ({
  values: PRIVACY_DEFAULTS,
  saving: false,
  error: undefined,

  async load() {
    try {
      const values = await fetchPrivacy();
      set({ values, error: undefined });
    } catch (e: any) {
      set({ error: e?.message ?? "Failed to load privacy settings" });
    }
  },

  async update(patch) {
    // optimistic update
    const prev = get().values;
    set({ values: { ...prev, ...patch }, saving: true, error: undefined });

    try {
      const values = await patchPrivacy(patch);
      set({ values, saving: false });
    } catch (e: any) {
      // revert on error
      set({
        values: prev,
        saving: false,
        error: e?.message ?? "Failed to save privacy settings",
      });
    }
  },

  reset() {
    set({ values: PRIVACY_DEFAULTS, error: undefined, saving: false });
  },
}));
