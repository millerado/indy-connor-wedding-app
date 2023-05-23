import { StyleSheet } from 'react-native';
import { reusableStyles, typography } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
  });
  return ss;
}

export default styles;