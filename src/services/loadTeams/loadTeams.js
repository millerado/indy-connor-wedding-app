import { API } from "aws-amplify";
import { listTeams } from '../../graphql/queries'
import { DataStore } from '../../utils';
import { Teams } from '../../models';

const loadTeamsFromDatastore = async (setTeams, oldTeams) => {
  try {
    const items = await DataStore.query(Teams);
    if(items.length > 0){
      if(JSON.stringify(items) !== JSON.stringify(oldTeams)) {
        setTeams(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Teams From Datastore --', err);
  }
};

const loadTeams = async (setTeams, oldTeams) => {
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
    console.log('-- Error Loading Teams, Will Try Datastore --', err);
    loadTeamsFromDatastore(setTeams, oldTeams);
  }
};

export default loadTeams;