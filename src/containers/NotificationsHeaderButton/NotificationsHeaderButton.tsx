import React, { useMemo, useContext } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Badge } from "../../components";
import { typography } from "../../styles";
import { DataContext } from "../../contexts";
import styles from "./NotificationsHeaderButtonStyles";

const NotificationsHeaderButton = () => {
  const navigation = useNavigation();

  const { totalNotifications, unreadNotifications } = useContext(DataContext);
  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  return (
    <Pressable onPress={() => navigation.push('Notifications')} disabled={totalNotifications === 0}>
      <Icon name='notifications' color={totalNotifications === 0 ? theme.colors.disabled : theme.colors.primary} size={typography.fontSizeXXL} />
      {unreadNotifications > 0 && (
        <Badge style={{position: 'absolute', top: 0, left: 0}} size={15}>{unreadNotifications}</Badge>
      )}
    </Pressable>
  );
};

export default NotificationsHeaderButton;
