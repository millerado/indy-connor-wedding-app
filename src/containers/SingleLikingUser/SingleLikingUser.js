import React, { memo, useState, useEffect, useMemo } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Text,
  Divider,
  ActivityIndicator,
} from "../../components";
import { typography } from "../../styles";
import styles from "./SingleLikingUserStyles";

const SingleLikingUser = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const navigation = useNavigation();

  const { userId, index, closeModal, likingUser } = props;

  if (!userId || !likingUser) {
    return null;
  }

  const goToLikingUserScreen = async (userId, name, image) => {
    if(userId) {
      await closeModal();
      navigation.push("User", {
        userId,
        name,
        picture: image,
      });
    }
  }

  if (!likingUser.id) {
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
    <Pressable onPress={() => goToLikingUserScreen(userId, likingUser?.name, likingUser?.image)} key={index}>
      {index > 0 && <Divider />}
      <View style={ss.userWrapper}>
        <Avatar
          fileName={likingUser?.image?.url}
          name={likingUser?.name}
          size={typography.fontSizeM * 2}
          variant="circle"
          absolute={false}
        />
        <View style={ss.nameWrapper}>
          <Text>
            {likingUser.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(SingleLikingUser);
