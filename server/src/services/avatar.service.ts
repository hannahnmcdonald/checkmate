import { db } from "../db/knex";

type SaveAvatarArgs = {
  userId: string;
  publicUrl: string;
  filename?: string;
};

export async function saveUserAvatar(
  args: SaveAvatarArgs
): Promise<{ publicUrl: string }> {
  const { userId, publicUrl } = args;

  if (!userId) throw new Error("Missing userId");
  if (!publicUrl) throw new Error("Missing publicUrl");

  await db("users").where({ id: userId }).update({
    avatar: publicUrl,
    updated_at: new Date(),
  });

  return { publicUrl };
}
