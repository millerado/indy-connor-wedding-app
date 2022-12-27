import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import { Icon } from '../components';
import {
  HomeScreen,
  MapScreen,
  NotificationsScreen,
  ScheduleScreen,
} from "../screens";

const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const NotificationsStack = createNativeStackNavigator();
const ScheduleStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: theme.colors.tertiaryContainer,
          borderBottomWidth: 0,
          shadowOffset: { height: 0, width: 0 },
        },
        // headerTintColor: theme.colors.primaryContainer,
        headerTitleAlign: "center",
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const MapStackScreen = () => {
  const theme = useTheme();
  return (
    <MapStack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: theme.colors.tertiaryContainer,
          borderBottomWidth: 0,
          shadowOffset: { height: 0, width: 0 },
        },
        // headerTintColor: theme.colors.primaryContainer,
        headerTitleAlign: "center",
      }}
    >
      <MapStack.Screen name="Map" component={MapScreen} />
    </MapStack.Navigator>
  );
};

const NotificationsStackScreen = () => {
  const theme = useTheme();
  return (
    <NotificationsStack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: theme.colors.tertiaryContainer,
          borderBottomWidth: 0,
          shadowOffset: { height: 0, width: 0 },
        },
        // headerTintColor: theme.colors.primaryContainer,
        headerTitleAlign: "center",
      }}
    >
      <NotificationsStack.Screen
        name="Notifications"
        component={NotificationsScreen}
      />
    </NotificationsStack.Navigator>
  );
};

const ScheduleStackScreen = () => {
  const theme = useTheme();
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerStyle: {
          // backgroundColor: theme.colors.tertiaryContainer,
          borderBottomWidth: 0,
          shadowOffset: { height: 0, width: 0 },
        },
        // headerTintColor: theme.colors.primaryContainer,
        headerTitleAlign: "center",
      }}
    >
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
            } else if (route.name === "NotificationsStack") {
              iconName = focused ? "notifications" : "notificationsFocused";
            }
            return <Icon name={iconName} size={size} color={color}></Icon>;
          },

          // tabBarActiveTintColor: theme.colors.onPrimary,
          // tabBarActiveBackgroundColor: theme.colors.onPrimary,
          // tabBarInactiveTintColor: theme.colors.onPrimary,
          tabBarItemStyle: {
            padding: 5,
          },
          tabBarLabelStyle: {
            fontWeight: "800",
          },
          // tabBarStyle: {
          //   backgroundColor: theme.colors.primary,
          // },
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
          name="NotificationsStack"
          component={NotificationsStackScreen}
          options={{ headerShown: false, title: "Notifications" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Navigation;
