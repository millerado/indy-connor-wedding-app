import { StyleSheet } from "react-native";
import { reusableStyles } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    userWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
    },
    nameWrapper: {
      paddingLeft: 10
    },
  });
  return ss;
}

export default styles;