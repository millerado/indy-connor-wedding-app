import React, { memo } from "react";
import { Linking, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import reactStringReplace from 'react-string-replace';
import { Text } from "../../components";

const FormatTextWithMentions = ({ text, ...restOfProps }) => {
  if (text) {
    const theme = useTheme();
    const navigation = useNavigation();
    // Replace pattern of @[username](userId)
    // Within larger text (e.g. a comment) we want to replace @[username](userId) with the username

    const goToUserScreen = (userId, name) => {
      // console.log('- Go to screen --', userId);
      navigation.push("User", {
        userId: userId,
        name: name,
      });
    };

    // Regex matches on [username](userId)
    const regex = /@\[(.*?)\]\((.*?)\)/g;
    const matches = text.match(regex);

    // Regex matches on URLs
    const regexUrl = /(https?:\/\/[^\s]+)/g;
    const matchesUrl = text.toLowerCase().match(regexUrl);

    // Regex matches on *bold text*
    const regexBold = /\*(.*?)\*/g;
    const matchesBold = text.match(regexBold);

    // Regex matches on _italic text_
    const regexItalic = /_(.*?)_/g;
    const matchesItalic = text.match(regexItalic);

    // Regex matches on a bullet (•) and a space that starts a line, along with all text on that line
    const regexBullet = /^•.*$/gm;
    const matchesBullet = text.match(regexBullet);
    
    if (matches) {
      matches.forEach((match) => {
        const [, username, userId] = match.match(/@\[(.*?)\]\((.*?)\)/);
        text = reactStringReplace(text, match, (match, i) => (
          <Text key={`${i}${username}${userId}${match}`} onPress={() => goToUserScreen(userId, username)} color={theme.colors.primary} italic {...restOfProps}>{username}</Text>
        ));
      });
    }

    if (matchesUrl) {
      matchesUrl.forEach((match) => {
        text = reactStringReplace(text, match, (match, i) => (
          <Text key={`${i}${match}`} onPress={() => Linking.openURL(match)} color={theme.colors.primary} {...restOfProps} italic underline>{match.replace('https://', '')}</Text>
        ));
      });
    }

    if (matchesBold) {
      matchesBold.forEach((match) => {
        const [, boldText] = match.match(/\*(.*?)\*/);
        text = reactStringReplace(text, match, (match, i) => (
          <Text key={`${i}${boldText}${match}`} bold {...restOfProps}>{boldText}</Text>
        ));
      });
    }

    if (matchesItalic) {
      matchesItalic.forEach((match) => {
        const [, italicText] = match.match(/_(.*?)_/);
        text = reactStringReplace(text, match, (match, i) => (
          <Text key={`${i}${italicText}${match}`} italic {...restOfProps}>{italicText}</Text>
        ));
      });
    }

    if (matchesBullet) {
      matchesBullet.forEach((match) => {
        const [, bulletText] = match.match(/^•/gm);
        text = reactStringReplace(text, match, (match, i) => (
          <View style={{flexDirection: 'row', paddingLeft: 20}} key={`${i}${bulletText}${match}`}>
          <Text>•</Text>
            <View style={{paddingLeft: 5}}>
              <Text {...restOfProps}>{match.substring(2)}</Text>
            </View>
          </View>
        ));
      });
    }

    return <Text {...restOfProps}>{text}</Text>;
  }
  return null;
}

export default memo(FormatTextWithMentions);
