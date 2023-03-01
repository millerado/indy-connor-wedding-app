import { StyleSheet } from 'react-native';
import { reusableStyles, typography } from '../../styles';

const styles = theme => {
  const rstyles = reusableStyles(theme);
  const ss = StyleSheet.create({
    ...rstyles,
    sectionWrapper: {
      marginTop: 0,
      marginBottom: 0,
    },
    accordionWrapper: {
      backgroundColor: theme.colors.primary,
      paddingTop: 0,
      paddingBottom: 0,
    },
    answerWrapper: {
      paddingTop: 0,
      // backgroundColor: theme.colors.onPrimary,
    },
    questionStyle: {
      color: theme.colors.onPrimary,
      fontSize: typography.fontSizeL,
    },
    answerStyle: {
      color: theme.colors.primary,
      fontSize: typography.fontSizeM,
    },
  });
  return ss;
}

export default styles;