import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config';

const config = createTamagui({
    ...defaultConfig,
    themeClassNameOnRoot: true,
    defaultTheme: 'dark',
    fonts: {
        heading: {
            family: 'JetBrains Mono',
            size: {
                1: 16,
                2: 18,
                3: 20,
                4: 24,
                5: 28,
                6: 32,
            },
            weight: {
                4: '400',
                5: '500',
                6: '600',
                7: '700',
            },
            letterSpacing: {
                4: 0,
                5: -0.25,
                6: -0.5,
            },
            lineHeight: {
                4: 24,
                5: 28,
                6: 32,
            },
        },
        body: {
            family: 'JetBrains Mono',
            size: {
                1: 14,
                2: 16,
                3: 18,
                4: 20,
            },
            weight: {
                4: '400',
                5: '500',
                6: '600',
            },
            lineHeight: {
                1: 20,
                2: 24,
                3: 28,
                4: 32,
            },
        },
    },
    themes: {
        ...defaultConfig.themes,

        blueDark: {
            background: '#0f172a',
            backgroundHover: '#1e293b',
            color: '#93c5fd',
            color2: '#60a5fa',
            color3: '#3b82f6',
        },
        purpleDark: {
            background: '#1e1b4b',
            backgroundHover: '#312e81',
            color: '#c4b5fd',
            color2: '#a78bfa',
            color3: '#8b5cf6',
        },
        greenDark: {
            background: '#052e16',
            backgroundHover: '#064e3b',
            color: '#6ee7b7',
            color2: '#34d399',
            color3: '#10b981',
        },
        tealDark: {
            background: '#0f766e',
            backgroundHover: '#115e59',
            color: '#5eead4',
            color2: '#2dd4bf',
            color3: '#14b8a6',
        },
        orangeDark: {
            background: '#7c2d12',
            backgroundHover: '#9a3412',
            color: '#fdba74',
            color2: '#fb923c',
            color3: '#f97316',
        },
        redDark: {
            background: '#7f1d1d',
            backgroundHover: '#991b1b',
            color: '#fca5a5',
            color2: '#f87171',
            color3: '#ef4444',
        },
    },


});

export type AppConfig = typeof config
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export { config };
