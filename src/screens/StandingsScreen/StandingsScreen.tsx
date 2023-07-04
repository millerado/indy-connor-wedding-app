import React, { useMemo, useState, useEffect } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, TabBar } from "react-native-tab-view";
import { SortDirection, Predicates, API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreateStandingsPeople, onUpdateStandingsPeople, onDeleteStandingsPeople, onCreateStandingsTeams, onUpdateStandingsTeams, onDeleteStandingsTeams, onCreateUsers, onUpdateUsers, onDeleteUsers} from '../../graphql/subscriptions';
import { listStandingsPeople, listStandingsTeams, listUsers, listTeams } from '../../graphql/queries';
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
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);
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

  const loadTeamStandingsFromDatastore = async () => {
    try {
      const allStandings = await DataStore.query(StandingsTeams, 
        Predicates.ALL,
        {
          sort: (s) => s.rank(SortDirection.ASCENDING),
        });
        setStandingsTeams(allStandings);
    } catch (err) {
      console.log('-- Error Loading Team Standings From Datastore --', err);
    }
  }

  const loadTeamStandings = async () => {
    try {
      const allStandings = await API.graphql({ query: listStandingsTeams, variables: { limit: 999999999 } });

      const unfilteredItems = allStandings?.data?.listStandingsTeams?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        items.sort((a, b) => a.rank - b.rank);
        setStandingsTeams(items);
      }
    } catch (err) {
      console.log('-- Error Loading Team Standings, Will Try Datastore --', err);
      loadTeamStandingsFromDatastore();
    }
  }

  const loadPeopleStandingsFromDatastore = async () => {
    try {
      const allStandings = await DataStore.query(StandingsPeople,
        Predicates.ALL,
        {
          sort: (s) => s.rank(SortDirection.ASCENDING),
        });
        setStandingsPeople(allStandings);
    } catch (err) {
      console.log('-- Error Loading Person Standings From Datastore --', err);
    }
  }

  const loadTeamPeopleStandings = async () => {
    try {
      const allStandings = await API.graphql({ query: listStandingsPeople, variables: { limit: 999999999 } });

      const unfilteredItems = allStandings?.data?.listStandingsPeople?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        items.sort((a, b) => a.rank - b.rank);
        setStandingsPeople(items);
      }
    } catch (err) {
      console.log('-- Error Loading Person Standings, Will Try Datastore --', err);
      loadPeopleStandingsFromDatastore();
    }
  }

  const loadUsersFromDatastore = async () => {
    try {
      const allUsers = await DataStore.query(Users);
      if(allUsers) {
        const newUsers = allUsers.map((u) => {
          return {
            id: u.id,
            name: u.name,
            image: u.image ? JSON.parse(u.image) : undefined,
            teamId: u.teamsID,
          };
        });
      }
      setUsers(newUsers);
    } catch (err) {
      console.log('-- Error Loading Users From Datastore --', err);
    }
  }

  const loadTeamsFromDatastore = async () => {
    try {
      const allTeams = await DataStore.query(Teams);
      if(allTeams) {
        setTeams(allTeams);
      }
    } catch (err) {
      console.log('-- Error Loading Teams From Datastore --', err);
    }
  }

  const loadTeams = async () => {
    try {
      const allTeams = await API.graphql({ query: listTeams, variables: { limit: 999999999 } });

      const unfilteredItems = allTeams?.data?.listTeams?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        setTeams(items);
      }
    } catch (err) {
      console.log('-- Error Loading Teams --', err);
      loadTeamsFromDatastore();
    }
  }

  const loadUsers = async () => {
    try {
      const allUsers = await API.graphql({ query: listUsers, variables: { limit: 999999999 } });

      const unfilteredItems = allUsers?.data?.listUsers?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        const newUsers = items.map((u) => {
          return {
            id: u.id,
            name: u.name,
            image: u.image ? JSON.parse(u.image) : undefined,
            teamId: u.teamsID,
          };
        });

        setUsers(newUsers);
      }
    } catch (err) {
      console.log('-- Error Loading Users --', err);
      loadUsersFromDatastore();
    }
  }

  useEffect(() => {
    loadTeamStandings();
    loadTeamPeopleStandings();
    loadTeams();
    loadUsers();

    const createUserSubscription = API.graphql(
      graphqlOperation(onCreateUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(),
    });

    const updateUserSubscription = API.graphql(
      graphqlOperation(onUpdateUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(),
    });

    const deleteUserSubscription = API.graphql(
      graphqlOperation(onDeleteUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(),
    });

    const createTeamSubscription = API.graphql(
      graphqlOperation(onCreateStandingsTeams)
    ).subscribe({
      next: ({ value }) => loadTeamStandings(),
    });

    const updateTeamSubscription = API.graphql(
      graphqlOperation(onUpdateStandingsTeams)
    ).subscribe({
      next: ({ value }) => loadTeamStandings(),
    });

    const deleteTeamSubscription = API.graphql(
      graphqlOperation(onDeleteStandingsTeams)
    ).subscribe({
      next: ({ value }) => loadTeamStandings(),
    });

    const createPersonSubscription = API.graphql(
      graphqlOperation(onCreateStandingsPeople)
    ).subscribe({
      next: ({ value }) => loadTeamPeopleStandings(),
    });

    const updatePersonSubscription = API.graphql(
      graphqlOperation(onUpdateStandingsPeople)
    ).subscribe({
      next: ({ value }) => loadTeamPeopleStandings(),
    });

    const deletePersonSubscription = API.graphql(
      graphqlOperation(onDeleteStandingsPeople)
    ).subscribe({
      next: ({ value }) => loadTeamPeopleStandings(),
    });

    return () => {
      createUserSubscription.unsubscribe();
      updateUserSubscription.unsubscribe();
      deleteUserSubscription.unsubscribe();
      createTeamSubscription.unsubscribe();
      updateTeamSubscription.unsubscribe();
      deleteTeamSubscription.unsubscribe();
      createPersonSubscription.unsubscribe();
      updatePersonSubscription.unsubscribe();
      deletePersonSubscription.unsubscribe();
    }
  }, []);

  // console.log('-- Number of Teams --', teams.length);
  // console.log('-- Number of Users --', users.length);
  // console.log('-- Number of Team Standings --', standingsTeams.length);
  // console.log('-- Number of People Standings --', standingsPeople.length);

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
