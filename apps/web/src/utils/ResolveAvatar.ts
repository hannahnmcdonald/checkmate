export default function resolveAvatar(
  user: any,
  isOwner: boolean
): string | undefined {
  const a = user?.avatar;
  if (typeof a === "string") return a.trim() || undefined;
  if (a && typeof a === "object") {
    const val = typeof a.value === "string" ? a.value.trim() : "";
    const privacy = String(a.privacy ?? "").toLowerCase();
    if (isOwner) return val || undefined;
    return privacy !== "private" && val ? val : undefined;
  }
  return undefined;
}
