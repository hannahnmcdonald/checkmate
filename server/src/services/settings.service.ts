// services/settings.ts
import { db } from "../db/knex";

type Vis = "public" | "friends" | "private";
type Patch = Partial<{
  sessions: Vis;
  games: Vis;
  friends: Vis;
  stats: Vis;
  avatar: Vis;
  first_name: Vis;
  last_name: Vis;
}>;

const DEFAULTS = {
  sessions: "friends",
  games: "friends",
  friends: "public",
  stats: "friends",
  avatar: "public",
  first_name: "public",
  last_name: "public",
} as const;

export async function getPrivacy(userId: string) {
  if (!userId) throw new Error("missing userId");

  const row = await db("user_privacy").where({ user_id: userId }).first();

  if (!row) {
    await db("user_privacy").insert({
      user_id: userId,
      ...DEFAULTS,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { ...DEFAULTS };
  }

  // Back-compat: if any new columns are null, mirror avatar or fallback to defaults
  const {
    user_id,
    created_at,
    updated_at,
    sessions,
    games,
    friends,
    stats,
    avatar,
    first_name,
    last_name,
  } = row;

  return {
    sessions: sessions ?? DEFAULTS.sessions,
    games: games ?? DEFAULTS.games,
    friends: friends ?? DEFAULTS.friends,
    stats: stats ?? DEFAULTS.stats,
    avatar: avatar ?? DEFAULTS.avatar,
    first_name: first_name ?? avatar ?? DEFAULTS.avatar,
    last_name: last_name ?? avatar ?? DEFAULTS.avatar,
  };
}

export async function updatePrivacy(userId: string, patch: Patch) {
  if (!userId) throw new Error("missing userId");

  const allow: ReadonlySet<string> = new Set(["public", "friends", "private"]);
  for (const [k, v] of Object.entries(patch)) {
    if (v && !allow.has(v)) {
      throw new Error(`Invalid value for ${k}`);
    }
  }

  const exists = await db("user_privacy").where({ user_id: userId }).first();
  const updateDoc = { ...patch, updated_at: new Date() };

  if (exists) {
    await db("user_privacy").where({ user_id: userId }).update(updateDoc);
  } else {
    await db("user_privacy").insert({
      user_id: userId,
      ...DEFAULTS,
      ...patch,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  return getPrivacy(userId);
}
