import * as React from "react";
import {
  Button as PaperButton,
  ButtonProps,
  withTheme,
} from "react-native-paper";

const Button = (props: ButtonProps) => {
  const { mode = "contained", ...restOfProps } = props;
  return <PaperButton mode={mode} {...restOfProps} />;
};

export default withTheme(Button);
