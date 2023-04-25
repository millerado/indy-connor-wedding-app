import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    tabWrapper: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomColor: theme.colors.primary,
      borderBottomWidth: 2,
      backgroundColor: theme.colors.background,
    },
    tabItem: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
    },
  });
  return ss;
}

export default styles;