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
import styles from "./SingleUserInModalStyles";

interface SingleUserInModalProps {
  userId: string;
  singleUser?: any;
  index: number;
  rowClickedCallback?: (userId: string) => void;
}

const SingleUserInModal = (props: SingleUserInModalProps) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const navigation = useNavigation();

  const { userId, singleUser, index, rowClickedCallback } = props;

  if (!userId || !singleUser) {
    return null;
  }

  if (!singleUser.id) {
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
    <Pressable onPress={() => rowClickedCallback(userId)} key={index}>
      {index > 0 && <Divider />}
      <View style={ss.userWrapper}>
        <Avatar
          fileName={singleUser?.image?.url}
          name={singleUser?.name}
          size={typography.fontSizeM * 2}
          variant="circle"
          absolute={false}
        />
        <View style={ss.nameWrapper}>
          <Text>
            {singleUser.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(SingleUserInModal);