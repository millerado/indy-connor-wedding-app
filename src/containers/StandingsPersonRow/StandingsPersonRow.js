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

  const { index, user, points, teamIcon, showTeamIcon } = props;

  if (!user) {
    return null;
  }

  const goToLikingUserScreen = async (userId) => {
    if(userId) {
      navigation.push("User", {
        userId,
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
    <Pressable onPress={() => goToLikingUserScreen(user.id)} key={index} style={{paddingLeft: showTeamIcon ? 0 : (typography.fontSizeM * 2) + 10}}>
      {index > 0 && showTeamIcon && <Divider />}
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
            {user.name}<Text size={TextSizes.M}>: {points} point{points !== 1 ? 's' : ''}{showTeamIcon ? ' for ' : ''}</Text>
          </Text>
        </View>
        {showTeamIcon && (
          <Icon name={teamIcon} size={typography.fontSizeM * 2} />
        )}
      </View>
    </Pressable>
  );
};

export default memo(StandingsPersonRow);
