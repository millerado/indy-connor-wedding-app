import React, { useMemo, useContext, useCallback } from 'react';
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { ActivityIndicator, Divider } from '../../components';
import { StandingsPersonRow } from '../../containers';
import { DataContext } from '../../contexts';
import styles from './LoggedInUsersScreenStyles';

const LoggedInUsersScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const {allUsers, allExpoTokens, allTeams, allStandingsPeople} = useContext(DataContext);

  const keyExtractor = useCallback((item) => item.id, []);

  const renderItem = useCallback(({ item }) => {
    if(allTeams.length > 0 && allExpoTokens.length > 0 && allStandingsPeople.length > 0) {
      const user = item;
      const team = allTeams.find((t) => t.id === user.teamId);
      if (!team) {
        return null;
      }
      const s = allStandingsPeople.find((s) => s.userId === user.id);
      const matchingTokens = allExpoTokens.filter((t) => t.userId === user.id);
      return (
        <StandingsPersonRow
          index={user.id}
          key={user.id}
          user={user}
          points={s.points}
          gamesPlayed={s.gamesPlayed || 0}
          teamIcon={team.iconName || 0}
          showTeamIcon={false}
          showRightIcon={matchingTokens.length > 0 ? 'check' : 'close'}
        />
      );
    }
  }, [allTeams, allStandingsPeople, allExpoTokens]);

  return (
    <View style={ss.pageWrapper}>
      {allUsers.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={allUsers}
          renderItem={renderItem}
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

export default LoggedInUsersScreen;