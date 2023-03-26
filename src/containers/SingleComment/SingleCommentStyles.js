import { StyleSheet, Dimensions } from "react-native";
import { reusableStyles, typography } from "../../styles";

const dim = Dimensions.get('screen');
const { width, height } = dim;

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    commentWrapper: {
      paddingTop: 5,
      paddingBottom: 5,
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
      width: width - (typography.fontSizeM * 2 + 20),
      paddingRight: 5,
    },
  });
  return ss;
}

export default styles;
