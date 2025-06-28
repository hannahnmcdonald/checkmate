import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config';

const config = createTamagui({
    ...defaultConfig,
    themeClassNameOnRoot: true,
    defaultTheme: 'dark',
    fonts: {
        heading: {
            family: 'Inter',
            size: {
                1: 16,
                2: 18,
                3: 20,
                4: 24,
                5: 30,
                6: 36,
            },
            weight: {
                4: '400',
                5: '500',
                6: '600',
                7: '700',
            },
            letterSpacing: {
                4: 0,
                5: -0.5,
                6: -1,
            },
            lineHeight: {
                4: 22,
                5: 28,
                6: 32,
            },
        },
        body: {
            family: 'Inter',
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
        blueDark: {
            background: '#0a192f',
            backgroundHover: '#112240',
            color: '#ccd6f6',
            color2: '#8892b0',
            color3: '#495670',
        },
        purpleDark: {
            background: '#1b1525',
            backgroundHover: '#2a1e3d',
            color: '#d6c1ff',
            color2: '#a792d8',
            color3: '#6e5c95',
        },
        greenDark: {
            background: '#10291b',
            backgroundHover: '#193c28',
            color: '#c7f0d8',
            color2: '#95cbb0',
            color3: '#608f73',
        },

    },
});

export type AppConfig = typeof config
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export { config };
