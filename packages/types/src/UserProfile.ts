import type { Friend } from './Friend';

export interface UserProfile {
    user: {
        username: string;
        avatar: string | null;
        first_name: string | null;
        last_name: string | null;
    };
    stats: {
        wins: number;
        losses: number;
        ties: number;
    };
    games: {
        wishlist: {
            category: string;
            game: {
                id: string;
                title: string;
                thumbnail: string;
                description: string;
            };
        }[];
        collection: {
            category: string;
            game: {
                id: string;
                title: string;
                thumbnail: string;
                description: string;
            };
        }[];
    };
    recentSessions: any[];
    friends: Friend[];
}