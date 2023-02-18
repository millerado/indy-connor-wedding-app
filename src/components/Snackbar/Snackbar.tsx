import * as React from "react";
import {
  Snackbar as PaperSnackbar,
  SnackbarProps,
  withTheme,
} from "react-native-paper";

const Snackbar = (props: SnackbarProps) => {
  return <PaperSnackbar {...props} />;
};

export default withTheme(Snackbar);
