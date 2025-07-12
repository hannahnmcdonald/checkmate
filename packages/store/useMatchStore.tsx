import { create } from 'zustand';

interface MatchInvite {
    id: string;
    gameName: string;
    inviter: string;
}

interface MatchDetails {
    match: any;
    participants: any[];
}

interface MatchStore {
    pendingMatches: MatchInvite[];
    matches: Record<string, MatchDetails>;
    setPendingMatches: (matches: MatchInvite[]) => void;
    addPendingMatch: (invite: MatchInvite) => void;
    removePendingMatch: (id: string) => void;
    clearPendingMatches: () => void;

    setMatchDetails: (id: string, data: MatchDetails) => void;
    clearMatchDetails: () => void;
    updateMatchStatus: (id: string, status: string) => void;
    addMatchSession: (session: { id: string; game_id: string; invited_user_ids: string[] }) => void;
    sessions: { id: string; game_id: string; invited_user_ids: string[] }[];
}

export const useMatchStore = create<MatchStore>((set) => ({
    pendingMatches: [],
    matches: {},
    setPendingMatches: (matches) => set({ pendingMatches: matches }),
    addPendingMatch: (invite) =>
        set((state) => ({
            pendingMatches: [...state.pendingMatches, invite],
        })),
    removePendingMatch: (id) =>
        set((state) => ({
            pendingMatches: state.pendingMatches.filter((m) => m.id !== id),
        })),
    clearPendingMatches: () => set({ pendingMatches: [] }),

    setMatchDetails: (id, data) =>
        set((state) => ({
            matches: { ...state.matches, [id]: data },
        })),
    clearMatchDetails: () => set({ matches: {} }),
    updateMatchStatus: (id: string, status: string) =>
        set((state) => {
            const match = state.matches[id];
            if (!match) return state;
            return {
                matches: {
                    ...state.matches,
                    [id]: {
                        ...match,
                        match: {
                            ...match.match,
                            status,
                        },
                    },
                },
            };
        }),
    addMatchSession: (session: { id: string; game_id: string; invited_user_ids: string[] }) =>
        set((state) => ({
            sessions: [...state.sessions, session],
        })),
    sessions: [],
}));