const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add support for resolving web dependencies
config.resolver.platforms = ["ios", "android", "native", "web"];

// Handle .mjs files
config.resolver.sourceExts.push("mjs");

// Add node modules resolution for web dependencies
config.resolver.alias = {
  ...config.resolver.alias,
  "react-dom": "react-native-web",
};

module.exports = config;
