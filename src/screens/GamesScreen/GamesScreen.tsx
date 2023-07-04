import React, { useMemo, useEffect, useState, useContext, useCallback } from 'react';
import { View, Pressable, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Predicates, SortDirection, API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreateGames, onUpdateGames, onDeleteGames } from "../../graphql/subscriptions";
import { listGames } from '../../graphql/queries'
import { Text, TextSizes, Icon, ActivityIndicator, Divider } from '../../components';
import { DataStore, gamePlayers } from '../../utils';
import { Games } from '../../models';
import { typography } from '../../styles';
import { AuthContext } from '../../contexts';
import styles from './GamesScreenStyles';

const GamesScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const [games, setGames] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        loadGames();
      }
      setPriorConnectionState(payload.data.connectionState);
    }
  });

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

  const keyExtractor = useCallback((item) => item.id, []);

  const renderGameRow = ({ item }) => {
    return (
      <Pressable style={{padding: 10, flexDirection: 'row'}} onPress={() => 
        navigation.push("Manage Game", {
          view: 'editGame',
          item: item
        })}
      >
        <Icon
          name={item.iconName}
          color={theme.colors.primary}
          size={typography.fontSizeL * 2}
        />
        <View style={{paddingLeft: 10, justifyContent: 'center'}}>
          <Text size={TextSizes.L}>{item.name}</Text>
          <Text size={TextSizes.S}>{gamePlayers(item, 'Played by')}</Text>
        </View>
      </Pressable>
    );
  }

  const loadGamesFromDatastore = async () => {
    try {
      const items = await DataStore.query(Games, Predicates.ALL, {
        sort: (s) => s.name(SortDirection.ASCENDING),
      });
      if(items.length > 0){
        setGames(items);
        setDataLoading(false);
      }
    } catch (err) {
      console.log('-- Error Loading Games From Datastore --', err);
    }
  };

  const loadGames = async () => {
    try {
      const allGames = await API.graphql({ query: listGames, variables: { limit: 999999999 } });

      const unfilteredItems = allGames?.data?.listGames?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        items.sort((a, b) => a.name.localeCompare(b.name));
        setGames(items);
        setDataLoading(false);
      }
    } catch (err) {
      console.log('-- Error Loading Games, Will Try Datastore --', err);
      loadGamesFromDatastore();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => authStatus?.isAdmin ? addNewButton() : null,
    });
  }, [authStatus, theme]);

  useEffect(() => {
    const createSub = API.graphql(
      graphqlOperation(onCreateGames)
    ).subscribe({
      next: ({ value }) => loadGames(),
    });
    
    const updateSub = API.graphql(
      graphqlOperation(onUpdateGames)
    ).subscribe({
      next: ({ value }) => loadGames()
    });
    
    const deleteSub = API.graphql(
      graphqlOperation(onDeleteGames)
    ).subscribe({
      next: ({ value }) => loadGames()
    });

    loadGames();

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    }
  }, []);

  return (
    <View style={ss.pageWrapper}>
      {dataLoading || games.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={games}
          renderItem={(item) => renderGameRow(item)}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Divider}
          style={{ width: '100%'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
        />
      )}
    </View>
  );
};

export default GamesScreen;