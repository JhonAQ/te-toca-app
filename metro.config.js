const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración específica para web
config.resolver.platforms = ['web', 'native', 'ios', 'android'];

// Asegurarse de que los assets se resuelvan correctamente en web
config.resolver.assetExts.push('svg');

module.exports = config;
