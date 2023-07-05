import React, { useState, useEffect, useRef, useCallback, createContext } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { 
  onCreatePosts, onUpdatePosts, onDeletePosts,
  onCreateUsers, onUpdateUsers, onDeleteUsers,
  onCreateAdminFavorites, onUpdateAdminFavorites, onDeleteAdminFavorites,
  onCreateComments, onUpdateComments, onDeleteComments,
  onCreateReactions, onUpdateReactions, onDeleteReactions,
  onCreateFAQ, onUpdateFAQ, onDeleteFAQ,
  onCreateSchedule, onUpdateSchedule, onDeleteSchedule,
} from "./graphql/subscriptions";
import { lightTheme, darkTheme } from "./styles";
import {
  ThemeContext,
  SnackbarContext,
  DefaultSnackbar,
  AuthContext,
  UnauthedUser,
  DataContext,
} from "./contexts";
import { WelcomeScreen } from './screens';
import { Users } from "./models";
import { registerForPushNotificationsAsync } from "./utils";
import { loadUsers, loadPosts, loadAdminFavorites, loadComments, loadReactions, loadFaqs, loadSchedule } from "./services";
import AuthedApp from "./AuthedApp";

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
  const [notificationDetails, setNotificationDetails] = useState({ totalNotifications: 0, unreadNotifications: 0, allNotifications: [] });
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allAdminFavorites, setAllAdminFavorites] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const [allFaqs, setAllFaqs] = useState([]);
  const [allSchedule, setAllSchedule] = useState([]);
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
    // console.log('-- Set User --', newUser);
    // if(id && id !== authStatus.userId) {
    //   // console.log('-- User Change, Reset Datastore Stuff --');
    //   // await DataStore.clear();
    //   await DataStore.stop();
    //   await DataStore.configure({
    //     syncExpressions: [
    //       syncExpression(NotificationsModel, () => {
    //         return n => n.userId.eq(id);
    //       }),
    //       syncExpression(ScheduledNotifications, () => {
    //         return n => n.userId.eq(id);
    //       }),
    //     ]
    //   });
    //   DataStore.start();
    // }

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

  const onRefresh = async () => {
    loadPosts(setAllPosts, allPosts);
    loadUsers(setAllUsers, allUsers);
    loadAdminFavorites(setAllAdminFavorites, allAdminFavorites);
    loadComments(setAllComments, undefined, allComments);
    loadReactions(setAllReactions, undefined, allReactions);
    loadFaqs(setAllFaqs, allFaqs);
    loadSchedule(setAllSchedule, allSchedule);
  }

  // Fetch user and prepare the app
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
        const userId = JSON.parse(currentUser).userId;
        if (currentUser) {
          setAuthStatus(JSON.parse(currentUser));
          registerForPushNotificationsAsync(userId);

          // await DataStore.clear();
          // await DataStore.stop();
          // DataStore.configure({
          //   syncExpressions: [
          //     syncExpression(NotificationsModel, () => {
          //       return n => n.userId.eq(userId);
          //     }),
          //     syncExpression(ScheduledNotifications, () => {
          //       return n => n.userId.eq(userId);
          //     }),
          //   ]
          // });
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
        } else if (targetType === 'guestbook') {
          nav.current.navigate('Create Post', {});
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

  // Manage data subscriptions throughout app
  useEffect(() => {
    const postCreateSub = API.graphql(
      graphqlOperation(onCreatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(setAllPosts, allPosts),
    });
    
    const postUpdateSub = API.graphql(
      graphqlOperation(onUpdatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(setAllPosts, allPosts)
    });
    
    const postDeleteSub = API.graphql(
      graphqlOperation(onDeletePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(setAllPosts, allPosts)
    });

    const userCreateSub = API.graphql(
      graphqlOperation(onCreateUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(setAllUsers, allUsers),
    });

    const userUpdateSub = API.graphql(
      graphqlOperation(onUpdateUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(setAllUsers, allUsers)
    });

    const userDeleteSub = API.graphql(
      graphqlOperation(onDeleteUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(setAllUsers, allUsers)
    });

    const adminFavoriteCreateSub = API.graphql(
      graphqlOperation(onCreateAdminFavorites)
    ).subscribe({
      next: ({ value }) => loadAdminFavorites(setAllAdminFavorites, allAdminFavorites),
    });

    const adminFavoriteUpdateSub = API.graphql(
      graphqlOperation(onUpdateAdminFavorites)
    ).subscribe({
      next: ({ value }) => loadAdminFavorites(setAllAdminFavorites, allAdminFavorites)
    });

    const adminFavoriteDeleteSub = API.graphql(
      graphqlOperation(onDeleteAdminFavorites)
    ).subscribe({
      next: ({ value }) => loadAdminFavorites(setAllAdminFavorites, allAdminFavorites)
    });

    const commentCreateSub = API.graphql(
      graphqlOperation(onCreateComments)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, undefined, allComments),
    });

    const commentUpdateSub = API.graphql(
      graphqlOperation(onUpdateComments)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, undefined, allComments)
    });

    const commentDeleteSub = API.graphql(
      graphqlOperation(onDeleteComments)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, undefined, allComments)
    });

    const reactionsCreateSub = API.graphql(
      graphqlOperation(onCreateReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, undefined, allReactions),
    });

    const reactionsUpdateSub = API.graphql(
      graphqlOperation(onUpdateReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, undefined, allReactions)
    });

    const reactionsDeleteSub = API.graphql(
      graphqlOperation(onDeleteReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, undefined, allReactions)
    });

    const faqsCreateSub = API.graphql(
      graphqlOperation(onCreateFAQ)
    ).subscribe({
      next: ({ value }) => loadFaqs(setAllFaqs, allFaqs),
    });

    const faqsUpdateSub = API.graphql(
      graphqlOperation(onUpdateFAQ)
    ).subscribe({
      next: ({ value }) => loadFaqs(setAllFaqs, allFaqs)
    });

    const faqsDeleteSub = API.graphql(
      graphqlOperation(onDeleteFAQ)
    ).subscribe({
      next: ({ value }) => loadFaqs(setAllFaqs, allFaqs)
    });

    const scheduleCreateSub = API.graphql(
      graphqlOperation(onCreateSchedule)
    ).subscribe({
      next: ({ value }) => loadSchedule(setAllSchedule, allSchedule),
    });

    const scheduleUpdateSub = API.graphql(
      graphqlOperation(onUpdateSchedule)
    ).subscribe({
      next: ({ value }) => loadSchedule(setAllSchedule, allSchedule)
    });

    const scheduleDeleteSub = API.graphql(
      graphqlOperation(onDeleteSchedule)
    ).subscribe({
      next: ({ value }) => loadSchedule(setAllSchedule, allSchedule)
    });

    onRefresh();

    return () => {
      postCreateSub.unsubscribe();
      postUpdateSub.unsubscribe();
      postDeleteSub.unsubscribe();
      userCreateSub.unsubscribe();
      userUpdateSub.unsubscribe();
      userDeleteSub.unsubscribe();
      adminFavoriteCreateSub.unsubscribe();
      adminFavoriteUpdateSub.unsubscribe();
      adminFavoriteDeleteSub.unsubscribe();
      commentCreateSub.unsubscribe();
      commentUpdateSub.unsubscribe();
      commentDeleteSub.unsubscribe();
      reactionsCreateSub.unsubscribe();
      reactionsUpdateSub.unsubscribe();
      reactionsDeleteSub.unsubscribe();
      faqsCreateSub.unsubscribe();
      faqsUpdateSub.unsubscribe();
      faqsDeleteSub.unsubscribe();
      scheduleCreateSub.unsubscribe();
      scheduleUpdateSub.unsubscribe();
      scheduleDeleteSub.unsubscribe();
    }
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

  const updateNotifications = (totalNotifications, unreadNotifications, allNotifications) => {
    setNotificationDetails({
      totalNotifications,
      unreadNotifications,
      allNotifications
    });
  }

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: saveTheme }}>
      <AuthContext.Provider value={{ authStatus, setAuthStatus: setUser }}>
        <NavigationContainer ref={nav}>
          <PaperProvider theme={theme}>
            <DataContext.Provider value={{ 
              refreshData: onRefresh, 
              allUsers, 
              allComments, 
              allAdminFavorites,
              allReactions,
              allPosts,
              allFaqs,
              allSchedule,
              setNotifications: updateNotifications, 
              totalNotifications: notificationDetails.totalNotifications, 
              unreadNotifications: notificationDetails.unreadNotifications, 
              allNotifications: notificationDetails.allNotifications
            }}>
              <SnackbarContext.Provider
                value={{ snackbar: snackbarDetails, setSnackbar }}
              >
                <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                  {authStatus.userId ? (
                    <AuthedApp
                      showSnackbar={showSnackbar}
                      onDismissSnackBar={onDismissSnackBar}
                      snackbarDetails={snackbarDetails}
                    />
                  ) : (
                    <WelcomeScreen />
                  )}
                </View>
              </SnackbarContext.Provider>
            </DataContext.Provider>
          </PaperProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
