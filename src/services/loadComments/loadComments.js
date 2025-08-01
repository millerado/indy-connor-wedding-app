import { API } from "aws-amplify";
import { listComments } from '../../graphql/queries'

const loadComments = async (setComments, oldComments, eventId) => {
  try {
    let variables = { limit: 999999999, filter: {
      eventsID: { eq: eventId }
    } };
    // let variables = { limit: 999999999 };
    const allComments = await API.graphql({ query: listComments, variables: variables });

    const unfilteredItems = allComments?.data?.listComments?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
      if(JSON.stringify(items) !== JSON.stringify(oldComments)) {
        setComments(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Comments, Try Datastore --', err);
    setComments([]);
    // loadCommentsFromDatastore(setComments, oldComments, eventId);
  }
};

export default loadComments