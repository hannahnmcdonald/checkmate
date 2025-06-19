import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config'

const config = createTamagui({
    ...defaultConfig,
    themeClassNameOnRoot: true, // required for web
    defaultTheme: 'light',
    // Optional: override tokens, themes, fonts, etc.
})

export type AppConfig = typeof config
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export default config
