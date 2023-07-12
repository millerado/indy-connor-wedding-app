import { PixelRatio, Dimensions } from 'react-native';

const dim = Dimensions.get('window');
const { width, height } = dim;
const tablet = Math.max(height, width) > 900 ? true : false;

const scaleFont = (size) => {
  return size * PixelRatio.getFontScale();
};

// FONT WEIGHT
const fontWeightLight = '200';
const fontWeightRegular = '400';
const fontWeightBold = '700';

// FONT SIZE
const fontSizeXXS = scaleFont(tablet ? 12: 10);
const fontSizeXS = scaleFont(tablet ? 14 : 12);
const fontSizeS = scaleFont(tablet ? 16 : 14);
const fontSizeM = scaleFont(tablet ? 18 : 16);
const fontSizeL = scaleFont(tablet ? 22 : 20);
const fontSizeXL = scaleFont(tablet ? 26 : 24);
const fontSizeXXL = scaleFont(tablet ? 36: 28);
const fontSizeXXXL = scaleFont(tablet ? 58: 48);

// Testing scaled up by 2pt
// const fontSizeXXS = scaleFont(tablet ? 12: 12);
// const fontSizeXS = scaleFont(tablet ? 14 : 14);
// const fontSizeS = scaleFont(tablet ? 16 : 16);
// const fontSizeM = scaleFont(tablet ? 18 : 18);
// const fontSizeL = scaleFont(tablet ? 22 : 22);
// const fontSizeXL = scaleFont(tablet ? 26 : 26);
// const fontSizeXXL = scaleFont(tablet ? 36: 30);
// const fontSizeXXXL = scaleFont(tablet ? 58: 50);

export default {
  scaleFont,
  fontWeightLight,
  fontWeightRegular,
  fontWeightBold,
  fontSizeXXS,
  fontSizeXS,
  fontSizeS,
  fontSizeM,
  fontSizeL,
  fontSizeXL,
  fontSizeXXL,
  fontSizeXXXL,
}