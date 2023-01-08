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
  numberOfLines?: number;
  style?: any;
  color?: string;
}

const Text = (props: TextProps) => {
  const theme = useTheme();
  const {
    size = TextSizes.M,
    bold = false,
    numberOfLines = 0,
    style,
    color = theme.colors.secondary,
    ...restOfProps
  } = props;
  const textSize = sizeToVariant(size);
  return (
    <PaperText
      {...restOfProps}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      style={{
        ...style,
        fontSize: textSize,
        fontWeight: bold ? "700" : "400",
        lineHeight: textSize * 1.3,
        color: color,
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
