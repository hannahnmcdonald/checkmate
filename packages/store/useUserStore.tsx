import { create } from 'zustand';
import { Game, UserProfile } from '@checkmate/types';

interface SavedGame {
    game_id: string;
    category: string;
}

interface SavedGameWithDetails {
    category: string;
    game: Game;
}

interface UserStore {
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile) => void;
    clearUserProfile: () => void;

    savedGames: SavedGame[];
    addSavedGame: (game: SavedGame) => void;
    removeSavedGame: (gameId: string) => void;

    savedGamesWithDetails: SavedGameWithDetails[];

    setSavedGames: (games: SavedGame[]) => void;
    setSavedGamesWithDetails: (games: SavedGameWithDetails[]) => void;

    clearSavedGames: () => void;
    clearSavedGamesWithDetails: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    userProfile: null,
    setUserProfile: (profile) => set({ userProfile: profile }),
    clearUserProfile: () => set({ userProfile: null }),

    savedGames: [],
    addSavedGame: (game) =>
        set((state) => ({ savedGames: [...state.savedGames, game] })),
    removeSavedGame: (gameId) =>
        set((state) => ({
            savedGames: state.savedGames.filter((g) => g.game_id !== gameId),
        })),

    savedGamesWithDetails: [],

    setSavedGames: (games) => set({ savedGames: games }),
    setSavedGamesWithDetails: (games) => set({ savedGamesWithDetails: games }),

    clearSavedGames: () => set({ savedGames: [] }),
    clearSavedGamesWithDetails: () => set({ savedGamesWithDetails: [] }),
}));
