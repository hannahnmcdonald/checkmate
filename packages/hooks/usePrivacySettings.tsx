import * as React from "react";
import { usePrivacyStore } from "@checkmate/store";

export default function usePrivacySettings() {
  const values = usePrivacyStore((s) => s.values);
  const saving = usePrivacyStore((s) => s.saving);
  const error = usePrivacyStore((s) => s.error);
  const load = usePrivacyStore((s) => s.load);
  const update = usePrivacyStore((s) => s.update);

  // Load once on mount (caller can also call load manually if desired)
  React.useEffect(() => {
    // avoid double-loading if already populated beyond defaults
    load();
  }, [load]);

  return { values, saving, error, load, update };
}
