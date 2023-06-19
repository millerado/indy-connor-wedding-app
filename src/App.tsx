import React, { useState, useEffect, useRef, useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import * as Notifications from "expo-notifications";
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
  NotificationContext,
  DefaultNotification,
} from "./contexts";
import { Users, ScheduledNotifications, Notifications as NotificationsModel } from "./models";
import { registerForPushNotificationsAsync, DataStore, configureDataStore, sendUserScheduledPushNotification, setBadgeCount, CalculateStandings } from "./utils";

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const App = () => {
  // Setup and manage custom Contexts
  // Also all app-loading functionality (ex: Notification Registration)
  const [appIsReady, setAppIsReady] = useState(false);
  const [themeName, setThemeName] = useState("Light");
  const [authStatus, setAuthStatus] = useState(UnauthedUser);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState(DefaultSnackbar);
  const [notificationDetails, setNotificationDetails] = useState(DefaultNotification);
  const responseListener = useRef();
  const nav = useRef();

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
    // await configureDataStore(id, false);
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
    
    // if(authStatus.isAuthed) {
    //   console.log('-- Have a user, set the data store config --', authStatus.userId);
    //   configureDataStore(authStatus.userId, true);
    // }

    const scheduledNotificationsSubscription = DataStore.observeQuery(
      ScheduledNotifications,
      (p) => p.userId.eq(authStatus.userId)
    ).subscribe(({ items }) => {
      // console.log('-- Scheduled Notifications --', items);
      items.forEach((item) => {
        const date = new Date(item.displayTime);
        if(date.getTime() > Date.now()) {
          sendUserScheduledPushNotification(
            authStatus.userId,
            item.subject,
            item.messageBody,
            JSON.parse(item.linking),
            new Date(item.displayTime),
            JSON.parse(item.scheduleTrigger),
          );
        }
        DataStore.delete(ScheduledNotifications, item.id);
      });
    });

    const notificationsSubscription = DataStore.observeQuery(NotificationsModel, (n) => n.and(n => [
      n.userId.eq(authStatus.userId),
      // n.displayTime.le(new Date().toISOString()), // Dates seem to get defined when useEffect is created, so filtering on the fly
    ]),
    ).subscribe(({ items }) => {
      const pastOnly = items.filter((n) => n.displayTime <= new Date().toISOString());
      const numberUnread = pastOnly.filter((item) => !item.read).length;
      setNotificationDetails({
        totalNotifications: pastOnly.length,
        unreadNotifications: numberUnread,
      });
      // console.log('-- Number Unread/Total --', numberUnread, pastOnly.length);
      setBadgeCount(numberUnread, authStatus.userId, authStatus.userId);
    });

    return () => {
      // console.log('-- Use Effect Cleanup for --', authStatus.userId);
      scheduledNotificationsSubscription.unsubscribe();
      notificationsSubscription.unsubscribe();
      // console.log('-- STUFF IS PAUSED --');
      // let onReady = DataStore.clear();
      // Promise.resolve(DataStore.clear());
      // console.log('-- DataStore Cleared --');
      // scheduledNotificationsSubscription.unsubscribe();
      // notificationsSubscription.unsubscribe(); 
      // Promise.resolve(configureDataStore(authStatus.userId, true));
    };
  }, [authStatus]);

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
          // await configureDataStore(JSON.parse(currentUser).userId, false);
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

    // The listener for Notification Clicks, aka Notifications deep linking
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const { targetType, id } = response.notification.request.content.data;
      // console.log('-- Notification Target and ID --', targetType, id);
      if(targetType) { // Only worrying about linking if it's pointing somewhere
        if(targetType === 'post' && id) {
          // Push to a View Post
          nav.current.navigate('View Post', {
            postsID: id,
          });
        } else if (targetType === 'user' && id) {
          // Push to a User View
          nav.current.navigate('User', {
            userId: id,
          });
        } else if (targetType === 'alert') {
          nav.current.navigate('Notifications', {});
        }
      }
    });

    return () => {
      // We *only* need this if we're going to track a state (redux or otherwise) of all notifications. Otherwise this isn't needed
      // Notifications.removeNotificationSubscription(notificationListener);
      // This checks for notification clicks with the app open
      Notifications.removeNotificationSubscription(responseListener);
    };
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
        <NotificationContext.Provider value={{ notificationDetails, setNotificationDetails }}>
          <NavigationContainer ref={nav}>
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
                  <CalculateStandings />
                </View>
              </SnackbarContext.Provider>
            </PaperProvider>
          </NavigationContainer>
        </NotificationContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
