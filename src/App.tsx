import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from "./components";
import Navigation from "./navigation/navigation";
import { lightTheme, darkTheme } from "./styles";
import {
  ThemeContext,
  SnackbarContext,
  DefaultSnackbar,
  AuthContext,
  UnauthedUser,
} from "./contexts";
import { Users } from "./models";

const App = () => {
  // Setup and manage custom Contexts
  // Also all app-loading functionality (ex: Notification Registration)
  const [themeName, setThemeName] = useState("Light");
  const [authStatus, setAuthStatus] = useState(UnauthedUser);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState(DefaultSnackbar);

  // Pieces for the Theme Context
  const theme = themeName === "Dark" ? darkTheme : lightTheme;

  const saveTheme = async (newThemeName) => {
    setThemeName(newThemeName);
    await AsyncStorage.setItem("themeName", newThemeName);
  };

  // Pieces for the Auth Context
  const setUser = async (newUser: Users) => {
    // TO-DO: Tie in Notifications at the user level here (associate userId with their Notification Identifier)
    const { id, name, image, about, admin, teamsID } = newUser;
    setAuthStatus({
      isAuthed: true,
      userId: id,
      name,
      image: image ? JSON.parse(image) : undefined,
      about,
      isAdmin: admin,
      teamId: teamsID,
    });
    await AsyncStorage.setItem(
      "authStatus",
      JSON.stringify({
        isAuthed: true,
        userId: id,
        name,
        image: image ? JSON.parse(image) : undefined,
        about,
        isAdmin: admin,
        teamId: teamsID,
      })
    );
  };

  // Pieces for the Snackbar Context
  const setSnackbar = (props) => {
    const { message, action, duration = 7000, showCloseIcon = false } = props;
    setSnackbarDetails({
      message: message,
      duration: duration,
      action: action,
      onIconPress: showCloseIcon ? onDismissSnackBar : undefined,
    });
    setShowSnackbar(true);
  };

  const onDismissSnackBar = () => {
    setShowSnackbar(false);
    setSnackbarDetails(DefaultSnackbar);
  };

  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        const currentTheme = await AsyncStorage.getItem("themeName");
        if (currentTheme) {
          setThemeName(currentTheme);
        }
      } catch (e) {
        console.log("error fetching current theme", e);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const currentUser = await AsyncStorage.getItem("authStatus");
        if (currentUser) {
          setAuthStatus(JSON.parse(currentUser));
        }
      } catch (e) {
        console.log("error fetching current theme", e);
      }
    };

    fetchCurrentTheme();
    fetchCurrentUser();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: saveTheme }}>
      <AuthContext.Provider value={{ authStatus, setAuthStatus: setUser }}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <SnackbarContext.Provider
              value={{ snackbar: snackbarDetails, setSnackbar }}
            >
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
            </SnackbarContext.Provider>
          </PaperProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
