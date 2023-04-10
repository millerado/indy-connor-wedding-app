import { StyleSheet, Dimensions } from 'react-native';
import * as typography from '../typography/typography';

const dim = Dimensions.get('screen');
const { width, height } = dim;

const reusableStyles = theme => {
  const ss = StyleSheet.create({
    pageWrapper: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors.background,
    },
    modalBackground: {
      justifyContent: "center",
      alignItems: "center",
    },
    modalBody: {
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      justifyContent: 'flex-start',
      overflow: 'hidden',
      width: width * .8,
      maxHeight: height * .8,
    },
    modalHeader: {
      backgroundColor: theme.colors.modalHeader,
      borderBottomWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    modalContentWrapper: {
      alignItems: 'center',
      height: '100%'
    },
    modalScrollView: {
      padding: 10,
      width: '100%',
    },
    modalFullScreenBackground: {
      width: width,
      height: height,
    },
    modalFullScreenBody: {
      borderRadius: 0,
      width: width,
      height: height,
      backgroundColor: theme.colors.onPrimary,
      justifyContent: 'flex-start',
      overflow: 'hidden',
    },  
    modalFullScreenHeader: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    textInput: {
      // backgroundColor: theme.colors.onSecondaryContainer,
      alignSelf: 'center',
    },
    modalTextInput: {
      width: width * .8 * .9,
    },
    modalFullScreenTextInput: {
      width: width - 40,
    },
    fullWidthTextInput: {
      width: '100%'
    },
    quarterWidth: {
      width: width * .25
    },
    oneThirdsWidth: {
      width: width * .33
    },
    halfWidth: {
      width: width * .5
    },
    twoThirdsWidth: {
      width: width * .6
    },
    threeQuarterWidth: {
      width: width * .75
    },
    inputSingleLine: {
      height: typography.fontSizeM + (10 * 2),
    },
    inputMultiLine: {
      minHeight: (typography.fontSizeM * 3) + (10 * 2),
    },
    inputLargeMultiLine: {
      minHeight: (typography.fontSizeM * 5) + (10 * 2),
      textAlignVertical: 'top',
    },
    popupMenuOptions: {
      width: width,
      alignItems: "center",
      backgroundColor: theme.colors.onPrimaryContainer,
    },
    popupMenuOption: {
      backgroundColor: theme.colors.onPrimaryContainer,
      width: width,
      paddingBottom: 10,
    },
    fabStyle: {
      bottom: 16,
      right: 16,
      position: 'absolute',
      zIndex: 100,
    },
    zoomWrapper: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    imageWrapper: {
      width: '100%',
      paddingTop: 10,
    },
    modalActivityIndicatorWrapper: {
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    pageActivityIndicatorWrapper: {
      flex: 1,
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
    },
    fakeTextInput: {
      padding: 10,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderRadius: 5,
      alignSelf: 'center',
    },
  });
  return ss;
}

export default reusableStyles;