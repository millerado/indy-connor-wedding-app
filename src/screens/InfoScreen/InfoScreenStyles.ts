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
    searchWrapper: {
      padding: 10,
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: theme.colors.secondary,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.secondary ,
    },
  });
  return ss;
}

export default styles;