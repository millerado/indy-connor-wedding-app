import { StyleSheet } from "react-native";
import { reusableStyles } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    imageScrollIndicatorWrapper: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 10,
      flexDirection: 'row',
    }
  });
  return ss;
}

export default styles;
