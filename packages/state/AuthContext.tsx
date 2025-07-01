import React, { createContext, useReducer, useContext, useEffect } from 'react';

type User = {
    id: string;
    email: string;
};

type State = {
    user: User | null;
};

type Action =
    | { type: 'LOGIN'; payload: { user: User } }
    | { type: 'LOGOUT' };

const initialState: State = {
    user: null,
};

function authReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload.user };
        case 'LOGOUT':
            return { user: null };
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

    // On mount, check if the user is already authenticated via cookie
    useEffect(() => {
        fetch('/me', {
            credentials: 'include', // 👈 IMPORTANT
        })
            .then((res) => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
            .then((data) => {
                dispatch({ type: 'LOGIN', payload: { user: data.user } });
            })
            .catch(() => {
                // Not logged in, do nothing
                console.log('Not logged in')
            });
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
