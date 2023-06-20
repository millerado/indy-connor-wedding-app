import React, { useMemo, useState, useEffect } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { SortDirection, Predicates } from "aws-amplify";
import { TabView, TabBar } from "react-native-tab-view";
import { Teams, Users, StandingsTeams, StandingsPeople } from "../../models";
import { ActivityIndicator, Text } from "../../components";
import { DataStore } from "../../utils";
import { StandingsTeamRow, StandingsPersonRow } from "../../containers";
import { calcDimensions } from "../../styles";
import styles from "./StandingsScreenStyles";

const StandingsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [standingsTeams, setStandingsTeams] = useState([]);
  const [standingsPeople, setStandingsPeople] = useState([]);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: "teams", title: "Teams" },
    { key: "campers", title: "Campers" },
  ];
  const dimensions = calcDimensions();

  const renderScene = ({ route }) => {
    if(standingsTeams.length === 0 || standingsPeople.length === 0) {
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
            standingsTeams.map((s, index) => {
              const team = teams.find((t) => t.id === s.teamId);
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
                  allUsers={users}
                  allTeams={teams}
                  allStandingsTeams={standingsTeams}
                  allStandingsPeople={standingsPeople}
                />
              );
            })}
          {route.key === "campers" &&
            standingsPeople.map((s, index) => {
              const user = users.find((u) => u.id === s.userId);
              if (!user) {
                return null;
              }
              const team = teams.find((t) => t.id === user.teamId);
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

  useEffect(() => {
    const teamsStandingsSubscription = DataStore.observeQuery(
      StandingsTeams,
      Predicates.ALL,
      {
        sort: (s) => s.rank(SortDirection.ASCENDING),
      }
    ).subscribe(({ items }) => {
      // if (JSON.stringify(items) !== JSON.stringify(standingsTeams)) {
        // Make sure it's not a change to a different Post
        setStandingsTeams(items);
      // }
    });

    const usersStandingsSubscription = DataStore.observeQuery(
      StandingsPeople,
      Predicates.ALL,
      {
        sort: (s) => s.rank(SortDirection.ASCENDING),
      }
    ).subscribe(({ items }) => {
      // if (JSON.stringify(items) !== JSON.stringify(standingsPeople)) {
        // Make sure it's not a change to a different Post
        setStandingsPeople(items);
      // }
    });

    const usersSubscription = DataStore.observeQuery(Users).subscribe(
      ({ items }) => {
        try {
          if (items) {
            const newUsers = items.map((u) => {
              return {
                id: u.id,
                name: u.name,
                image: u.image ? JSON.parse(u.image) : undefined,
                teamId: u.teamsID,
              };
            });

            // Quick check to make sure we're only updating state if the subscription caught a chance to the user associated with this post
            // if (JSON.stringify(newUsers) !== JSON.stringify(users)) {
              setUsers(newUsers);
            // }
          }
        } catch (err) {
          console.log("error fetching Data", err);
        }
      }
    );

    const teamsSubscription = DataStore.observeQuery(Teams).subscribe(
      ({ items }) => {
        try {
          if (items) {
            // Quick check to make sure we're only updating state if the subscription caught a chance to the user associated with this post
            // if (JSON.stringify(items) !== JSON.stringify(teams)) {
              setTeams(items);
            // }
          }
        } catch (err) {
          console.log("error fetching Data", err);
        }
      }
    );

    return () => {
      teamsStandingsSubscription.unsubscribe();
      usersStandingsSubscription.unsubscribe();
      usersSubscription.unsubscribe();
      teamsSubscription.unsubscribe();
    };
  }, []);

  // if (
  //   users.length === 0 ||
  //   teams.length === 0 ||
  //   standingsTeams.length === 0 ||
  //   standingsPeople.length === 0
  // ) {
  //   return (
  //     <View style={ss.pageWrapper}>
  //       <View style={ss.pageActivityIndicatorWrapper}>
  //         <ActivityIndicator size={60} />
  //       </View>
  //     </View>
  //   );
  // }

  return (
    // <View style={ss.pageWrapper}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: dimensions.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          contentContainerStyle={{ backgroundColor: theme.colors.background }}
          tabStyle={{
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          renderTabBarItem={({ route, ...otherProps }) => {
            const isFocused =
              otherProps?.navigationState.routes[
                otherProps.navigationState.index
              ].key === route.key;
            return (
              <Pressable
                onPress={otherProps.onPress}
                style={[
                  ss.tabItem,
                  {
                    backgroundColor: isFocused
                      ? theme.colors.primary
                      : theme.colors.background,
                    width: dimensions.width / routes.length,
                  },
                ]}
                key={route.key}
              >
                <View>
                  <Text
                    color={isFocused ? theme.colors.onPrimary : undefined}
                    bold
                  >
                    {route.title.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    />
    // </View>
  );
};

export default StandingsScreen;
