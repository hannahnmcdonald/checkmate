import { create } from 'zustand';
import { Game } from '@checkmate/types';

interface GameSaveStatus {
    wishlist: boolean;
    collection: boolean;
}

interface GameStore {
    games: Record<string, Game>;
    setGame: (game: Game) => void;
    clearGames: () => void;

    searchResults: Game[];
    setSearchResults: (results: Game[]) => void;
    clearSearchResults: () => void;

    saveStatus: Record<string, GameSaveStatus>;
    setSaveStatus: (gameId: string, status: GameSaveStatus) => void;
    clearSaveStatus: () => void;

    gameDetails: Record<string, Game>;
    setGameDetails: (gameId: string, gameData: Game) => void;
    clearGameDetails: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
    games: {},
    setGame: (game) =>
        set((state) => ({
            games: { ...state.games, [game.id]: game },
        })),
    clearGames: () => set({ games: {} }),

    searchResults: [],
    setSearchResults: (results) => set({ searchResults: results }),
    clearSearchResults: () => set({ searchResults: [] }),

    saveStatus: {},
    setSaveStatus: (gameId, status) =>
        set((state) => ({
            saveStatus: {
                ...state.saveStatus,
                [gameId]: status,
            },
        })),
    clearSaveStatus: () => set({ saveStatus: {} }),

    gameDetails: {},
    setGameDetails: (gameId, gameData) =>
        set((state) => ({
            gameDetails: {
                ...state.gameDetails,
                [gameId]: gameData,
            },
        })),
    clearGameDetails: () => set({ gameDetails: {} }),
}));
