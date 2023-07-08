import { API } from "aws-amplify";
import { listExpoTokens } from '../../graphql/queries'
import { ExpoTokens } from "../../models";
import { DataStore } from "../../utils";

const loadExpoTokensFromDatastore = async (setExpoTokens, oldExpoTokens) => {
  try {
    const allExpoTokens = await DataStore.query(ExpoTokens);
    allExpoTokens.sort((a, b) => (a.token > b.token) ? 1 : -1);
    if(JSON.stringify(allExpoTokens) !== JSON.stringify(oldExpoTokens)) {
      setExpoTokens(allExpoTokens);
    }
  } catch (err) {
    console.log('-- Error Loading Tokens Via Datastore --', err);
  }
}

const loadExpoTokens = async (setExpoTokens, oldExpoTokens) => {
  try {
    let variables = { limit: 999999999 };
    const allExpoTokens = await API.graphql({ query: listExpoTokens, variables: variables });

    const unfilteredItems = allExpoTokens?.data?.listExpoTokens?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => (a.token > b.token) ? 1 : -1);
      if(JSON.stringify(items) !== JSON.stringify(oldExpoTokens)) {
        setExpoTokens(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Tokens, Try Datastore --', err);
    loadExpoTokensFromDatastore(setExpoTokens, oldExpoTokens);
  }
};

export default loadExpoTokens;