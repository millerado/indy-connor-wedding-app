import React from "react";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
import { SettingsModal } from '../containers';
import { Icon } from '../components';
import {
  FAQScreen,
  HomeScreen,
  MapScreen,
  NotificationsScreen,
  ScheduleScreen,
  UserScreen,
} from "../screens";

const HomeStack = createNativeStackNavigator();
const MapStack = createNativeStackNavigator();
const FAQStack = createNativeStackNavigator();
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
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ 
        headerLeft: () => (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <SettingsModal />
          </View>
        )}} />
      <HomeStack.Screen name="User" component={UserScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
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

const FAQStackScreen = () => {
  const theme = useTheme();
  return (
    <FAQStack.Navigator
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
      <FAQStack.Screen
        name="FAQ"
        component={FAQScreen}
      />
    </FAQStack.Navigator>
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
            } else if (route.name === "FAQStack") {
              iconName = focused ? "faq" : "faqFocused";
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
          name="FAQStack"
          component={FAQStackScreen}
          options={{ headerShown: false, title: "FAQ" }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Navigation;
