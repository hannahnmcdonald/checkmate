import { UserProfile } from "@checkmate/types";

export async function getCurrentUserProfile(): Promise<UserProfile> {
  const res = await fetch(`/api/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cannot retrieve profile: ${text}`);
  }

  const data = await res.json();
  return data;
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const res = await fetch(`/api/profile/${userId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cannot retrieve profile: ${text}`);
  }

  const data = await res.json();
  return data;
}

export async function uploadAvatar(file: File): Promise<{ publicUrl: string }> {
  const form = new FormData();
  form.append("avatar", file);

  const res = await fetch("/api/users/me/avatar", {
    method: "POST",
    credentials: "include",
    body: form,
  });

  // If backend returns HTML on auth failure, surface nice error:
  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed (${res.status}) ${text.slice(0, 120)}`);
  }
  if (!ct.includes("application/json")) {
    const text = await res.text();
    throw new Error(`Expected JSON, got: ${text.slice(0, 120)}`);
  }
  return res.json();
}
