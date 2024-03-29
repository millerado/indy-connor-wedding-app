import React from "react";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import { SettingsModal, NotificationsHeaderButton, NotificationsReadHeaderButton } from '../containers';
import { Icon } from '../components';
import {
  AdminFavoritesScreen,
  CreatePostScreen,
  GamesScreen,
  HomeScreen,
  InfoScreen,
  LoggedInUsersScreen,
  ManageGameScreen,
  MapScreen,
  MostLikedPostsScreen,
  NotificationsScreen,
  ScheduleScreen,
  SendNotificationScreen,
  StandingsScreen,
  TeamDetailsScreen,
  UserScreen,
  ViewPostScreen,
} from "../screens";

const HomeStack = createNativeStackNavigator();
const StandingsStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();
const ScheduleStack = createNativeStackNavigator();

// Single set of screen options for all tabs
const getScreenOptions = () => {
  const theme = useTheme();
  const screenOptions={
    headerStyle: {
      backgroundColor: theme.colors.onPrimary,
      borderBottomWidth: 0,
      shadowOffset: { height: 0, width: 0 },
    },
    headerTintColor: theme.colors.primary,
    headerTitleAlign: "center",
  };
  return screenOptions;
}

const HomeStackScreen = () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator screenOptions={getScreenOptions()} >
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ 
        headerLeft: () => (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <SettingsModal />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <NotificationsHeaderButton />
          </View>
        )}} />
      <HomeStack.Screen name="User" component={UserScreen} options={({ route }) => ({ title: route.params.name || 'User' })} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} options={{ 
        headerRight: () => (
          <NotificationsReadHeaderButton />
        )}} />
      <HomeStack.Screen name="View Post" component={ViewPostScreen} />
      <HomeStack.Screen name="Create Post" component={CreatePostScreen} options={({ route }) => ({ title: route.params.view === 'edit' ? 'Edit Post' : 'Create Post' })} />
      <HomeStack.Screen name="Games List" component={GamesScreen} />
      <HomeStack.Screen name="Manage Game" component={ManageGameScreen} options={({ route }) => ({ title: route.params.view === 'editGame' ? 'Edit Game' : 'Create New Game' })} />
      <HomeStack.Screen name="Most Liked Posts" component={MostLikedPostsScreen} />
      <HomeStack.Screen name="Send Notification" component={SendNotificationScreen} />
      <HomeStack.Screen name="Logged In Users" component={LoggedInUsersScreen} />
      <HomeStack.Screen name="Admin Favorites" component={AdminFavoritesScreen} />
    </HomeStack.Navigator>
  );
};

const StandingsStackScreen = () => {
  const theme = useTheme();
  return (
    <StandingsStack.Navigator screenOptions={getScreenOptions()} >
      <StandingsStack.Screen name="Standings" component={StandingsScreen} />
      <StandingsStack.Screen name="User" component={UserScreen} options={({ route }) => ({ title: route.params.name || 'User' })} />
      <StandingsStack.Screen name="Team Details" component={TeamDetailsScreen} options={({ route }) => ({ title: route.params.teamName || 'Team Details' })} />
    </StandingsStack.Navigator>
  );
};

const InfoStackScreen = () => {
  const theme = useTheme();
  return (
    <InfoStack.Navigator screenOptions={getScreenOptions()} >
      <InfoStack.Screen
        name="Info"
        component={InfoScreen}
      />
      <InfoStack.Screen name="Map" component={MapScreen} />
    </InfoStack.Navigator>
  );
};

const ScheduleStackScreen = () => {
  const theme = useTheme();
  return (
    <ScheduleStack.Navigator screenOptions={getScreenOptions()} >
      <ScheduleStack.Screen name="Schedule" component={ScheduleScreen} />
    </ScheduleStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.onPrimary}
        barStyle={theme.name === "Dark" ? "light-content" : "dark-content"}
      />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "HomeStack") {
              iconName = focused ? "home" : "homeFocused";
            } else if (route.name === "ScheduleStack") {
              iconName = focused ? "calendar" : "calendarFocused";
            } else if (route.name === "StandingsStack") {
              iconName = focused ? "standings" : "standingsFocused";
            } else if (route.name === "InfoStack") {
              iconName = focused ? "info" : "infoFocused";
            }
            return <Icon name={iconName} size={size} color={color}></Icon>;
          },

          tabBarActiveTintColor: theme.colors.onPrimary,
          tabBarActiveBackgroundColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.primary,
          tabBarItemStyle: {
            padding: 5,
          },
          tabBarLabelStyle: {
            fontWeight: "800",
          },
          tabBarStyle: {
            backgroundColor: theme.colors.onPrimary,
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{ headerShown: false, title: "Home" }}
        />
        <Tab.Screen
          name="StandingsStack"
          component={StandingsStackScreen}
          options={{ headerShown: false, title: "Standings" }}
        />
        <Tab.Screen
          name="ScheduleStack"
          component={ScheduleStackScreen}
          options={{ headerShown: false, title: "Schedule" }}
        />
        <Tab.Screen
          name="InfoStack"
          component={InfoStackScreen}
          options={{ headerShown: false, title: "Info" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Navigation;
