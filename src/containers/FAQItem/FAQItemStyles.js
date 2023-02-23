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
      backgroundColor: theme.colors.tertiaryContainer,
      paddingTop: 0,
      paddingBottom: 0,
    },
    answerWrapper: {
      paddingTop: 0,
    },
    questionStyle: {
      color: theme.colors.onSecondary,
      fontSize: typography.fontSizeL,
    },
    answerStyle: {
      color: theme.colors.onSecondary, 
      fontSize: typography.fontSizeM,
    },
  });
  return ss;
}

export default styles;