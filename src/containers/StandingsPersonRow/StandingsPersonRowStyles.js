import { StyleSheet } from "react-native";
import { reusableStyles } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    rowWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical: 3,
    },
    userWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
    },
    nameWrapper: {
      paddingLeft: 10,
      justifyContent: 'center',
    },
  });
  return ss;
}

export default styles;
