import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';

const primaryGreen = '#0A3314';
const greensDark = primaryGreen;
const greensMediumDark = '#325937';
const greensMedium = '#59825D';
const greensMediumLight = '#83AE87';
const greensLight = '#AFDBB2';
const greensSuperLight = '#F8FFF8';
const lightGreenGray = '#A0AfA0';
const darkGreenGray = '#6C7B6D';
const primaryBlue = '#00627C';
const bluesDark = primaryBlue;
const bluesMedium = '#00627C';
const bluesLight = '#97AFBA';
const white = '#ffffff';
const black = '#000000';
const red = '#FF0000';
const error = '#b55464';


// Paper Theming Info:
// https://callstack.github.io/react-native-paper/docs/guides/theming/

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
    black: black,
    white: white,
    red: red,
    background: greensSuperLight,
    modalBackground: greensDark,
    modalHeader: primaryGreen,
    onModalHeader: greensSuperLight,
    primary: primaryGreen,
    onPrimary: greensSuperLight,
    disabled: lightGreenGray,
    onDisabled: primaryGreen,
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
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    // Add all our colors here
    black: black,
    white: white,
    red: red,
    background: black,
    modalBackground: greensDark,
    modalHeader: primaryGreen,
    onModalHeader: greensSuperLight,
    primary: greensSuperLight,
    onPrimary: primaryGreen,
    disabled: darkGreenGray,
    onDisabled: greensSuperLight,
  },
};