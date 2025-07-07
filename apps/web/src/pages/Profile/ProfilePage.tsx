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

    return (
        <YStack p="$4">
            <ProfileHeader name={data.user?.first_name} />
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
