import { API } from "aws-amplify";
import { listExpoTokens } from '../../graphql/queries';

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
    console.log('-- Error Loading Tokens --', err);
    setExpoTokens([]);
  }
};

export default loadExpoTokens;