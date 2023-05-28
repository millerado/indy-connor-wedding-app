import React, { useMemo } from "react";
import { Pressable } from "react-native";
import {
  Button as PaperButton,
  ButtonProps as PaperButtonProps,
  useTheme,
} from "react-native-paper";
import Text from "../Text/Text";
import styles from "./ButtonStyles";

interface ButtonProps extends PaperButtonProps {
  variant?:
    | "primary"
    | "primaryOnDark"
    | "secondary"
    | "secondaryOnDark"
    | "onModalHeader";
  short?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    mode = "contained",
    variant = "primary",
    short = false,
    ...restOfProps
  } = props;
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  let buttonColor = theme.colors.primary;
  let textColor = theme.colors.onPrimary;
  if (variant === "primaryOnDark") {
    buttonColor = theme.colors.onPrimary;
    textColor = theme.colors.primary;
  } else if (variant === "secondary") {
    buttonColor = theme.colors.secondary;
    textColor = theme.colors.onSecondary;
  } else if (variant === "secondaryOnDark") {
    buttonColor = theme.colors.onSecondary;
    textColor = theme.colors.secondary;
  } else if (variant === "onModalHeader") {
    buttonColor = theme.colors.onModalHeader;
    textColor = theme.colors.modalHeader;
  }

  if (short) {
    return (
      <Pressable
        style={{
          backgroundColor: buttonColor,
          paddingVertical: 3,
          paddingHorizontal: props.compact ? 3 : 20,
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
        {...restOfProps}
      >
        <Text color={textColor}>{props.children}</Text>
      </Pressable>
    );
  }

  return (
    <PaperButton
      mode={mode}
      buttonColor={buttonColor}
      textColor={textColor}
      {...restOfProps}
    >
      <Text color={textColor}>{props.children}</Text>
    </PaperButton>
  );
};

export default Button;
