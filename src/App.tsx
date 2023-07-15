import React, { useState, useEffect, useRef, useCallback } from "react";
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
  onCreateGames, onUpdateGames, onDeleteGames,
  onCreateTeams, onUpdateTeams, onDeleteTeams,
  onCreateStandingsPeople, onUpdateStandingsPeople, onDeleteStandingsPeople,
  onCreateStandingsTeams, onUpdateStandingsTeams, onDeleteStandingsTeams,
  onCreateExpoTokens, onUpdateExpoTokens, onDeleteExpoTokens,
  onCreateNotifications, onUpdateNotifications, onDeleteNotifications,
  onCreateScheduledNotifications, onUpdateScheduledNotifications, onDeleteScheduledNotifications,
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
import { loadUsers, loadPosts, loadAdminFavorites, loadComments, loadReactions, loadFaqs, loadSchedule, loadGames, loadTeams, loadStandingsPeople, loadStandingsTeams, loadExpoTokens, loadNotifications, loadScheduledNotifications } from "./services";
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
  const [allGames, setAllGames] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [allStandingsPeople, setAllStandingsPeople] = useState([]);
  const [allStandingsTeams, setAllStandingsTeams] = useState([]);
  const [allExpoTokens, setAllExpoTokens] = useState([]);
  const [reactionsWithUsers, setReactionsWithUsers] = useState([]);
  const responseListener = useRef();
  const nav = useRef();
  const priorConnectionState = useRef(undefined);
  const lastRefreshTime = useRef(undefined);

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
    if(id) {
      registerForPushNotificationsAsync(id);
    } else {
      // Logging out, erase Notification data
      setNotificationDetails({ totalNotifications: 0, unreadNotifications: 0, allNotifications: [] });
    }
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

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState.current === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        // console.log('-- Refresh from Connection (all data) --', payload.data.connectionState, priorConnectionState.current);
        if(lastRefreshTime.current && (new Date().getTime() - lastRefreshTime.current.getTime()) < 30000) {
          // console.log('-- And do a refresh --');
          onRefresh();
        } else {
          // console.log('-- But not a refresh --');
        }
      }
      priorConnectionState.current = payload.data.connectionState;
    }
  });

  const onRefresh = async () => {
    lastRefreshTime.current = new Date();
    loadPosts(setAllPosts, allPosts);
    loadUsers(setAllUsers, allUsers);
    loadAdminFavorites(setAllAdminFavorites, allAdminFavorites);
    loadComments(setAllComments, allComments);
    loadReactions(setAllReactions, allReactions);
    loadFaqs(setAllFaqs, allFaqs);
    loadSchedule(setAllSchedule, allSchedule);
    loadGames(setAllGames, allGames);
    loadTeams(setAllTeams, allTeams);
    loadStandingsPeople(setAllStandingsPeople, allStandingsPeople);
    loadStandingsTeams(setAllStandingsTeams, allStandingsTeams);
    loadExpoTokens(setAllExpoTokens, allExpoTokens);
    onRefreshNotifications();
  }

  const onRefreshNotifications = async () => {
    if(authStatus.userId) {
      loadNotifications(setNotificationDetails, notificationDetails, authStatus.userId);
      loadScheduledNotifications(authStatus.userId);
    }
  }

  useEffect(() => {
    if(allUsers.length > 0 && allReactions.length > 0) {
      const newReactionsWithUsers = allReactions.map((reaction) => {
        const user = allUsers.find((user) => user.id === reaction.userId);
        return { ...reaction, user };
      });
      
      const sortedReactions = newReactionsWithUsers.sort((a, b) => a.user.name.localeCompare(b.user.name));

      if(JSON.stringify(sortedReactions) !== JSON.stringify(reactionsWithUsers)) {
        setReactionsWithUsers(sortedReactions);
      }
    }
  }, [allUsers, allReactions])

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
      next: ({ value }) => loadComments(setAllComments, allComments),
    });

    const commentUpdateSub = API.graphql(
      graphqlOperation(onUpdateComments)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, allComments)
    });

    const commentDeleteSub = API.graphql(
      graphqlOperation(onDeleteComments)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, allComments)
    });

    const reactionsCreateSub = API.graphql(
      graphqlOperation(onCreateReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, allReactions),
    });

    const reactionsUpdateSub = API.graphql(
      graphqlOperation(onUpdateReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, allReactions)
    });

    const reactionsDeleteSub = API.graphql(
      graphqlOperation(onDeleteReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, allReactions)
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

    const gamesCreateSub = API.graphql(
      graphqlOperation(onCreateGames)
    ).subscribe({
      next: ({ value }) => loadGames(setAllGames, allGames),
    });

    const gamesUpdateSub = API.graphql(
      graphqlOperation(onUpdateGames)
    ).subscribe({
      next: ({ value }) => loadGames(setAllGames, allGames)
    });

    const gamesDeleteSub = API.graphql(
      graphqlOperation(onDeleteGames)
    ).subscribe({
      next: ({ value }) => loadGames(setAllGames, allGames)
    });

    const teamsCreateSub = API.graphql(
      graphqlOperation(onCreateTeams)
    ).subscribe({
      next: ({ value }) => loadTeams(setAllTeams, allTeams),
    });

    const teamsUpdateSub = API.graphql(
      graphqlOperation(onUpdateTeams)
    ).subscribe({
      next: ({ value }) => loadTeams(setAllTeams, allTeams)
    });

    const teamsDeleteSub = API.graphql(
      graphqlOperation(onDeleteTeams)
    ).subscribe({
      next: ({ value }) => loadTeams(setAllTeams, allTeams)
    });

    const standingsPeopleCreateSub = API.graphql(
      graphqlOperation(onCreateStandingsPeople)
    ).subscribe({
      next: ({ value }) => loadStandingsPeople(setAllStandingsPeople, allStandingsPeople),
    });

    const standingsPeopleUpdateSub = API.graphql(
      graphqlOperation(onUpdateStandingsPeople)
    ).subscribe({
      next: ({ value }) => loadStandingsPeople(setAllStandingsPeople, allStandingsPeople)
    });

    const standingsPeopleDeleteSub = API.graphql(
      graphqlOperation(onDeleteStandingsPeople)
    ).subscribe({
      next: ({ value }) => loadStandingsPeople(setAllStandingsPeople, allStandingsPeople)
    });

    const standingsTeamsCreateSub = API.graphql(
      graphqlOperation(onCreateStandingsTeams)
    ).subscribe({
      next: ({ value }) => loadStandingsTeams(setAllStandingsTeams, allStandingsTeams),
    });

    const standingsTeamsUpdateSub = API.graphql(
      graphqlOperation(onUpdateStandingsTeams)
    ).subscribe({
      next: ({ value }) => loadStandingsTeams(setAllStandingsTeams, allStandingsTeams)
    });

    const standingsTeamsDeleteSub = API.graphql(
      graphqlOperation(onDeleteStandingsTeams)
    ).subscribe({
      next: ({ value }) => loadStandingsTeams(setAllStandingsTeams, allStandingsTeams)
    });

    const expoTokensCreateSub = API.graphql(
      graphqlOperation(onCreateExpoTokens)
    ).subscribe({
      next: ({ value }) => loadExpoTokens(setAllExpoTokens, allExpoTokens),
    });

    const expoTokensUpdateSub = API.graphql(
      graphqlOperation(onUpdateExpoTokens)
    ).subscribe({
      next: ({ value }) => loadExpoTokens(setAllExpoTokens, allExpoTokens)
    });

    const expoTokensDeleteSub = API.graphql(
      graphqlOperation(onDeleteExpoTokens)
    ).subscribe({
      next: ({ value }) => loadExpoTokens(setAllExpoTokens, allExpoTokens)
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
      gamesCreateSub.unsubscribe();
      gamesUpdateSub.unsubscribe();
      gamesDeleteSub.unsubscribe();
      teamsCreateSub.unsubscribe();
      teamsUpdateSub.unsubscribe();
      teamsDeleteSub.unsubscribe();
      standingsPeopleCreateSub.unsubscribe();
      standingsPeopleUpdateSub.unsubscribe();
      standingsPeopleDeleteSub.unsubscribe();
      standingsTeamsCreateSub.unsubscribe();
      standingsTeamsUpdateSub.unsubscribe();
      standingsTeamsDeleteSub.unsubscribe();
      expoTokensCreateSub.unsubscribe();
      expoTokensUpdateSub.unsubscribe();
      expoTokensDeleteSub.unsubscribe();
    }
  }, []);

  // Data Subcriptions for Notifications (which are user-dependent)
  useEffect(() => {
    if(authStatus.userId) {
      const userGraphqlOperations = { filter: { userId: {eq: authStatus.userId} }, limit: 999999999 };
      const createNotificationSub = API.graphql(
        graphqlOperation(onCreateNotifications, userGraphqlOperations)
      ).subscribe({
        next: ({ value }) => loadNotifications(setNotificationDetails, notificationDetails, authStatus.userId),
      });
      
      const updateNotificationSub = API.graphql(
        graphqlOperation(onUpdateNotifications, userGraphqlOperations)
      ).subscribe({
        next: ({ value }) => loadNotifications(setNotificationDetails, notificationDetails, authStatus.userId),
      });
      
      const deleteNotificationSub = API.graphql(
        graphqlOperation(onDeleteNotifications, userGraphqlOperations)
      ).subscribe({
        next: ({ value }) => loadNotifications(setNotificationDetails, notificationDetails, authStatus.userId),
      });

      const createScheduledNotificationSub = API.graphql(
        graphqlOperation(onCreateScheduledNotifications, userGraphqlOperations)
      ).subscribe({
        next: ({ value }) => loadScheduledNotifications(authStatus.userId),
      });

      const updateScheduledNotificationSub = API.graphql(
        graphqlOperation(onUpdateScheduledNotifications, userGraphqlOperations)
      ).subscribe({
        next: ({ value }) => loadScheduledNotifications(authStatus.userId),
      });

      const deleteScheduledNotificationSub = API.graphql(
        graphqlOperation(onDeleteScheduledNotifications, userGraphqlOperations)
      ).subscribe({
        next: ({ value }) => loadScheduledNotifications(authStatus.userId),
      });

      onRefreshNotifications();

      return () => {
        createNotificationSub.unsubscribe();
        updateNotificationSub.unsubscribe();
        deleteNotificationSub.unsubscribe();
        createScheduledNotificationSub.unsubscribe();
        updateScheduledNotificationSub.unsubscribe();
        deleteScheduledNotificationSub.unsubscribe();
      }
    }
  }, [authStatus])

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
        <NavigationContainer ref={nav}>
          <PaperProvider theme={theme}>
            <DataContext.Provider value={{ 
              refreshData: onRefresh, 
              allUsers, 
              allComments, 
              allAdminFavorites,
              allReactions: reactionsWithUsers,
              allPosts,
              allFaqs,
              allSchedule,
              allGames,
              allTeams,
              allStandingsPeople,
              allStandingsTeams,
              allExpoTokens,
              totalNotifications: notificationDetails.totalNotifications, 
              unreadNotifications: notificationDetails.unreadNotifications, 
              allNotifications: notificationDetails.allNotifications,
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
