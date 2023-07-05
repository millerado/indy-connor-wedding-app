import { API } from "aws-amplify";
import { listUsers } from '../../graphql/queries'
import { Users } from "../../models";
import { DataStore } from "../../utils";

const formatUsers = async (items, setUsers, oldUsers) => {
  const newUsers = items.map((u) => {
    return {
      id: u.id,
      name: u.name,
      image: u.image ? JSON.parse(u.image) : undefined,
    };
  });
  if(JSON.stringify(newUsers) !== JSON.stringify(oldUsers)) {
    setUsers(newUsers);
  }
};

const loadUsersFromDatastore = async (setUsers, oldUsers) => {
  try {
    const users = await DataStore.query(Users);
    formatUsers(users, setUsers, oldUsers);
  } catch (err) {
    console.log('-- Error Loading Users Via Datastore --', err);
  }
}

const loadUsers = async (setUsers, oldUsers) => {
  try {
    const allUsers = await API.graphql({ query: listUsers, variables: { limit: 999999999 } });

    const unfilteredItems = allUsers?.data?.listUsers?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      formatUsers(items, setUsers, oldUsers);
    }
  } catch (err) {
    console.log('-- Error Loading Users, Trying Datastore --', err);
    loadUsersFromDatastore(setUsers, oldUsers);
  }
};

export default loadUsers