import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    sectionHeader: { // Not used in FAQ Modal
      padding: 10,
      backgroundColor: theme.colors.primaryContainer,
    },
    itemWrapper: {
      flex: 1,
      padding: 10,
      overflow: 'hidden',
    },
    textInputWrapper: {
      marginBottom: 10,
      borderColor: theme.colors.onSecondary,
      marginRight: 1,
    },
  });
  return ss;
}

export default styles;