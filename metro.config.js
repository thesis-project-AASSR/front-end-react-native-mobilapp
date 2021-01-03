// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// // module.exports = {
// // //   resolver: {
// // //     assetExts: [...defaultConfig.resolver.assetExts, 'db'],
// // //   },
// // resolver: {
// //     blacklistRE: blacklist([
// //       /nodejs-assets\/.*/,
// //       /\/android\/.*/,
// //       /\/ios\/.*/,
// //     ]),
// //   },
// // };

// module.exports = {

//     resolver: {
//      sourceExts: ['jsx','js','ts','tsx'], //add here
//     //  assetExts: [...defaultConfig.resolver.assetExts, 'db'], 
//     },
//   };

/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      sourceExts: ['jsx', 'js', 'ts'],
    },
  };