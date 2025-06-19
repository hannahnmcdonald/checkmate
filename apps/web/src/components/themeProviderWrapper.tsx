import { Theme } from 'tamagui'
import { useState, createContext, useContext } from 'react'

const ThemeContext = createContext({ toggleTheme: () => { }, theme: 'light' })

export const useThemeToggle = () => useContext(ThemeContext)

interface ThemeProviderWrapperProps {
    children: React.ReactNode;
}

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
