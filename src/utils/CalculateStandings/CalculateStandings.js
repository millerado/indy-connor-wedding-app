import React, { useState, useEffect, memo, useContext, useRef } from "react";
import { StandingsPeople, StandingsTeams } from "../../models";
import DataStore from '../DataStore/DataStore';
import { DataContext } from "../../contexts";

const CalculateStandings = () => {
  const [events, setEvents] = useState([]);
  const { allUsers, allPosts, allTeams, allStandingsPeople, allStandingsTeams } = useContext(DataContext);
  const isCalculating = useRef(false);
  
  useEffect(() => {
    // Check lengths on all 5 arrays
    if (allUsers.length > 0 && allTeams.length > 0 && events.length > 0 && allStandingsTeams.length > 0 && allStandingsPeople.length > 0) {
      // console.log('-- Running Calc Standings --', allUsers.length, allTeams.length, events.length, allStandingsTeams.length, allStandingsPeople.length);
      const startTime = new Date();
      // console.log('-- Lets do this! --', startTime);
      const maxEventTime = new Date(Math.max(...events.map((e) => new Date(e.updatedAt))));
      const maxTeamStandingsTime = new Date(Math.max(...allStandingsTeams.map((s) => new Date(s.lastCalculationTime))));
      const maxPeopleStandingsTime = new Date(Math.max(...allStandingsPeople.map((s) => new Date(s.lastCalculationTime))));
      // console.log('-- Max Event Time --', maxEventTime);
      // console.log('-- Max Team Standings Time --', maxTeamStandingsTime);
      // console.log('-- Max People Standings Time --', maxPeopleStandingsTime);

      if((maxEventTime > maxTeamStandingsTime || maxEventTime > maxPeopleStandingsTime) && !isCalculating.current) {
        isCalculating.current = true;
        // console.log('-- Something Changed, need to calc --');
        const participants = allUsers.map((u) => {
          return {
            id: u.id,
            teamId: u.teamId,
            name: u.name,
            points: 0,
            gamesPlayed: 0,
            rank: 0,
          }
        });

        const teamsWithPoints = allTeams.map((t) => {
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

        // Sort participants by points, then by gamesPlayed, then by name if tied
        participants.sort((a, b) => {
          if(a.points > b.points) {
            return -1;
          } else if(a.points < b.points) {
            return 1;
          } else {
            if(a.gamesPlayed > b.gamesPlayed) {
              return -1;
            } else if(a.gamesPlayed < b.gamesPlayed) {
              return 1;
            } else {
              if(a.name < b.name) {
                return -1;
              } else if(a.name > b.name) {
                return 1;
              } else {
                return 0;
              }
            }
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
        // console.log('-- allStandingsPeople --', allStandingsPeople);

        let playersAdded = 0;
        let playerUpdated = 0;
        let teamsAdded = 0;
        let teamsUpdated = 0;
        // Update standings
        participants.forEach( async (p) => {
          const standing = allStandingsPeople.find((s) => s.userId === p.id);
          if(standing) {
            if( standing.points !== p.points || standing.gamesPlayed !== p.gamesPlayed) {
              const originalItem = await DataStore.query(StandingsPeople, standing.id);
              DataStore.save(StandingsPeople.copyOf(originalItem, (updated) => {
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

        teamsWithPoints.forEach( async (t) => {
          const standing = allStandingsTeams.find((s) => s.teamId === t.id);
          if(standing) {
            if( standing.points !== t.points) {
              const originalItem = await DataStore.query(StandingsTeams, standing.id);
              DataStore.save(StandingsTeams.copyOf(originalItem, (updated) => {
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
        isCalculating.current = false;
      }
    }
  }, [allUsers, allTeams, events, allStandingsTeams, allStandingsPeople]);

  useEffect(() => {
    const newEvents = allPosts.filter((p) => p.olympicEvent);
    if(JSON.stringify(newEvents) !== JSON.stringify(events)) {
      setEvents(newEvents);
    }
  }, [allPosts])

  // console.log('-- Data Lengths --', users.length, teams.length, events.length, standingsTeams.length, standingsPeople.length);

  return <></>;
};

export default memo(CalculateStandings);
