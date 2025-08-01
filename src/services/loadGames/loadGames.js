import { API } from "aws-amplify";
import { listGames } from '../../graphql/queries'


const loadGames = async (setGames, oldGames) => {
  try {
    const allGames = await API.graphql({ query: listGames, variables: { limit: 999999999 } });

    const unfilteredItems = allGames?.data?.listGames?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => a.name.localeCompare(b.name));
      if(JSON.stringify(items) !== JSON.stringify(oldGames)) {
        setGames(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Games --', err);
    setGames([]);
  }
};

export default loadGames;