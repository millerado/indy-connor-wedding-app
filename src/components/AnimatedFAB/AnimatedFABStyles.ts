import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
      zIndex: 1001,
    },
  });
  return ss;
}

export default styles;