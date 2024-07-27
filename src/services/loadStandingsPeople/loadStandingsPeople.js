import { API } from "aws-amplify";
import { listStandingsPeople } from '../../graphql/queries';

const loadStandingsPeople = async (setStandingsPeople, oldStandingsPeople, eventId) => {
  try {
    const allStandings = await API.graphql({ query: listStandingsPeople, variables: { limit: 999999999, filter: {
      eventsID: { eq: eventId }
    } } });
    // const allStandings = await API.graphql({ query: listStandingsPeople, variables: { limit: 999999999 } });

    const unfilteredItems = allStandings?.data?.listStandingsPeople?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => b.points - a.points);
      if(JSON.stringify(items) !== JSON.stringify(oldStandingsPeople)){
        setStandingsPeople(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Person Standings --', err);
    setStandingsPeople([]);
  }
}

export default loadStandingsPeople;