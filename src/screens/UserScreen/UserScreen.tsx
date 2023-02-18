import { useMemo } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from '../../components';
import styles from './UserScreenStyles';

const UserScreen = () => {
  const theme = useTheme();
  const ss = useMemo(
    () => styles(theme), [theme]
  );

  return (
    <View style={ss.pageWrapper}>
      <Text>User Screen</Text>
    </View>
  );
};

export default UserScreen;
