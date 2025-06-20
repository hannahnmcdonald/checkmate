import { createContext, useContext } from 'react'

const ThemeContext = createContext<{ toggleTheme: () => void; theme: 'light' | 'dark' }>({
    toggleTheme: () => { },
    theme: 'light',
})

export const useThemeToggle = () => useContext(ThemeContext)