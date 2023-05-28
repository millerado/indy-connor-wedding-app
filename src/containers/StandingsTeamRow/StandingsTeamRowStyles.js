import { StyleSheet } from "react-native";
import { reusableStyles, calcDimensions } from "../../styles";

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const dimensions = calcDimensions();
  const ss = StyleSheet.create({
    ...rstyles,
    teamWrapper: {
      width: dimensions.width,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    iconWrapper: {
      width: (dimensions.width * 1/3),
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameWrapper: {
      width: (dimensions.width * 2/3),
      paddingLeft: 10,
      height: (dimensions.width * 1/3) - 10,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
    },
    pointsWrapper: {
      width: '100%',
      paddingRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  });
  return ss;
}

export default styles;
