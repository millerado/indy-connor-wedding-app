import { StyleSheet, Dimensions } from "react-native";
import { typography, reusableStyles } from "../../styles";

const dim = Dimensions.get('screen');
const { width, height } = dim;

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    moreCommentsWrapper: {
      paddingLeft: 10,
    },
    comments: {
      paddingTop: 5,
      flexDirection: "row",
    },
    wrapper: {
      paddingTop: 5,
      paddingBottom: 5,
      flexDirection: "row",
      width: '100%',
      alignItems: "center",
      backgroundColor: theme.colors.backgroundColor,
      color:theme.colors.white,
    },
    avatarWrapper: {
      width: typography.fontSizeM * 2 + 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textWrapper: {
      width: width - (typography.fontSizeM * 2 + 20) - 10,
      paddingRight: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return ss;
}

export default styles;
