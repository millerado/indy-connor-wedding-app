import { StyleSheet } from 'react-native';
import { reusableStyles } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    zoomViewWrapper: {
      height: '100%',
      width: '100%',
    },
    zoomContentWrapper: {
      height: '100%',
      width: '100%',
    },
    zoomOuterWrapper: {
      backgroundColor: theme.colors.background,
      zIndex: 99,
    }
  });
  return ss;
}

export default styles;