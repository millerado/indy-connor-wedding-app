import React from "react";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import { SettingsModal, NotificationsHeaderButton } from '../containers';
import { Icon } from '../components';
import {
  CreatePostScreen,
  HomeScreen,
  InfoScreen,
  MapScreen,
  NotificationsScreen,
  ScheduleScreen,
  UserScreen,
  ViewPostScreen,
} from "../screens";

const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();
const ScheduleStack = createNativeStackNavigator();

// Single set of screen options for all tabs
const getScreenOptions = () => {
  const theme = useTheme();
  const screenOptions={
    headerStyle: {
      backgroundColor: theme.colors.background,
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
      <HomeStack.Screen name="User" component={UserScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
      <HomeStack.Screen name="View Post" component={ViewPostScreen} />
      <HomeStack.Screen name="Create Post" component={CreatePostScreen} />
    </HomeStack.Navigator>
  );
};

const MapStackScreen = () => {
  const theme = useTheme();
  return (
    <MapStack.Navigator screenOptions={getScreenOptions()} >
      <MapStack.Screen name="Map" component={MapScreen} />
    </MapStack.Navigator>
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
        backgroundColor={theme.colors.tertiaryContainer}
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
            } else if (route.name === "MapStack") {
              iconName = focused ? "map" : "mapFocused";
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
          name="MapStack"
          component={MapStackScreen}
          options={{ headerShown: false, title: "Map" }}
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
