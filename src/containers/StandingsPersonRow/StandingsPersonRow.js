import React, { memo, useMemo } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Text,
  Divider,
  ActivityIndicator,
  Icon,
  TextSizes,
} from "../../components";
import { typography } from "../../styles";
import styles from "./StandingsPersonRowStyles";

const StandingsPersonRow = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const navigation = useNavigation();

  const { index, user, points, gamesPlayed, teamIcon, showTeamIcon, showRightIcon } = props;

  if (!user) {
    return null;
  }

  const goToLikingUserScreen = async (userId, name, image) => {
    if(userId && name) {
      navigation.push("User", {
        userId,
        name,
        picture: image,
      });
    }
  }

  if (!user.id) {
    if(index === 0) {
      return (
        <View style={ss.userWrapper}>
          <ActivityIndicator size={20} />
        </View>
      );
    }
    return null;
  }

  return (
    <Pressable onPress={() => goToLikingUserScreen(user.id, user?.name, user?.image)} key={index} style={{paddingLeft: showTeamIcon || showRightIcon ? 0 : (typography.fontSizeM * 2) + 10}}>
      {index > 0 && ( showTeamIcon || showRightIcon ) && <Divider />}
      <View style={ss.rowWrapper}>
        <View style={ss.userWrapper}>
          <Avatar
            fileName={user?.image?.url}
            name={user?.name}
            size={typography.fontSizeM * 2}
            variant="circle"
            absolute={false}
          />
          <View style={ss.nameWrapper}>
            <Text bold size={TextSizes.M}>
              {user.name}
            </Text>
            <Text size={TextSizes.S}>
              {points} point{points !== 1 ? 's' : ''}{gamesPlayed > 0 ? ` in ${gamesPlayed} game${gamesPlayed !== 1 ? 's' : ''}` : ''}
            </Text>
          </View>
        </View>
        {showTeamIcon && (
          <Icon name={teamIcon} size={typography.fontSizeM * 2} />
        )}
        {showRightIcon && (
          <Icon name={showRightIcon} size={typography.fontSizeM * 2} />
        )}
      </View>
    </Pressable>
  );
};

export default memo(StandingsPersonRow);
