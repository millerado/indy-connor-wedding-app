import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    sectionHeader: {
      padding: 10,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
    },
    itemWrapper: {
      flex: 1,
      padding: 10,
      overflow: 'hidden',
    },
    textInputWrapper: {
      marginBottom: 10,
    },
  });
  return ss;
}

export default styles;