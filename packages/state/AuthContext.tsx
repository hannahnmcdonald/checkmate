import React, { createContext, useReducer, useContext } from 'react';

type User = {
    id: string;
    email: string;
};

type State = {
    user: User | null;
    token: string | null;
};

type Action =
    | { type: 'LOGIN'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' };

const initialState: State = {
    user: null,
    token: null,
};

function authReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload.user, token: action.payload.token };
        case 'LOGOUT':
            return { user: null, token: null };
        default:
            return state;
    }
}

type AuthContextType = {
    state: State;
    dispatch: React.Dispatch<Action>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used inside AuthProvider');
    return context;
}
