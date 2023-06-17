import React, { useMemo, useContext } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Badge } from "../../components";
import { typography } from "../../styles";
import { NotificationContext } from "../../contexts";
import styles from "./NotificationsHeaderButtonStyles";

const NotificationsHeaderButton = () => {
  const navigation = useNavigation();

  // Get the Auth Context
  const notificationDetails = useContext(NotificationContext).notificationDetails;

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  return (
    <Pressable onPress={() => navigation.push('Notifications')} disabled={notificationDetails.totalNotifications === 0}>
      <Icon name='notifications' color={notificationDetails.totalNotifications === 0 ? theme.colors.disabled : theme.colors.primary} size={typography.fontSizeXXL} />
      {notificationDetails.unreadNotifications > 0 && (
        <Badge style={{position: 'absolute', top: 0, left: 0}} size={15}>{notificationDetails.unreadNotifications}</Badge>
      )}
    </Pressable>
  );
};

export default NotificationsHeaderButton;
