import { API } from "aws-amplify";
import { listStandingsTeams } from '../../graphql/queries';

const loadStandingsTeams = async (setStandingsTeams, oldStandingsTeams, eventId) => {
  try {
    const allStandings = await API.graphql({ query: listStandingsTeams, variables: { limit: 999999999, filter: {
      eventsID: { eq: eventId }
    } } });
    // const allStandings = await API.graphql({ query: listStandingsTeams, variables: { limit: 999999999 } });

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
    console.log('-- Error Loading Team Standings --', err);
    setStandingsTeams([]);
  }
}

export default loadStandingsTeams;