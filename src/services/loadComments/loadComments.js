import { API } from "aws-amplify";
import { listComments } from '../../graphql/queries'
import { Comments } from "../../models";
import { DataStore } from "../../utils";

const loadCommentsFromDatastore = async (setComments, postsID, oldComments) => {
  try {
    if(postsID) {
      const comments = await DataStore.query(Comments, c => c.postsID.eq(postsID));
      comments.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
      if(JSON.stringify(comments) !== JSON.stringify(oldComments)) {
        setComments(comments);
      }
    } else {
      const comments = await DataStore.query(Comments);
      comments.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1);
      if(JSON.stringify(comments) !== JSON.stringify(oldComments)) {
        setComments(comments);
      }
    }
  } catch (err) {
    console.log('-- Error Loading Comments Via Datastore --', err);
  }
}

const loadComments = async (setComments, postsID, oldComments) => {
  try {
    let variables = { limit: 999999999 };
    if(postsID) {
      variables = { ...variables, filter: { postsID: { eq: postsID } } };
    }
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
    loadCommentsFromDatastore(setComments, postsID, oldComments);
  }
};

export default loadComments