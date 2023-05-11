import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    dropdown: {
      height: 50,
      borderColor: theme.colors.primary,
      borderWidth: 0.5,
      borderRadius: 3,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: theme.colors.background,
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    itemTextStyle: {
      color: 'red',
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
      color: theme.colors.primary,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme.colors.primary,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    dropdownWrapper: {
      backgroundColor: theme.colors.background,
      padding: 16,
    },
  });
  return ss;
}

export default styles;