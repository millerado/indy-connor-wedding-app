import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';

// Paper full configurability here:
// https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v2/LightTheme.tsx
// Also See:
// https://callstack.github.io/react-native-paper/theming.html

export const lightTheme = {
  ...PaperDefaultTheme,
  name: 'Light',
  roundness: 4,
  version: 3,
  isV3: true,
  animation: {
    scale: 1.0,
  },
  colors: {
    ...PaperDefaultTheme.colors,
    // Add all our colors here
  },
};

export const darkTheme = {
  ...PaperDarkTheme,
  name: 'Dark',
  roundness: 4,
  version: 3,
  isV3: true,
  animation: {
    scale: 1.0,
  },
  colors: {
    ...PaperDefaultTheme.colors,
    // Add all our colors here
  },
};