const path = require('path')
const {
    getDefaultConfig
} = require('@expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')

const config = getDefaultConfig(projectRoot)

config.watchFolders = [
    path.resolve(workspaceRoot, 'packages/apps/ui'),
    path.resolve(workspaceRoot, 'packages/apps/auth'),
    path.resolve(workspaceRoot, 'packages/apps/theme'),
    path.resolve(workspaceRoot, 'packages/apps/hooks')
]

config.resolver.extraNodeModules = {
    '@checkmate/ui': path.resolve(workspaceRoot, 'packages/apps/ui'),
    '@checkmate/theme': path.resolve(workspaceRoot, 'packages/apps/theme'),
    '@checkmate/hooks': path.resolve(workspaceRoot, 'packages/apps/hooks'),
    '@checkmate/screens': path.resolve(workspaceRoot, 'packages/apps/screens'),
    '@checkmate/state': path.resolve(workspaceRoot, 'packages/apps/state'),
    '@checkmate/api': path.resolve(workspaceRoot, 'packages/apps/api')
}

module.exports = config