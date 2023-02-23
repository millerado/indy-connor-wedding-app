import React, { useMemo } from "react";
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
  withTheme,
  useTheme,
} from "react-native-paper";
import styles from "./ButtonStyles";

interface ButtonProps extends PaperButtonProps {
   variant?: 'primary' | 'primaryOnDark' | 'secondary' | 'secondaryOnDark';
}

const Button = (props: ButtonProps) => {
  const { mode = "contained", variant = 'primary', ...restOfProps } = props;
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  
  let buttonColor = theme.colors.primary;
  let textColor = theme.colors.onPrimary;
  if(variant === 'primaryOnDark') {
    buttonColor = theme.colors.onPrimary;
    textColor = theme.colors.primary;
  } else if (variant === 'secondary') {
    buttonColor = theme.colors.secondary;
    textColor = theme.colors.onSecondary;
  } else if (variant === 'secondaryOnDark') {
    buttonColor = theme.colors.onSecondary;
    textColor = theme.colors.secondary;
  }

  return <PaperButton mode={mode} buttonColor={buttonColor} textColor={textColor} {...restOfProps} />;
};

export default withTheme(Button);
