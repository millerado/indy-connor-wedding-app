import React from "react";
import { Snackbar } from "./components";
import Navigation from "./navigation/navigation";
import { CalculateStandings } from "./utils";

const AuthedApp = (props) => {
  const { showSnackbar, onDismissSnackBar, snackbarDetails } = props;

  return (
    <>
      <Navigation />
      <Snackbar
        visible={showSnackbar}
        onDismiss={onDismissSnackBar}
        action={snackbarDetails.action}
        duration={snackbarDetails.duration}
        onIconPress={snackbarDetails.onIconPress}
      >
        {snackbarDetails.message}
      </Snackbar>
      <CalculateStandings />
    </>
  );
};

export default AuthedApp;
