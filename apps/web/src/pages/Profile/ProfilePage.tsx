import React from 'react'
import { YStack, Text } from 'tamagui'
import { ProfileHeader, ProfileGames, ProfileFriends } from './components'
import { useGetCurrentFriends, useSavedGames, useCurrentUserProfile } from "@checkmate/hooks";
import { useAuth } from '@checkmate/state';

export default function ProfilePage() {
    const { state } = useAuth();
    const { friends, loading: friendsLoading } = useGetCurrentFriends();
    const { data, loading, error, refetch } = useCurrentUserProfile();


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
                <Text>Error: {error}</Text>
            </YStack>
        );
    }

    if (!data) {
        return (
            <YStack p="$4">
                <Text>No profile data available.</Text>
            </YStack>
        );
    }

    // ✅ ONLY LOG HERE, when you are sure `data` is not null
    console.log("DATA IN PROFILE PAGE:", data);
    console.log("Wishlist in data:", data.games?.wishlist);
    console.log("Collection in data:", data.games?.collection);
    console.log("Profile page friends:", friends, data.friends);


    return (
        <YStack p="$4">
            <ProfileHeader />
            <ProfileGames
                wishlist={data.games.wishlist ?? []}
                collection={data.games.collection ?? []}
                isLoggedIn={!!state.user}
                refetchProfile={refetch}
            />
            <ProfileFriends
                users={data.friends}
                title="Friends"
            />
        </YStack>
    );

}
