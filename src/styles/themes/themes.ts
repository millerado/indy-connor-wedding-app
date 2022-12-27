import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

// Paper full configurability here:
// https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v2/LightTheme.tsx
// Also See:
// https://callstack.github.io/react-native-paper/theming.html

export const lightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  name: 'Light',
  roundness: 4,
  version: 3,
  isV3: true,
  animation: {
    scale: 1.0,
  },
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    // Add all our colors here
  },
};

export const darkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  name: 'Dark',
  roundness: 4,
  version: 3,
  isV3: true,
  animation: {
    scale: 1.0,
  },
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDarkTheme.colors,
    // Add all our colors here
  },
};