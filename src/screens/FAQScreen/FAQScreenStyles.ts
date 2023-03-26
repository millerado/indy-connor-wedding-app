import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    sectionHeader: {// Not used
      padding: 10,
      backgroundColor: theme.colors.primary,
    },
    itemWrapper: {
      flex: 1,
      padding: 10,
      overflow: 'hidden',
    },
    textInputWrapper: {
      marginBottom: 10,
    },
    searchWrapper: {
      padding: 10,
      paddingBottom: 0,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.onSecondary,
    },
  });
  return ss;
}

export default styles;