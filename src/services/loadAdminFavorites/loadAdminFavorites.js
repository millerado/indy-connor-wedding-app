import { API } from "aws-amplify";
import { listAdminFavorites } from '../../graphql/queries';

const formatAdminFavorites = async (items, oldAdminFavorites, setAdminFavorites) => {
  const newFavorites = items.map((favorite) => {
    const img = JSON.parse(favorite.image);
    return {
      id: favorite.id,
      _version: favorite._version,
      eventsID: favorite.eventsID,
      url: img.url,
      width: img.width,
      height: img.height,
    };
  });

  if(JSON.stringify(newFavorites) !== JSON.stringify(oldAdminFavorites)) {
    setAdminFavorites(newFavorites);
  }
};

const loadAdminFavorites = async (setAdminFavorites, oldAdminFavorites, eventId) => {
  try {
    const allAdminFavorites = await API.graphql({ query: listAdminFavorites, variables: { limit: 999999999, filter: {
      eventsID: { eq: eventId }
    } } });
    // const allAdminFavorites = await API.graphql({ query: listAdminFavorites, variables: { limit: 999999999 } });

    const unfilteredItems = allAdminFavorites?.data?.listAdminFavorites?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    formatAdminFavorites(items, oldAdminFavorites, setAdminFavorites);
  } catch (err) {
    console.log('-- Error Loading Admin Favorites, try Datastore --', err);
    formatAdminFavorites([], oldAdminFavorites, setAdminFavorites);
    // loadAdminFavoritesFromDatastore(setAdminFavorites, oldAdminFavorites, eventId);
  }
};

export default loadAdminFavorites