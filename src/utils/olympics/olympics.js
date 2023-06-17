import React, { useState, useEffect } from "react";
import { Teams, Users, StandingsTeams, StandingsPeople, Posts } from "../../models";
import { DataStore } from "../../utils";

const CalculateStandings = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
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
      usersSubscription.unsubscribe();
      teamsSubscription.unsubscribe();
    };
  }, []);

  return null;
};

export default CalculateStandings;
