export type Vis = "public" | "friends" | "private";
export type Privacy = {
  sessions: Vis;
  games: Vis;
  friends: Vis;
  stats: Vis;
  avatar: Vis;
  first_name: Vis;
  last_name: Vis;
};

export const PRIVACY_DEFAULTS: Privacy = {
  sessions: "friends",
  games: "friends",
  friends: "public",
  stats: "friends",
  avatar: "public",
  first_name: "public",
  last_name: "public",
};

const ALLOW = new Set<Vis>(["public", "friends", "private"]);

function normalize(partial: Partial<Record<keyof Privacy, unknown>>): Privacy {
  const out: any = { ...PRIVACY_DEFAULTS };
  (Object.keys(PRIVACY_DEFAULTS) as (keyof Privacy)[]).forEach((k) => {
    const v = partial[k];
    out[k] = ALLOW.has(v as Vis) ? (v as Vis) : PRIVACY_DEFAULTS[k];
  });
  return out as Privacy;
}

export async function fetchPrivacy(): Promise<Privacy> {
  const res = await fetch("/api/settings/privacy", { credentials: "include" });
  if (!res.ok) throw new Error(`GET /api/settings/privacy ${res.status}`);
  const data = (await res.json()) as Partial<Privacy>;
  return normalize(data);
}

export async function patchPrivacy(patch: Partial<Privacy>): Promise<Privacy> {
  const res = await fetch("/api/settings/privacy", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error(`PATCH /api/settings/privacy ${res.status}`);
  const data = (await res.json()) as Partial<Privacy>;
  return normalize(data);
}
