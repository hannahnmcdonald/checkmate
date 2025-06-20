import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Allow shared imports from /packages/*
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@checkmate/screens': path.resolve(__dirname, '../../packages/screens'),
            '@checkmate/auth': path.resolve(__dirname, '../../packages/auth'),
            '@checkmate/theme': path.resolve(__dirname, '../../packages/theme'),
            '@checkmate/ui': path.resolve(__dirname, '../../packages/ui'),
            '@checkmate/hooks': path.resolve(__dirname, '../../packages/hooks'),
        }
    },
    server: {
        fs: {
            allow: ['..'], // allow accessing parent folders (packages)
        }
    }
})
