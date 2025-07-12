import { create } from 'zustand';

export const useThemeStore = create<{
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}>((set) => ({
    theme: 'dark',
    setTheme: (theme) => set({ theme }),
}));
