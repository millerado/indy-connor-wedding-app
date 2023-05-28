import React, { useMemo, useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { SortDirection, Predicates } from "aws-amplify";
import { Teams, Users, StandingsTeams, StandingsPeople } from "../../models";
import { ActivityIndicator, Tabs } from "../../components";
import { DataStore } from "../../utils";
import { StandingsTeamRow, StandingsPersonRow } from "../../containers";
import styles from "./StandingsScreenStyles";

const StandingsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [view, setView] = useState("teams");
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [standingsTeams, setStandingsTeams] = useState([]);
  const [standingsPeople, setStandingsPeople] = useState([]);

  useEffect(() => {
    const teamsStandingsSubscription = DataStore.observeQuery(
      StandingsTeams,
      Predicates.ALL,
      {
        sort: (s) => s.rank(SortDirection.ASCENDING),
      }
    ).subscribe(({ items }) => {
      if (items !== standingsTeams) {
        // Make sure it's not a change to a different Post
        setStandingsTeams(items);
      }
    });

    const usersStandingsSubscription = DataStore.observeQuery(
      StandingsPeople,
      Predicates.ALL,
      {
        sort: (s) => s.rank(SortDirection.ASCENDING),
      }
    ).subscribe(({ items }) => {
      if (items !== standingsPeople) {
        // Make sure it's not a change to a different Post
        setStandingsPeople(items);
      }
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
            if (newUsers !== users) {
              setUsers(newUsers);
            }
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
            if (items !== teams) {
              setTeams(items);
            }
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

  return (
    <View style={ss.pageWrapper}>
      {users.length === 0 ||
      teams.length === 0 ||
      standingsTeams.length === 0 ||
      standingsPeople.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <>
          <Tabs
            options={["teams", "campers"]}
            selectedOption={view}
            setSelectedOption={setView}
          />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            style={{ flex: 1, width: "100%" }}
          >
            {view === "teams" &&
              standingsTeams.map((s, index) => {
                const team = teams.find((t) => t.id === s.teamId);
                if (!team) {
                  return null;
                }
                const usersOnTeam = users.filter((u) => u.teamId === team.id);

                // Find top 3 scorers in standingsPeople who's userId is in array of usersOnTeam
                const topThreeScorers = standingsPeople
                  .filter((sp) => usersOnTeam.find((u) => u.id === sp.userId))
                  .sort((a, b) => b.points - a.points)
                  .slice(0, 3);
                // Add in User Information
                const topUsers = topThreeScorers.map((top) => {
                  const user = users.find((u) => u.id === top.userId);
                  return {
                    ...top,
                    user,
                  };
                });

                return (
                  <StandingsTeamRow
                    index={index}
                    key={index}
                    teamId={team.id}
                    teamName={team.name}
                    iconName={team.iconName}
                    teamColor={team.colorCode}
                    points={s.points}
                    topThreeScorers={topUsers}
                  />
                );
              })}
            {view === "campers" &&
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
                    teamIcon={team.iconName}
                    showTeamIcon={true}
                  />
                );
              })}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default StandingsScreen;
