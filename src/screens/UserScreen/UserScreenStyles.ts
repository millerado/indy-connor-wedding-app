import { StyleSheet, Dimensions } from 'react-native';
import { reusableStyles } from '../../styles';

const dim = Dimensions.get('screen');
const { width, height } = dim;

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    inputWrapper: {
      flexDirection: 'row',
      width: width,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 10,
      paddingRight: 10,
    }
  });
  return ss;
}

export default styles;