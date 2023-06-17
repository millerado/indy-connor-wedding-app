import React, { useMemo, useState, useContext, useEffect } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Badge } from "../../components";
import { typography } from "../../styles";
import { ThemeContext, AuthContext } from "../../contexts";
import { Notifications } from '../../models';
import { DataStore, setBadgeCount } from '../../utils';
import styles from "./NotificationsHeaderButtonStyles";

const NotificationsHeaderButton = () => {
  const navigation = useNavigation();
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);

  // Get the Auth Context
  const authStatus = useContext(AuthContext).authStatus;

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  useEffect(() => {
    const notificationsSubscription = DataStore.observeQuery(Notifications, (n) => n.and(n => [
      n.userId.eq(authStatus.userId),
      n.displayTime.le(new Date().toISOString()),
      n.read.eq(false),
    ]),
    ).subscribe(({ items }) => {
      setNumberOfNotifications(items.length);
      setBadgeCount(items.length);
    });

    return () => {
      notificationsSubscription.unsubscribe();
    };
  }, [authStatus]);

  // console.log('-- theme --', theme)
  return (
    <Pressable onPress={() => navigation.push('Notifications')}>
      <Icon name='notifications' color={theme.colors.primary} size={typography.fontSizeXXL} />
      {numberOfNotifications > 0 && (
        <Badge style={{position: 'absolute', top: 0, left: 0}} size={15}>{numberOfNotifications}</Badge>
      )}
    </Pressable>
  );
};

export default NotificationsHeaderButton;
