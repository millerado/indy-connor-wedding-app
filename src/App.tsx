import React, { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
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
import { registerForPushNotificationsAsync } from "./utils";

const customFonts = {
  'Thasadith-Bold': require('./assets/fonts/Thasadith-Bold.ttf'),
  'Thasadith-BoldItalic': require('./assets/fonts/Thasadith-BoldItalic.ttf'),
  'Thasadith-Italic': require('./assets/fonts/Thasadith-Italic.ttf'),
  'Thasadith-Regular': require('./assets/fonts/Thasadith-Regular.ttf'),
  'SourceSansPro-Black': require('./assets/fonts/SourceSansPro-Black.ttf'),
  'SourceSansPro-BlackItalic': require('./assets/fonts/SourceSansPro-BlackItalic.ttf'),
  'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
  'SourceSansPro-BolcItalic': require('./assets/fonts/SourceSansPro-BoldItalic.ttf'),
  'SourceSansPro-ExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
  'SourceSansPro-ExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
  'SourceSansPro-Italic': require('./assets/fonts/SourceSansPro-Italic.ttf'),
  'SourceSansPro-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
  'SourceSansPro-LightItalic': require('./assets/fonts/SourceSansPro-LightItalic.ttf'),
  'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
  'SourceSansPro-SemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
  'SourceSansPro-SemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
};

const App = () => {
  // Setup and manage custom Contexts
  // Also all app-loading functionality (ex: Notification Registration)
  const [appIsReady, setAppIsReady] = useState(false);
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
    // Tie in Notifications at the user level here (associate userId with their Notification Identifier)
    registerForPushNotificationsAsync(id);
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
          registerForPushNotificationsAsync(JSON.parse(currentUser).userId);
          // console.log('currentUser', currentUser);
        }
      } catch (e) {
        console.log("error fetching current theme", e);
      }
    };

    const prepare = async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    fetchCurrentTheme();
    fetchCurrentUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: saveTheme }}>
      <AuthContext.Provider value={{ authStatus, setAuthStatus: setUser }}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <SnackbarContext.Provider
              value={{ snackbar: snackbarDetails, setSnackbar }}
            >
              <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
              </View>
            </SnackbarContext.Provider>
          </PaperProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
