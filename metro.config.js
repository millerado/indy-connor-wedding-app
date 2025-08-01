// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);
// config.resolver.sourceExts.push('cjs');
config.resolver.sourceExts = config.resolver.sourceExts || [];
config.resolver.unstable_enablePackageExports = false;
if (!config.resolver.sourceExts.includes("cjs")) {
  config.resolver.sourceExts.push("cjs");
}
config.resolver.unstable_enablePackageExports = false;

module.exports = wrapWithReanimatedMetroConfig(config);