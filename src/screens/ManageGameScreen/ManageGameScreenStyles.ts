import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    numberButtonWrapper: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 5,
      alignItems: 'center',
      padding: 5,
      width: '100%',
    },
    oneButtonWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return ss;
}

export default styles;