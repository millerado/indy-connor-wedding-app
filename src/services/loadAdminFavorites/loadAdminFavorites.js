import { API } from "aws-amplify";
import { listAdminFavorites } from '../../graphql/queries'
import { AdminFavorites } from "../../models";
import { DataStore } from "../../utils";

const formatAdminFavorites = async (items, oldAdminFavorites, setAdminFavorites) => {
  const newFavorites = items.map((favorite) => {
    const img = JSON.parse(favorite.image);
    return {
      id: favorite.id,
      url: img.url,
    };
  });

  if(JSON.stringify(newFavorites) !== JSON.stringify(oldAdminFavorites)) {
    setAdminFavorites(newFavorites);
  }
};

const loadAdminFavoritesFromDatastore = async (setAdminFavorites, oldAdminFavorites) => {
  try {
    const adminFavorites = await DataStore.query(AdminFavorites);
    formatAdminFavorites(adminFavorites, oldAdminFavorites, setAdminFavorites);
  } catch (err) {
    console.log('-- Error Loading Admin Favorites Via Datastore --', err);
  }
}

const loadAdminFavorites = async (setAdminFavorites, oldAdminFavorites) => {
  try {
    const allAdminFavorites = await API.graphql({ query: listAdminFavorites, variables: { limit: 999999999 } });

    const unfilteredItems = allAdminFavorites?.data?.listAdminFavorites?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    formatAdminFavorites(items, oldAdminFavorites, setAdminFavorites);
  } catch (err) {
    console.log('-- Error Loading Admin Favorites, try Datastore --', err);
    loadAdminFavoritesFromDatastore(setAdminFavorites, oldAdminFavorites);
  }
};

export default loadAdminFavorites