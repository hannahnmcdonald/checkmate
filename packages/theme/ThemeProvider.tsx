import { Theme } from 'tamagui'
import React, { useState, createContext } from 'react'

interface ThemeProviderWrapperProps {
    children: React.ReactNode;
}

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { }
});

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const toggleTheme = () =>
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <Theme name={theme}>{children}</Theme>
        </ThemeContext.Provider>
    )
}
