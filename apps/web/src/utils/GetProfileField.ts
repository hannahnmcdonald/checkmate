export default function getProfileField(
  field: unknown,
  opts: { isOwner: boolean; fallback?: string } = {
    isOwner: false,
    fallback: "Player",
  }
): string {
  const fallback = opts.fallback ?? "Player";

  // plain string
  if (typeof field === "string") return field || fallback;

  // { value, privacy }
  if (field && typeof field === "object") {
    const val = (field as any).value;
    const privacy = String((field as any).privacy ?? "").toLowerCase();

    if (opts.isOwner) {
      return typeof val === "string" && val ? val : fallback;
    }
    if (privacy === "private") return fallback;
    return typeof val === "string" && val ? val : fallback;
  }

  return fallback;
}
