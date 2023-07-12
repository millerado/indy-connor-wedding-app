import { StyleSheet, Dimensions } from "react-native";
import { typography, reusableStyles } from "../../styles";

const dim = Dimensions.get('window');
const { width, height } = dim;

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    addCommentWrapper: {
      paddingBottom: 10,
      flexDirection: "row",
      width: '100%',
      alignItems: "center",
    },
    avatarWrapper: {
      width: typography.fontSizeM * 2 + 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textWrapper: {
      width: width - (typography.fontSizeM * 2 + 20) - 10,
      paddingRight: 5,
    },
  });
  return ss;
}

export default styles;
