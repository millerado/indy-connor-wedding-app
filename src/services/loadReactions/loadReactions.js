import { API } from "aws-amplify";
import { listReactions } from '../../graphql/queries'
import { Reactions } from "../../models";
import { DataStore } from "../../utils";

  // const formatReactions = async (items) => {
  //   if (items) {
  //     const reactionsSet = new Set();

  //     const newReactions = items.map((reaction) => {
  //       return {
  //         postsID: reaction.postsID,
  //         userId: reaction.userId,
  //         reactionType: reaction.reactionType,
  //       };
  //     }).filter((reaction) => {
  //       if (reactionsSet.has(reaction.userId)) {
  //         return false;
  //       }
  //       reactionsSet.add(reaction.userId);
  //       return true;
  //     });
  //     // console.log("Reactions data", reactionsData);
  //     setAllReactions(newReactions);
  //   }
  // }

  const loadReactionsFromDatastore = async (setReactions, postsID, oldReactions) => {
    try {
      if(postsID) {
        const reactions = await DataStore.query(Reactions, r => r.postsID.eq(postsID));
        if(JSON.stringify(reactions) !== JSON.stringify(oldReactions)) {
          setReactions(reactions);
        }
      } else {
        const reactions = await DataStore.query(Reactions);
        if(JSON.stringify(reactions) !== JSON.stringify(oldReactions)) {
          setReactions(reactions);
        }
      }

    } catch (err) {
      console.log('-- Error Loading Reactions Via Datastore --', err);
    }
  }

  const loadReactions = async (setReactions, postsID, oldReactions) => {
    try {
      variables = { limit: 999999999 };
      if(postsID) {
        variables = { ...variables, filter: { postsID: { eq: postsID } } };
      }
      const allReactions = await API.graphql({ query: listReactions, variables: variables });

      const unfilteredItems = allReactions?.data?.listReactions?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        if(JSON.stringify(items) !== JSON.stringify(oldReactions)) {
          setReactions(items);
        }
      }
    } catch (err) {
      console.log('-- Error Loading Reactions, Trying Datastore --', err);
      loadReactionsFromDatastore(setReactions, postsID, oldReactions);
    }
  };

export default loadReactions;