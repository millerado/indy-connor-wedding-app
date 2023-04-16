import React, { useMemo, useState } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Tabs } from '../../components';
import styles from './StandingsScreenStyles';

const StandingsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [view, setView] = useState('teams');

  return (
    <View style={ss.pageWrapper}>
      <Tabs
        options={['teams', 'people']}
        selectedOption={view}
        setSelectedOption={setView}
      />
      <Text>
        Standings Page
      </Text>
    </View>
  );
};

export default StandingsScreen;
