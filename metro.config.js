const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Three's CommonJS entry calls Node-only process.emitWarning. Use its ESM
// build for all imports (including Fiber's internal require('three')).
const threeModule = require.resolve('three').replace(/three\.cjs$/, 'three.module.js');
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'three') {
    return { type: 'sourceFile', filePath: threeModule };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
