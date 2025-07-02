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

    useEffect(() => {
        fetch('/api/me', {
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 401) {
                    // No valid session, ignore
                    console.log('No active session');
                    return null;
                }
                if (!res.ok) throw new Error('Unexpected error');
                return res.json();
            })
            .then((data) => {
                if (data) {
                    dispatch({ type: 'LOGIN', payload: { user: data.user } });
                }
            })
            .catch((err) => {
                console.log('Error checking auth:', err);
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
