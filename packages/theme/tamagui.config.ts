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
            background: '#153226',
            backgroundHover: '#064e3b',
            color: '#6ee7b7',
            color2: '#34d399',
            color3: '#10b981',
        },
        brownDark: {
            background: '#3B1F1A',
            backgroundHover: '#4C2720',
            color: '#E4BFA3',
            color2: '#D39A74',
            color3: '#B76A4A',
        },
        oliveDark: {
            background: '#3A2E12',
            backgroundHover: '#51411A',
            color: '#D9C98A',
            color2: '#BFAE64',
            color3: '#A38E3E',
        },
        tealDark: {
            background: '#0C3B3B',
            backgroundHover: '#0F4D4D',
            color: '#6EE7B7',
            color2: '#34D399',
            color3: '#10B981',
        },
        medBlueDark: {
            background: '#102A4C',
            backgroundHover: '#14366A',
            color: '#93C5FD',
            color2: '#60A5FA',
            color3: '#3B82F6',
        },
        magentaDark: {
            background: '#4A173A',
            backgroundHover: '#631F4E',
            color: '#F0ABFC',
            color2: '#E879F9',
            color3: '#D946EF',
        },
        maroonDark: {
            background: '#4A1A1A',
            backgroundHover: '#641F1F',
            color: '#FCA5A5',
            color2: '#F87171',
            color3: '#EF4444',
        },
    },
    media: {
        sm: { maxWidth: 600 },
        md: { minWidth: 601, maxWidth: 1024 },
        lg: { minWidth: 1025 },
    },


});

export type AppConfig = typeof config
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export { config };
