import React, { memo } from "react";
import { Linking } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import reactStringReplace from 'react-string-replace';
import { Text, } from "../../components";

const FormatTextWithMentions = ({ text }) => {
  if (text) {
    const theme = useTheme();
    const navigation = useNavigation();
    // Replace pattern of @[username](userId)
    // Within larger text (e.g. a comment) we want to replace @[username](userId) with the username

    const goToUserScreen = (userId) => {
      console.log('- Go to screen --', userId);
      navigation.push("User", { userId: userId });
    };

    const regex = /@\[(.*?)\]\((.*?)\)/g;
    const matches = text.match(regex);
    const regexUrl = /(https?:\/\/[^\s]+)/g;
    const matchesUrl = text.toLowerCase().match(regexUrl);
    if (matches) {
      matches.forEach((match) => {
        const [, username, userId] = match.match(/@\[(.*?)\]\((.*?)\)/);
        text = reactStringReplace(text, match, (match, i) => (
          <Text key={`${i}${username}${userId}${match}`} onPress={() => goToUserScreen(userId)} color={theme.colors.primaryContainer}>@{username}</Text>
        ));
      });
    }

    if (matchesUrl) {
      matchesUrl.forEach((match) => {
        text = reactStringReplace(text, match, (match, i) => (
          <Text key={`${i}${match}`} onPress={() => Linking.openURL(match)} color={theme.colors.primaryContainer}>{match}</Text>
        ));
      });
    }

    return <Text>{text}</Text>;
  }
  return null;
}

export default memo(FormatTextWithMentions);
