import { SortDirection, Predicates, API } from "aws-amplify";
import { listStandingsPeople } from '../../graphql/queries';
import { StandingsPeople } from "../../models";
import { DataStore } from "../../utils";

const loadStandingsPeopleFromDatastore = async (setStandingsPeople, oldStandingsPeople, eventId) => {
  try {
    const allStandings = await DataStore.query(StandingsPeople,
      Predicates.ALL,
      {
        sort: (s) => s.points(SortDirection.DESCENDING),
        filter: (f) => f.standingsPeopleEventsId("eq", eventId)
      });
      if(JSON.stringify(allStandings) !== JSON.stringify(oldStandingsPeople)){
        setStandingsPeople(allStandings);
      }
  } catch (err) {
    console.log('-- Error Loading Person Standings From Datastore --', err);
  }
}

const loadStandingsPeople = async (setStandingsPeople, oldStandingsPeople, eventId) => {
  try {
    const allStandings = await API.graphql({ query: listStandingsPeople, variables: { limit: 999999999, filter: {
      standingsPeopleEventsId: { eq: eventId }
    } } });

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
    console.log('-- Error Loading Person Standings, Will Try Datastore --', err);
    loadStandingsPeopleFromDatastore(setStandingsPeople, oldStandingsPeople, eventId);
  }
}

export default loadStandingsPeople;