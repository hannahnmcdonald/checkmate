import { create } from 'zustand';

export interface Friend {
    id: string;
    username: string;
    avatar?: string | null;
}

interface FriendsStore {
    friends: Friend[];
    outgoingRequests: Friend[];

    setFriends: (friends: Friend[]) => void;
    setOutgoingRequests: (requests: Friend[]) => void;

    clearFriends: () => void;
    clearOutgoingRequests: () => void;
    incomingRequests: Friend[];
    setIncomingRequests: (requests: Friend[]) => void;
    clearIncomingRequests: () => void;

    loadingIncoming: boolean;
    setLoadingIncoming: (loading: boolean) => void;

    errorIncoming: string | null;
    setErrorIncoming: (error: string | null) => void;

    acceptLoading: boolean;
    acceptError: string | null;
    setAcceptLoading: (loading: boolean) => void;
    setAcceptError: (error: string | null) => void;

    declineLoading: boolean;
    declineError: string | null;
    setDeclineLoading: (loading: boolean) => void;
    setDeclineError: (error: string | null) => void;

    searchResults: Friend[];
    searchLoading: boolean;
    searchError: string | null;

    setSearchResults: (results: Friend[]) => void;
    setSearchLoading: (loading: boolean) => void;
    setSearchError: (error: string | null) => void;
}


export const useFriendsStore = create<FriendsStore>((set) => ({
    friends: [],
    outgoingRequests: [],

    setFriends: (friends) => set({ friends }),
    setOutgoingRequests: (requests) => set({ outgoingRequests: requests }),

    clearFriends: () => set({ friends: [] }),
    clearOutgoingRequests: () => set({ outgoingRequests: [] }),

    incomingRequests: [],
    setIncomingRequests: (requests) => set({ incomingRequests: requests }),
    clearIncomingRequests: () => set({ incomingRequests: [] }),

    loadingIncoming: false,
    setLoadingIncoming: (loading) => set({ loadingIncoming: loading }),

    errorIncoming: null,
    setErrorIncoming: (error) => set({ errorIncoming: error }),

    acceptLoading: false,
    acceptError: null,
    setAcceptLoading: (loading) => set({ acceptLoading: loading }),
    setAcceptError: (error) => set({ acceptError: error }),

    declineLoading: false,
    declineError: null,
    setDeclineLoading: (loading) => set({ declineLoading: loading }),
    setDeclineError: (error) => set({ declineError: error }),

    searchResults: [],
    searchLoading: false,
    searchError: null,

    setSearchResults: (results) => set({ searchResults: results }),
    setSearchLoading: (loading) => set({ searchLoading: loading }),
    setSearchError: (error) => set({ searchError: error }),
}));
