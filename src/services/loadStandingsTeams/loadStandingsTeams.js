import { SortDirection, Predicates, API } from "aws-amplify";
import { listStandingsTeams } from '../../graphql/queries';
import { StandingsTeams } from "../../models";
import { DataStore } from "../../utils";

const loadStandingsTeamsFromDatastore = async (setStandingsTeams, oldStandingsTeams) => {
  try {
    const allStandings = await DataStore.query(StandingsTeams,
      Predicates.ALL,
      {
        sort: (s) => s.points(SortDirection.DESCENDING),
      });
      if(JSON.stringify(allStandings) !== JSON.stringify(oldStandingsTeams)){
        setStandingsTeams(allStandings);
      }
  } catch (err) {
    console.log('-- Error Loading Team Standings From Datastore --', err);
  }
}

const loadStandingsTeams = async (setStandingsTeams, oldStandingsTeams) => {
  try {
    const allStandings = await API.graphql({ query: listStandingsTeams, variables: { limit: 999999999 } });

    const unfilteredItems = allStandings?.data?.listStandingsTeams?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => b.points - a.points);
      if(JSON.stringify(items) !== JSON.stringify(oldStandingsTeams)){
        setStandingsTeams(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Team Standings, Will Try Datastore --', err);
    loadStandingsTeamsFromDatastore(setStandingsTeams, oldStandingsTeams);
  }
}

export default loadStandingsTeams;