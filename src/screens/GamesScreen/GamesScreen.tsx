import React, { useMemo, useEffect, useState, useContext } from 'react';
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Icon } from '../../components';
import { DataStore } from '../../utils';
import { Games } from '../../models';
import { AuthContext } from '../../contexts';
import styles from './GamesScreenStyles';

const GamesScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const [games, setGames] = useState([]);

  const addNewButton = () => {
    return (
      <Pressable onPress={() => navigation.push("Manage Game", {
        view: 'newGame'
      })}>
        <View>
          <Icon
            name={'addItem'}
            color={theme.colors.primary}
          />
        </View>
      </Pressable>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => authStatus?.isAdmin ? addNewButton() : null,
    });
  }, [authStatus, theme]);

  useEffect(() => {
    const gamesSubscription = DataStore.observeQuery(Games).subscribe(({ items }) => {
      setGames(items);
    });

    return () => {
      gamesSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={ss.pageWrapper}>
      <Text>Manage a Single Game Screen</Text>
    </View>
  );
};

export default GamesScreen;
