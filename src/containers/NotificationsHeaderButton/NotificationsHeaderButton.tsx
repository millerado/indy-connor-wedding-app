import React, { useMemo, useState, useContext } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Badge } from "../../components";
import { typography } from "../../styles";
import { ThemeContext, AuthContext } from "../../contexts";
import styles from "./NotificationsHeaderButtonStyles";

const NotificationsHeaderButton = () => {
  const navigation = useNavigation();

  // Get the Auth Context
  const authStatus = useContext(AuthContext).authStatus;

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  console.log('-- theme --', theme)
  return (
    <Pressable onPress={() => navigation.push('Notifications')}>
      <Icon name='notifications' color={theme.colors.primary} size={typography.fontSizeXXL} />
      <Badge style={{position: 'absolute', top: 0, left: 0}} size={15}>3</Badge>
    </Pressable>
  );
};

export default NotificationsHeaderButton;
