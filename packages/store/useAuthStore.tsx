import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile } from '@checkmate/types';
import { useUserStore } from './useUserStore';

type User = {
    id: string;
    username: string;
    avatar?: string | null;
} | null;

interface AuthStore {
    user: User;
    isAuthenticated: boolean;
    loading: boolean;

    setUser: (user: User) => void;
    clearUser: () => void;
    refetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            loading: true,

            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: !!user,
                }),

            clearUser: () =>
                set({
                    user: null,
                    isAuthenticated: false,
                }),

            refetchUser: async () => {
                try {
                    const res = await fetch('/api/me', { credentials: 'include' });
                    if (!res.ok) {
                        get().clearUser();
                        return;
                    }

                    const data: UserProfile = await res.json();
                    set({
                        user: {
                            id: data.user.id,
                            username: data.user.username,
                            avatar: data.user.avatar ?? null,
                        },
                        isAuthenticated: true,
                    });
                } catch (err) {
                    console.error('Error fetching /me:', err);
                    get().clearUser();
                } finally {
                    set({ loading: false });
                }
            },

            logout: async () => {
                try {
                    await fetch('/api/auth/logout', {
                        method: 'POST',
                        credentials: 'include',
                    });
                } catch (err) {
                    console.error('Error logging out:', err);
                } finally {
                    get().clearUser();
                    useUserStore.getState().clearSavedGames();
                    useUserStore.getState().clearSavedGamesWithDetails();

                }
            },
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);
