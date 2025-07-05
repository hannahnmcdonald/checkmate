import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@checkmate/types";

export type AuthState = {
    user: {
        id: string;
        username: string;
        avatar?: string | null;
    } | null;
    isAuthenticated: boolean;
};

export type AuthContextType = {
    state: AuthState;
    setUser: (user: AuthState["user"]) => void;
    clearUser: () => void;
    logout: () => Promise<void>;
    refetchUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthState["user"]>(null);
    const [loading, setLoading] = useState(true);

    const clearUser = () => setUser(null);

    // ✅ Fetch /me on mount
    useEffect(() => {
        refetchUser();
    }, []);

    const refetchUser = async () => {
        try {
            const res = await fetch("/api/me", { credentials: "include" });
            if (!res.ok) {
                clearUser();
                return;
            }
            const data: UserProfile = await res.json();
            setUser({
                id: data.user.id,
                username: data.user.username,
                avatar: data.user.avatar ?? null,
            });
        } catch (err) {
            console.error("Error fetching /me:", err);
            clearUser();
        } finally {
            setLoading(false);
        }
    };

    // ✅ Logout function (optional API call)
    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Error logging out:", err);
        } finally {
            clearUser();
        }
    };

    const value: AuthContextType = {
        state: {
            user,
            isAuthenticated: !!user,
        },
        setUser,
        clearUser,
        logout,
        refetchUser,
    };

    if (loading) {
        return (
            <div style={{ padding: "2rem" }}>
                <p>Loading...</p>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
