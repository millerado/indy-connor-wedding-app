import React, { useMemo, useContext } from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "react-native-paper";
import { Icon, Button, Text, TextSizes } from "../../components";
import { typography } from "../../styles";
import { NotificationContext, AuthContext } from "../../contexts";
import { DataStore } from '../../utils';
import { Notifications } from '../../models';
import styles from "./NotificationsReadHeaderButtonStyles";

const NotificationsReadHeaderButton = () => {
  // Get the Auth Context
  const notificationDetails = useContext(NotificationContext).notificationDetails;
  const authStatus = useContext(AuthContext).authStatus;

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const markAllAsRead = async () => {
    // console.log("-- Mark as Read --", authStatus.userId);
    try {
      const allUnreadNotifications = await DataStore.query(Notifications, (n) =>
        n.and(n => [
          n.userId.eq(authStatus.userId),
          n.read.eq(false)
        ])
      );
      allUnreadNotifications.forEach(async (notification) => {
        await DataStore.save(
          Notifications.copyOf(notification, (updated) => {
            updated.read = true;
          })
        );
      });
    } catch (error) {
      console.log("Error deleting reaction", error);
    }
  };

  if (notificationDetails.unreadNotifications > 0) {
    return (
      <Pressable onPress={markAllAsRead} style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingRight: 5}}>
          <Text size={TextSizes.XS}>
            Mark
          </Text>
          <Text size={TextSizes.XS}>
            Read
          </Text>
        </View>
        <Icon
          name="markAsRead"
          color={theme.colors.primary}
          size={typography.fontSizeXXL}
        />
      </Pressable>
    );
  }
  return null;
};

export default NotificationsReadHeaderButton;
