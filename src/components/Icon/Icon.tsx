import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from "react-native-paper";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon = (props: IconProps) => {
  const theme = useTheme();
  const { name, size = 32, color = theme.colors.primary, ...restOfProps } = props;
  const iconName = getIconName(name);

  return (
    <Ionicons name={iconName} size={size} color={color} {...restOfProps} />
  );
};

export default Icon;

// As we need more icons, add the conversion from friendly-names to Ionicons names here
// Controlling by user-friendly names so if we switch from Ionicons to Awesome, etc... We just change this file
// https://ionicons.com/
const getIconName = (name) => {
  if (name === "home") {
    return "home";
  } else if (name === "homeFocused") {
    return "home-outline";
  } else if (name === "calendar") {
    return "calendar";
  } else if (name === "calendarFocused") {
    return "calendar-outline";
  } else if (name === "map") {
    return "map";
  } else if (name === "mapFocused") {
    return "map-outline";
  } else if (name === "standings") {
    return "trophy";
  } else if (name === "standingsFocused") {
    return "trophy-outline";
  } else if (name === "notifications") {
    return "notifications";
  } else if (name === "notificationsFocused") {
    return "notifications-outline";
  } else if (name === "info") {
    return "help-circle";
  } else if (name === "infoFocused") {
    return "help-circle-outline";
  } else if (name === "user") {
    return "person-circle";
  } else if (name === "addItem") {
    return "add-circle-outline";
  } else if (name === "edit") {
    return "create-outline";
  } else if (name === "heart-outline") {
    return "heart-outline";
  } else if (name === "heart") {
    return "heart";
  } else if (name === "comment") {
    return "chatbubble-outline";
  } else if (name === "check") {
    return "checkmark-circle-outline";
  } else if (name === "picture") {
    return "image-outline";
  } else if (name === "camera") {
    return "camera-outline";
  } else if (name === "trash") {
    return "trash-outline";
  } else if (name === "close") {
    return "close-outline";
  } else if (name === "checkmark") {
    return "checkmark-outline";
  } else if (name === "cog") {
    return "cog-outline";
  } else if (name === 'image') {
    return 'image-outline';
  } else if (name === 'circle') {
    return 'ellipse';
  } else if (name === 'expanded') {
    return 'chevron-down-outline';
  } else if (name === 'collapsed') {
    return 'chevron-forward-outline';
  } 

  return 'home';
};