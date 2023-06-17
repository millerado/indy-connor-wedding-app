import React from "react";
import { Image } from "react-native";
import { Ionicons, FontAwesome5, FontAwesome, MaterialCommunityIcons, EvilIcons, SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { useTheme } from "react-native-paper";
const hufflepuff = require('../../assets/images/hufflepuff.png');
const gryffindor = require('../../assets/images/gryffindor.png');
const ravenclaw = require('../../assets/images/ravenclaw.png');
const slytherin = require('../../assets/images/slytherin.png');
const fellowshipOfTheRing = require('../../assets/images/fellowshipOfTheRing.png');
const orderOfThePhoenix = require('../../assets/images/orderOfThePhoenix.png');
const reproductiveJusticeLeague = require('../../assets/images/reproductiveJusticeLeague.png');
const diamondDogs = require('../../assets/images/diamondDogs.png');

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
  } else if (iconName.type === 'EvilIcons') {
    return (
      <EvilIcons name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  } else if (iconName.type === 'SimpleLineIcons') {
    return (
      <SimpleLineIcons name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  } else if (iconName.type === 'MaterialIcons') {
    return (
      <MaterialIcons name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  } else if (iconName.type === 'AntDesign') {
    return (
      <AntDesign name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  } else if (iconName.type === 'FontAwesome') {
    return (
      <FontAwesome name={iconName.name} size={size} color={color} {...restOfProps} />
    );
  }
};

export default Icon;

// As we need more icons, add the conversion from friendly-names to Ionicons names here
// Controlling by user-friendly names so if we switch from Ionicons to Awesome, etc... We just change this file
// https://icons.expo.fyi/
export const allIcons = [
  // Model for Icon object:
  // Type = Image, Ionicons, FontAwesome5, MaterialCommunityIcons, or another VectorIcon library
  // Name = name of icon from library
  // IconName = name passed to the component within our app (aka we call it `settings` instead of `cog` vs. `gear`, etc...)
  // Label = user-friendly name for icon when shown in a drop-down
  { type: "Image", source: hufflepuff, iconName: 'hufflepuff', label: "Hufflepuff" },
  { type: "Image", source: gryffindor, iconName: 'gryffindor', label: "Gryffindor" },
  { type: "Image", source: ravenclaw, iconName: 'ravenclaw', label: "Ravenclaw" },
  { type: "Image", source: slytherin, iconName: 'slytherin', label: "Slytherin" },
  { type: "Image", source: fellowshipOfTheRing, iconName: 'fellowshipOfTheRing', label: "Fellowship of the Ring" },
  { type: "Image", source: orderOfThePhoenix, iconName: 'orderOfThePhoenix', label: "Order of the Phoenix" },
  { type: "Image", source: reproductiveJusticeLeague, iconName: 'reproductiveJusticeLeague', label: "Reproductive Justice League" },
  { type: "Image", source: diamondDogs, iconName: 'diamondDogs', label: "Diamond Dogs" },
  { type: "MaterialIcons", name: "home", iconName: "home", label: "Home" },
  { type: "MaterialIcons", name: "home", iconName: "homeFocused", label: "Home Focused" },
  { type: "EvilIcons", name: "calendar", iconName: "calendar", label: "Calendar" },
  { type: "EvilIcons", name: "calendar", iconName: "calendarFocused", label: "Calendar Focused" },
  { type: "Ionicons", name: "map", iconName: "map", label: "Map" },
  { type: "Ionicons", name: "map-outline", iconName: "mapFocused", label: "Map Focused" },
  { type: "EvilIcons", name: "trophy", iconName: "standings", label: "Standings" },
  { type: "EvilIcons", name: "trophy", iconName: "standingsFocused", label: "Standings Focused" },
  { type: "EvilIcons", name: "bell", iconName: "notifications", label: "Notifications" },
  { type: "EvilIcons", name: "question", iconName: "info", label: "Info" },
  { type: "EvilIcons", name: "question", iconName: "infoFocused", label: "Info Focused" },
  { type: "Ionicons", name: "person-circle", iconName: "user", label: "User" },
  { type: "EvilIcons", name: "plus", iconName: "addItem", label: "Add Item" },
  { type: "AntDesign", name: "edit", iconName: "edit", label: "Edit" },
  { type: "Ionicons", name: "heart-outline", iconName: "heartOutline", label: "Heart Outline" },
  { type: "Ionicons", name: "heart", iconName: "heart", label: "Heart" },
  { type: "SimpleLineIcons", name: "bubble", iconName: "comment", label: "Comment" },
  { type: "Ionicons", name: "checkmark-circle-outline", iconName: "check", label: "Check" },
  { type: "Ionicons", name: "image-outline", iconName: "picture", label: "Picture" },
  { type: "EvilIcons", name: "camera", iconName: "camera", label: "Camera" },
  { type: "Ionicons", name: "trash-outline", iconName: "trash", label: "Trash" },
  { type: "Ionicons", name: "close-outline", iconName: "close", label: "Close" },
  { type: "Ionicons", name: "checkmark-outline", iconName: "checkmark", label: "Checkmark" },
  { type: "EvilIcons", name: "gear", iconName: "settings", label: "Settings" },
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
  { type: "SimpleLineIcons", name: "disc", iconName: "disc", label: "Disc" },
  { type: "MaterialCommunityIcons", name: "magnify-expand", iconName: "expand", label: "Expand" },
  { type: "MaterialCommunityIcons", name: "dice-multiple", iconName: "game", label: "Game" },
  { type: "MaterialCommunityIcons", name: "cards", iconName: "cards", label: "Cards" },
  { type: "FontAwesome5", name: "dice", iconName: "dice", label: "Dice" },
  { type: "MaterialCommunityIcons", name: "cards-playing-club-multiple-outline", iconName: "cardsClubs", label: "Cards Clubs" },
  { type: "MaterialCommunityIcons", name: "cards-playing-diamond-multiple-outline", iconName: "cardsDiamonds", label: "Cards Diamonds" },
  { type: "MaterialCommunityIcons", name: "cards-playing-heart-multiple-outline", iconName: "cardsHearts", label: "Cards Hearts" },
  { type: "MaterialCommunityIcons", name: "cards-playing-spade-multiple-outline", iconName: "cardsSpades", label: "Cards Spades" },
  { type: "MaterialCommunityIcons", name: "run", iconName: "run", label: "Run" },
  { type: "MaterialCommunityIcons", name: "run-fast", iconName: "runFast", label: "Run Fast" },
  { type: "FontAwesome", name: "balance-scale", iconName: "balance", label: "Balance" },
  { type: "MaterialCommunityIcons", name: "thought-bubble-outline", iconName: "thinking", label: "Thinking" },
  { type: "SimpleLineIcons", name: "bubbles", iconName: "talking", label: "Talking" },
  { type: "Ionicons", name: "chatbubble-ellipses-outline", iconName: "thinkingAgain", label: "Thinking Again" },
  { type: "MaterialCommunityIcons", name: "spoon-sugar", iconName: "spoon", label: "Spoon" },
  { type: "FontAwesome", name: "table", iconName: "bingo", label: "Bingo" },
  { type: "Ionicons", name: "shuffle-sharp", iconName: "shuffle", label: "Shuffle" },
  { type: "MaterialIcons", name: "groups", iconName: "teams", label: "Teams" },
  { type: "MaterialCommunityIcons", name: "kayaking", iconName: "kayaking", label: "Kayaking" },
  { type: "FontAwesome5", name: 'save', iconName: 'save', label: 'Save' },
  { type: 'Ionicons', name: 'alert-circle-outline', iconName: 'alert', label: 'Alert' },
];
