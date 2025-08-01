import * as React from "react";
import {
  Snackbar as PaperSnackbar,
  SnackbarProps,
  useTheme,
} from "react-native-paper";

const Snackbar = (props: SnackbarProps) => {
  const { key, ...restOfProps } = props;
  const theme = useTheme();
  return <PaperSnackbar {...restOfProps} key={key} theme={theme} />;
};

export default Snackbar;
