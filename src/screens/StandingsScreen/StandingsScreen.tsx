import { useMemo } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from '../../components';
import styles from './StandingsScreenStyles';

const StandingsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  return (
    <View style={ss.pageWrapper}>
      <Text>
        Standings Page
      </Text>
    </View>
  );
};

export default StandingsScreen;
