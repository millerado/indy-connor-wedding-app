import React from "react";
import { Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
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

  // A few local-images are used in place of Icons
  if(name === 'hufflepuff' || name === 'gryffindor' || name === 'ravenclaw' || name === 'slytherin') {
    return (
      <Image source={name === 'hufflepuff' ? hufflepuff : name === 'gryffindor' ? gryffindor : name === 'ravenclaw' ? ravenclaw : slytherin} style={{width: size, height: size}} resizeMode="contain" resizeMethod='scale' />
    )
  }

  // And the rest that are actually Icons
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
  } else if (name === 'football') {
    return 'american-football';
  } else if (name === 'baseball') {
    return 'baseball';
  } else if (name === 'basketball') {
    return 'basketball';
  } else if (name === 'golf') {
    return 'golf';
  } else if (name === 'speedometer') {
    return 'speedometer';
  } else if (name === 'barbell') {
    return 'barbell';
  } else if (name === 'beer') {
    return 'beer';
  } else if (name === 'bicycle') {
    return 'bicycle';
  } else if (name === 'controller') {
    return 'game-controller';
  } else if (name === 'soccer') {
    return 'football';
  } else if (name === 'medal') {
    return 'medal';
  } else if (name === 'pint') {
    return 'pint';
  } else if (name === 'ribbon') {
    return 'ribbon';
  } else if (name === 'school') {
    return 'school';
  } else if (name === 'stopwatch') {
    return 'stopwatch';
  } else if (name === 'tennisball') {
    return 'tennisball';
  } else if (name === 'disc') {
    return 'disc';
  }

  return 'home';
};