import React, { useMemo, useState, useContext, useEffect } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";
import { ActivityIndicator, Text } from "../../components";
import { StandingsTeamRow, StandingsPersonRow } from "../../containers";
import { DataContext } from "../../contexts";
import { calcDimensions } from "../../styles";
import styles from "./StandingsScreenStyles";

const StandingsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [index, setIndex] = useState(0);
  const [sortedStandingsPeople, setSortedStandingsPeople] = useState([]);
  const routes = [
    { key: "teams", title: "Teams" },
    { key: "campers", title: "Campers" },
  ];
  const dimensions = calcDimensions();
  const { allUsers, allTeams, allStandingsPeople, allStandingsTeams } = useContext(DataContext);

  useEffect(() => {
    if(allUsers.length > 0 && allStandingsPeople.length > 0) {
      const allStandingsPeopleWithNames = allStandingsPeople.map((s) => {
        const user = allUsers.find((u) => u.id === s.userId);
        if (!user) {
          return null;
        }
        return {
          ...s,
          name: user.name,
        };
      });
      // If a user was deleted they still exist in standings, this removes them
      const activeUsers = allStandingsPeopleWithNames.filter((s) => s?.name);
      
      // sort by: points (desc), gamesPlayed (desc), name (asc)
      const newStandingsPeople = activeUsers.sort((a, b) => {
        if (a.points === b.points) {
          if (a.gamesPlayed === b.gamesPlayed) {
            return a.name > b.name ? 1 : -1;
          }
          return b.gamesPlayed - a.gamesPlayed;
        }
        return b.points - a.points;
      });
      if(JSON.stringify(newStandingsPeople) !== JSON.stringify(sortedStandingsPeople)) {
        setSortedStandingsPeople(newStandingsPeople);
      }
    }
  }, [allUsers, allStandingsPeople]);

  const renderScene = ({ route }) => {
    if(allStandingsTeams.length === 0 || sortedStandingsPeople.length === 0) {
      return(
        <View style={ss.pageWrapper}>
          <View style={ss.pageActivityIndicatorWrapper}>
            <ActivityIndicator size={60} />
          </View>
        </View>
      );
    }

    return (
      <View style={ss.pageWrapper}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          style={{ flex: 1, width: "100%" }}
        >
          {route.key === "teams" &&
            allStandingsTeams.map((s, index) => {
              const team = allTeams.find((t) => t.id === s.teamId);
              if (!team) {
                return null;
              }

              return (
                <StandingsTeamRow
                  index={index}
                  key={index}
                  teamId={team.id}
                  teamName={team.name}
                  iconName={team.iconName}
                  teamColor={team.colorCode}
                  description={team.description}
                  points={s.points}
                />
              );
            })}
          {route.key === "campers" &&
            sortedStandingsPeople.map((s, index) => {
              const user = allUsers.find((u) => u.id === s.userId);
              if (!user) {
                return null;
              }
              const team = allTeams.find((t) => t.id === user.teamId);
              if (!team) {
                return null;
              }
              return (
                <StandingsPersonRow
                  index={index}
                  key={index}
                  user={user}
                  points={s.points}
                  gamesPlayed={s.gamesPlayed}
                  teamIcon={team.iconName}
                  showTeamIcon={true}
                />
              );
            })}
        </ScrollView>
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: dimensions.width }}
      renderTabBar={(props) => {
        return (        
          <TabBar
            {...props}
            contentContainerStyle={{ backgroundColor: theme.colors.background }}
            tabStyle={{
              backgroundColor: theme.colors.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
            renderTabBarItem={({ key, ...restOfProps }) => {
              const isFocused = restOfProps.navigationState.index === restOfProps.navigationState.routes.findIndex(r => r.key === key);
              return (
                <Pressable
                  onPress={restOfProps.onPress}
                  key={key}
                  style={[
                    ss.tabItem,
                    {
                      backgroundColor: isFocused ? theme.colors.primary : theme.colors.background,
                      width: dimensions.width / routes.length,
                    },
                  ]}
                >
                  <View>
                    <Text color={isFocused ? theme.colors.onPrimary : undefined} bold>
                      {restOfProps.route.title.toUpperCase()}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      }
    />
  );
};

export default StandingsScreen;
