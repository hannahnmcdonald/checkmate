import React from 'react';
import { FriendGrid } from '../../../Friends/components';

export interface Friend {
    id: string;
    username: string;
    avatarUrl?: string;
    joinedDate?: string;
    mutualFriendsCount?: number;
}

type ProfileFriendsProps = {
    users: Friend[];
    actionButton?: (user: Friend) => React.ReactNode;
    emptyText?: string;
    title: string
};

export default function ProfileFriends({ users, title }: ProfileFriendsProps) {
    return (
        <FriendGrid
            users={users}
            title={title}
        />
    )
}