import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    headerWrapper: {
      width: '100%',
      padding: 10,
      alignItems: 'center',
      backgroundColor: theme.colors.onPrimary
    }
  });
  return ss;
}

export default styles;