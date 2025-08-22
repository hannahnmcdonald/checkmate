import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { YStack, Text } from "tamagui";
import { ProfileHeader, ProfileGames, ProfileFriends } from "./components";
import {
  useCurrentUserProfile,
  useUserProfile,
  useGetCurrentFriends,
} from "@checkmate/hooks";
import { useAuthStore } from "@checkmate/store";
import { normalizeArrayField } from "../../utils";

function canSee(
  privacy: "public" | "friends" | "private" | string | undefined,
  isOwner: boolean,
  isFriend: boolean
) {
  if (isOwner) return true;
  if (privacy === "public") return true;
  if (privacy === "friends") return isFriend;
  return false;
}

export default function ProfilePageUnified() {
  // --- params / auth (hooks always at top) ---
  const { user } = useAuthStore();
  const { userId: paramUserId } = useParams();
  const resolvedUserId = paramUserId === "me" ? user?.id : paramUserId;
  const isOwner = !!user?.id && !!resolvedUserId && user.id === resolvedUserId;

  // --- data hooks (ALWAYS call both; pick later) ---
  const me = useCurrentUserProfile(); // { data, loading, error, refetch }
  const other = useUserProfile(resolvedUserId || ""); // { profile, loading, error, refetch }
  const myFriendsResult = useGetCurrentFriends(); // { friends, loading }

  // --- derive unified flags (still BEFORE any return) ---
  const profile = isOwner ? me.data : other.profile;
  const loading =
    !resolvedUserId ||
    (isOwner ? me.loading : other.loading) ||
    // we call this always; only needed to compute isFriend for public view
    myFriendsResult.loading;
  const error =
    (isOwner ? me.error : other.error) ||
    (resolvedUserId ? undefined : "No user ID");

  // compute isFriend **every render** (safe if inputs are undefined)
  const isFriend = useMemo(() => {
    if (isOwner) return false;
    const list = myFriendsResult.friends || [];
    return !!resolvedUserId && list.some((f: any) => f.id === resolvedUserId);
  }, [isOwner, myFriendsResult.friends, resolvedUserId]);

  // normalize lists (guard with optional chaining; safe even when profile undefined)
  const friendsList = normalizeArrayField(profile?.friends);
  const wishlist = normalizeArrayField(profile?.games?.wishlist);
  const collection = normalizeArrayField(profile?.games?.collection);

  const friendsPrivacy = profile?.friends?.privacy ?? "public";
  const wishlistPrivacy = profile?.games?.wishlist?.privacy ?? "public";
  const collectionPrivacy = profile?.games?.collection?.privacy ?? "public";

  const canSeeFriends = canSee(friendsPrivacy, isOwner, isFriend);
  const canSeeWishlist = canSee(wishlistPrivacy, isOwner, isFriend);
  const canSeeCollection = canSee(collectionPrivacy, isOwner, isFriend);

  const refetch = isOwner ? me.refetch : other.refetch;

  // --- now you can early return; hook order above is stable ---
  if (loading) {
    return (
      <YStack p="$4">
        <Text>Loading profile...</Text>
      </YStack>
    );
  }
  if (error) {
    return (
      <YStack p="$4">
        <Text>Error: {String(error)}</Text>
      </YStack>
    );
  }
  if (!profile) {
    return (
      <YStack p="$4">
        <Text>No profile data available.</Text>
      </YStack>
    );
  }

  return (
    <YStack p="$4" gap="$4">
      <ProfileHeader
        name={profile.user?.first_name ?? profile.user?.username}
      />
      <ProfileGames
        wishlist={wishlist}
        collection={collection}
        isWishlistVisible={canSeeWishlist}
        isCollectionVisible={canSeeCollection}
        isOwner={isOwner}
        refetchProfile={refetch}
      />
      {canSeeFriends ? (
        <ProfileFriends users={friendsList} title="Friends" />
      ) : (
        <Text>{`${
          profile.user?.username ?? "This user"
        }'s friends list is not visible.`}</Text>
      )}
    </YStack>
  );
}
