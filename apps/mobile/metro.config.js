const {
    makeMetroConfig
} = require('@rnx-kit/metro-config')
const path = require('path')

module.exports = makeMetroConfig({
    projectRoot: __dirname,
    watchFolders: [path.resolve(__dirname, '../../packages')],
    resolver: {
        sourceExts: ['tsx', 'ts', 'js', 'jsx', 'json'],
        extraNodeModules: {
            '@checkmate/apps/ui': path.resolve(__dirname, '../../packages/ui'),
            '@checkmate/apps/hooks': path.resolve(__dirname, '../../packages/hooks'),
        }
    }
})