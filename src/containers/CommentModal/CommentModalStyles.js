import { StyleSheet } from "react-native";
import { reusableStyles } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    textInputWrapper: {
      marginBottom: 10,
      marginRight: 1,
    },
  });
  return ss;
}

export default styles;
