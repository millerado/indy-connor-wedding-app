// const { getDefaultConfig } = require('expo/metro-config');

// const config = getDefaultConfig(__dirname);

// config.resolver.sourceExts.push("ios.js", "android.js");

// module.exports = config;


// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);
// config.resolver.sourceExts.push('cjs');
config.resolver.sourceExts = config.resolver.sourceExts || [];
config.resolver.unstable_enablePackageExports = false;
if (!config.resolver.sourceExts.includes("cjs")) {
  config.resolver.sourceExts.push("cjs");
}
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
