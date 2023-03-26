import { StyleSheet } from "react-native";
import { reusableStyles } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    textInputWrapper: {
      marginBottom: 10,
    },
  });
  return ss;
}

export default styles;