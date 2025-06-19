import { createContext, useContext, useState, useEffect } from 'react'

type User = {
    id: string
    email: string
    // other user fields
}

type AuthContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        // Optionally load user from cookies/localStorage here
        const saved = localStorage.getItem('user')
        if (saved) setUser(JSON.parse(saved))
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
