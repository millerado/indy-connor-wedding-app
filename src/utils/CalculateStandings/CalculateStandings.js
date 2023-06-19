import React, { useState, useEffect } from "react";
import { Teams, Users, StandingsTeams, StandingsPeople, Posts } from "../../models";
import DataStore from '../DataStore/DataStore';

const CalculateStandings = () => {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [standingsTeams, setStandingsTeams] = useState([]);
  const [standingsPeople, setStandingsPeople] = useState([]);

  useEffect(() => {
    const usersSubscription = DataStore.observeQuery(Users).subscribe(
      ({ items }) => {
        try {
          if (items) {
            const newUsers = items.map((u) => {
              return {
                id: u.id,
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

    const eventsSubscription = DataStore.observeQuery(
      Posts,
      (p) =>
        p.olympicEvent.eq(true)
    ).subscribe(({ items }) => {
      // if(JSON.stringify(items) !== JSON.stringify(events)) {
        setEvents(items);
      // }
    });

    const teamsStandingsSubscription = DataStore.observeQuery(StandingsTeams).subscribe(({ items }) => {
      // if (JSON.stringify(items) !== JSON.stringify(standingsTeams)) {
        // Make sure it's not a change to a different Post
        setStandingsTeams(items);
      // }
    });

    const usersStandingsSubscription = DataStore.observeQuery(StandingsPeople).subscribe(({ items }) => {
      // if (JSON.stringify(items) !== JSON.stringify(standingsPeople)) {
        // Make sure it's not a change to a different Post
        setStandingsPeople(items);
      // }
    });

    return () => {
      usersSubscription.unsubscribe();
      teamsSubscription.unsubscribe();
      eventsSubscription.unsubscribe();
      teamsStandingsSubscription.unsubscribe();
      usersStandingsSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check lengths on all 5
    if (users.length > 0 && teams.length > 0 && events.length > 0 && standingsTeams.length > 0 && standingsPeople.length > 0) {
      // TO-DO: Need to do a timestamp check in here, make sure this is real
      const startTime = new Date();
      // console.log('-- Lets do this! --', startTime);
      const maxEventTime = new Date(Math.max(...events.map((e) => new Date(e.updatedAt))));
      const maxTeamStandingsTime = new Date(Math.max(...standingsTeams.map((s) => new Date(s.updatedAt))));
      const maxPeopleStandingsTime = new Date(Math.max(...standingsPeople.map((s) => new Date(s.updatedAt))));

      if(maxEventTime > maxTeamStandingsTime || maxEventTime > maxPeopleStandingsTime) {
        // console.log('-- Something Changed, need to calc --');
        const participants = users.map((u) => {
          return {
            id: u.id,
            teamId: u.teamId,
            points: 0,
            gamesPlayed: 0,
            rank: 0,
          }
        });

        const teamsWithPoints = teams.map((t) => {
          return {
            id: t.id,
            points: 0,
            rank: 0,
          }
        });

        events.forEach((event) => {
          if(event.eventDetails) {
            const eventDetails = JSON.parse(event.eventDetails);
            const points = eventDetails.points;
            if(points?.length > 0) {
              points.forEach((point) => {
                const { userId, points } = point;
                const participant = participants.find((p) => p.id === userId);
                if(participant) {
                  participant.points += points;
                  participant.gamesPlayed += 1;
                }
                const team = teamsWithPoints.find((t) => t.id === participant.teamId);
                if(team) {
                  team.points += points;
                }
              });
            }
          }
        });

        // Sort participants by points
        participants.sort((a, b) => {
          if(a.points > b.points) {
            return -1;
          } else if(a.points < b.points) {
            return 1;
          } else {
            return 0;
          }
        });

        // Sort teams by points
        teamsWithPoints.sort((a, b) => {
          if(a.points > b.points) {
            return -1;
          } else if(a.points < b.points) {
            return 1;
          } else {
            return 0;
          }
        });

        // Set ranks
        participants.forEach((p, i) => {
          p.rank = i + 1;
        });

        teamsWithPoints.forEach((t, i) => {
          t.rank = i + 1;
        });

        // console.log('-- Participants --', participants);
        // console.log('-- Teams --', teamsWithPoints);

        let playersAdded = 0;
        let playerUpdated = 0;
        let teamsAdded = 0;
        let teamsUpdated = 0;
        // Update standings
        participants.forEach((p) => {
          const standing = standingsPeople.find((s) => s.userId === p.id);
          if(standing) {
            if( standing.points !== p.points || standing.gamesPlayed !== p.gamesPlayed || standing.rank !== p.rank) {
              DataStore.save(StandingsPeople.copyOf(standing, (updated) => {
                updated.points = p.points;
                updated.gamesPlayed = p.gamesPlayed;
                updated.rank = p.rank;
                updated.lastCalculationTime = startTime.toISOString();
              }));
              playerUpdated += 1;
            }
          } else {
            DataStore.save(new StandingsPeople({
              userId: p.id,
              points: p.points,
              gamesPlayed: p.gamesPlayed,
              rank: p.rank,
              lastCalculationTime: startTime.toISOString(),
            }));
            playersAdded += 1;
          }
        });

        teamsWithPoints.forEach((t) => {
          const standing = standingsTeams.find((s) => s.teamId === t.id);
          if(standing) {
            if( standing.points !== t.points || standing.rank !== t.rank) {
              DataStore.save(StandingsTeams.copyOf(standing, (updated) => {
                updated.points = t.points;
                updated.rank = t.rank;
                updated.lastCalculationTime = startTime.toISOString();
              }));
              teamsUpdated += 1;
            }
          } else {
            DataStore.save(new StandingsTeams({
              teamId: t.id,
              points: t.points,
              rank: t.rank,
              lastCalculationTime: startTime.toISOString(),
            }));
            teamsAdded += 1;
          }
        });

        // console.log('-- Standings Updated --', playersAdded, 'players added,', playerUpdated, 'players updated,', teamsAdded, 'teams added,', teamsUpdated, 'teams updated,', new Date());
      }
    }
  }, [users, teams, events]);

  // console.log('-- Data Lengths --', users.length, teams.length, events.length, standingsTeams.length, standingsPeople.length);

  return <></>;
};

export default CalculateStandings;
