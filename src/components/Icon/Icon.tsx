import React from "react";
import { Image } from "react-native";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";
const hufflepuff = require('../../assets/images/hufflepuff.png');
const gryffindor = require('../../assets/images/gryffindor.png');
const ravenclaw = require('../../assets/images/ravenclaw.png');
const slytherin = require('../../assets/images/slytherin.png');

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

const Icon = (props: IconProps) => {
  const theme = useTheme();
  const { name, size = 32, color = theme.colors.primary, ...restOfProps } = props;
  const iconName = allIcons.find((icon) => icon.iconName === name);
  if (!iconName) {
    return null;
  }

  if(iconName.type === 'Image') {
    return (
      <Image source={iconName.source} style={{width: size, height: size}} resizeMode="contain" resizeMethod='scale' />
    )
  } else if (iconName.type === 'Ionicons') {
    return (
      <Ionicons name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  } else if (iconName.type === 'FontAwesome5') {
    return (
      <FontAwesome5 name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  } else if (iconName.type === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  }
};

export default Icon;

// As we need more icons, add the conversion from friendly-names to Ionicons names here
// Controlling by user-friendly names so if we switch from Ionicons to Awesome, etc... We just change this file
// https://icons.expo.fyi/
export const allIcons = [
  // Model for Icon object:
  // Type = Image, Ionicons, FontAwesome5, MaterialCommunityIcons
  // Name = name of icon from library
  // IconName = name passed to the component
  // Label = user-friendly name for icon when shown in a drop-down
  { type: "Image", source: hufflepuff, iconName: 'hufflepuff', label: "Hufflepuff" },
  { type: "Image", source: gryffindor, iconName: 'gryffindor', label: "Gryffindor" },
  { type: "Image", source: ravenclaw, iconName: 'ravenclaw', label: "Ravenclaw" },
  { type: "Image", source: slytherin, iconName: 'slytherin', label: "Slytherin" },
  { type: "Ionicons", name: "home", iconName: "home", label: "Home" },
  { type: "Ionicons", name: "home-outline", iconName: "homeFocused", label: "Home Focused" },
  { type: "Ionicons", name: "calendar", iconName: "calendar", label: "Calendar" },
  { type: "Ionicons", name: "calendar-outline", iconName: "calendarFocused", label: "Calendar Focused" },
  { type: "Ionicons", name: "map", iconName: "map", label: "Map" },
  { type: "Ionicons", name: "map-outline", iconName: "mapFocused", label: "Map Focused" },
  { type: "Ionicons", name: "trophy", iconName: "standings", label: "Standings" },
  { type: "Ionicons", name: "trophy-outline", iconName: "standingsFocused", label: "Standings Focused" },
  { type: "Ionicons", name: "notifications", iconName: "notifications", label: "Notifications" },
  { type: "Ionicons", name: "notifications-outline", iconName: "notificationsFocused", label: "Notifications Focused" },
  { type: "Ionicons", name: "help-circle", iconName: "info", label: "Info" },
  { type: "Ionicons", name: "help-circle-outline", iconName: "infoFocused", label: "Info Focused" },
  { type: "Ionicons", name: "person-circle", iconName: "user", label: "User" },
  { type: "Ionicons", name: "add-circle-outline", iconName: "addItem", label: "Add Item" },
  { type: "Ionicons", name: "create-outline", iconName: "edit", label: "Edit" },
  { type: "Ionicons", name: "heart-outline", iconName: "heartOutline", label: "Heart Outline" },
  { type: "Ionicons", name: "heart", iconName: "heart", label: "Heart" },
  { type: "Ionicons", name: "chatbubble-outline", iconName: "comment", label: "Comment" },
  { type: "Ionicons", name: "checkmark-circle-outline", iconName: "check", label: "Check" },
  { type: "Ionicons", name: "image-outline", iconName: "picture", label: "Picture" },
  { type: "Ionicons", name: "camera", iconName: "camera", label: "Camera" },
  { type: "Ionicons", name: "trash-outline", iconName: "trash", label: "Trash" },
  { type: "Ionicons", name: "close-outline", iconName: "close", label: "Close" },
  { type: "Ionicons", name: "checkmark-outline", iconName: "checkmark", label: "Checkmark" },
  { type: "Ionicons", name: "cog-outline", iconName: "cog", label: "Cog" },
  { type: "Ionicons", name: "ellipse", iconName: "circle", label: "Circle" },
  { type: "Ionicons", name: "chevron-down-outline", iconName: "expanded", label: "Expanded" },
  { type: "Ionicons", name: "chevron-forward-outline", iconName: "collapsed", label: "Collapsed" },
  { type: "Ionicons", name: "american-football", iconName: "football", label: "Football" },
  { type: "Ionicons", name: "baseball", iconName: "baseball", label: "Baseball" },
  { type: "Ionicons", name: "basketball", iconName: "basketball", label: "Basketball" },
  { type: "Ionicons", name: "golf", iconName: "golf", label: "Golf" },
  { type: "Ionicons", name: "speedometer", iconName: "speedometer", label: "Speedometer" },
  { type: "Ionicons", name: "barbell", iconName: "barbell", label: "Barbell" },
  { type: "Ionicons", name: "beer", iconName: "beer", label: "Beer" },
  { type: "Ionicons", name: "bicycle", iconName: "bicycle", label: "Bicycle" },
  { type: "Ionicons", name: "game-controller", iconName: "controller", label: "Controller" },
  { type: "Ionicons", name: "football", iconName: "soccer", label: "Soccer" },
  { type: "Ionicons", name: "medal", iconName: "medal", label: "Medal" },
  { type: "Ionicons", name: "pint", iconName: "pint", label: "Pint" },
  { type: "Ionicons", name: "ribbon", iconName: "ribbon", label: "Ribbon" },
  { type: "Ionicons", name: "school", iconName: "school", label: "School" },
  { type: "Ionicons", name: "stopwatch", iconName: "stopwatch", label: "Stopwatch" },
  { type: "Ionicons", name: "tennisball", iconName: "tennisball", label: "Tennisball" },
  { type: "Ionicons", name: "disc", iconName: "disc", label: "Disc" },
  { type: "Ionicons", name: "expand", iconName: "expand", label: "Expand" },
  { type: "MaterialCommunityIcons", name: "dice-multiple", iconName: "game", label: "Game" },
  { type: "MaterialCommunityIcons", name: "cards", iconName: "cards", label: "Cards" },
  { type: "FontAwesome5", name: "dice", iconName: "dice", label: "Dice" },
  { type: "MaterialCommunityIcons", name: "cards-playing-club-multiple-outline", iconName: "cardsClubs", label: "Cards Clubs" },
  { type: "MaterialCommunityIcons", name: "cards-playing-diamond-multiple-outline", iconName: "cardsDiamonds", label: "Cards Diamonds" },
  { type: "MaterialCommunityIcons", name: "cards-playing-heart-multiple-outline", iconName: "cardsHearts", label: "Cards Hearts" },
  { type: "MaterialCommunityIcons", name: "cards-playing-spade-multiple-outline", iconName: "cardsSpades", label: "Cards Spades" },
];
