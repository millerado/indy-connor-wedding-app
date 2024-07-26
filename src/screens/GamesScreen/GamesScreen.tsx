import React, { useMemo, useEffect, useContext, useCallback } from 'react';
import { View, Pressable, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, TextSizes, Icon, ActivityIndicator, Divider } from '../../components';
import { gamePlayers } from '../../utils';
import { typography } from '../../styles';
import { AuthContext, DataContext } from '../../contexts';
import styles from './GamesScreenStyles';

const GamesScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const {allGames} = useContext(DataContext);

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => authStatus?.isAdmin ? addNewButton() : null,
    });
  }, [authStatus, theme]);

  return (
    <View style={ss.pageWrapper}>
      {allGames.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={allGames}
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