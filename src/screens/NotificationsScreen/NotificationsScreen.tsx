import React, {useMemo} from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from '../../components';
import styles from './NotificationsScreenStyles';

const NotificationsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  return (
    <View style={ss.pageWrapper}>
      <Text>Notifications Screen</Text>
    </View>
  );
};

export default NotificationsScreen;
