import * as React from "react";
import { useTheme } from "react-native-paper";
import {
  Text as PaperText,
  TextProps as PaperTextProps,
  withTheme,
} from "react-native-paper";

export enum TextSizes {
  XXS = "XXS",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
  XXXL = "XXXL",
}
interface TextProps extends PaperTextProps {
  size?: TextSizes;
  bold?: boolean;
  italic?: boolean;
  numberOfLines?: number;
  style?: any;
  color?: string | undefined
}

const Text = (props: TextProps) => {
  const theme = useTheme();
  const {
    size = TextSizes.M,
    bold = false,
    italic = false,
    numberOfLines = 0,
    style,
    color = theme.colors.primary,
    ...restOfProps
  } = props;
  const textSize = sizeToVariant(size);
  // const fontFamily = bold && italic ? 'Thasadith-BoldItalic' : bold ? 'Thasadith-Bold' : italic ? 'Thasadith-Italic' : 'Thasadith-Regular';
  // const fontFamily = bold && italic ? 'SourceSansPro-SemiBoldItalic' : bold ? 'SourceSansPro-SemiBold' : italic ? 'SourceSansPro-LightItalic' : 'SourceSansPro-Light';
  const fontFamily = bold && italic ? 'SourceSansPro-BoldItalic' : bold ? 'SourceSansPro-Bold' : italic ? 'SourceSansPro-Italic' : 'SourceSansPro-Regular';

  return (
    <PaperText
      {...restOfProps}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      style={{
        ...style,
        fontSize: textSize,
        fontWeight: bold ? "700" : "400",
        fontFamily: fontFamily,
        lineHeight: textSize * 1.3,
        color: color,
        fontStyle: italic ? "italic" : "normal",
      }}
    />
  );
};

export default withTheme(Text);

const sizeToVariant = (size: TextSizes): number => {
  switch (size) {
    case TextSizes.XXXL:
      return 48;
    case TextSizes.XXL:
      return 28;
    case TextSizes.XL:
      return 24;
    case TextSizes.L:
      return 20;
    case TextSizes.M:
      return 16;
    case TextSizes.S:
      return 14;
    case TextSizes.XS:
      return 12;
    case TextSizes.XXS:
      return 10;
    default:
      return 16;
  }
};
