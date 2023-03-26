import { StyleSheet } from "react-native";
import { reusableStyles } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    commentInputWrapper: {
      flexDirection: "row",
      padding: 10,
    },
    avatarWrapper: {
      paddingRight: 10,
    },
    comment: {
      padding: 10,
    },
  });
  return ss;
}

export default styles;
