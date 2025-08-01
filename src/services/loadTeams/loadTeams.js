import { API } from "aws-amplify";
import { listTeams } from '../../graphql/queries';

const loadTeams = async (setTeams, oldTeams, eventId) => {
  try {
    const allTeams = await API.graphql({ query: listTeams, variables: { limit: 999999999 } });

    const unfilteredItems = allTeams?.data?.listTeams?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      if(JSON.stringify(items) !== JSON.stringify(oldTeams)) {
        setTeams(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Teams --', err);
    setTeams([]);
  }
};

export default loadTeams;