import { StyleSheet } from "react-native";
import { reusableStyles, typography } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    userInfoWrapper: {
      padding: 10,
      paddingBottom: 0,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftSide: {
      alignItems: 'center',
      flexDirection: "row",
    },
    avatarWrapper: {
      paddingRight: 10,
      flexWrap: "wrap",
    },
    postsWrapper: {
      // backgroundColor: theme.colors.tertiaryContainer,
      width: "100%",
    },
    captionWrapper: {
      padding: 10,
      paddingTop: 5,
      paddingBottom: 5,
      width: "100%",
    },
    reactionsWrapper: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      paddingLeft: 10,
    },
    likedByWrapper: {
      paddingLeft: 10,
    },
    reactionIcons: {
      flexDirection: "row",
    },
    moreCommentsWrapper: {
      paddingLeft: typography.fontSizeM * 2 + 20,
      paddingBottom: 10,
    },
    unauthedWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    unauthedContent: {
      backgroundColor: theme.colors.primary,
      padding: 20,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: theme.colors.onSecondary,
      alignItems: "center",
      justifyContent: "center",
    },
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
