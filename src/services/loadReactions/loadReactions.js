import { API } from "aws-amplify";
import { listReactions } from '../../graphql/queries'
import { Reactions } from "../../models";
import { DataStore } from "../../utils";

  const formatReactions = async (items) => {
    if (items) {
      // Create  reactionSet of unique postsID, userId, reactionType from items

      const reactionsSet = new Set();
      items.forEach((item) => {
        const key = `${item.postsID}|${item.userId}|${item.reactionType}`;
        reactionsSet.add(key);
      });

      // Create array of unique postsID, userId, reactionType from reactionSet 
      const reactionsArray = Array.from(reactionsSet);

      // Create array of unique postsID, userId, reactionType from reactionSet
      const uniqueReactions = reactionsArray.map((reaction) => {
        const [postsID, userId, reactionType] = reaction.split("|");
        const reactionObject = {
          postsID: postsID,
          userId: userId,
          reactionType: reactionType,
        };
        return reactionObject;
      });

      return uniqueReactions;
    }
    return [];
  }

  const loadReactionsFromDatastore = async (setReactions, oldReactions) => {
    try {
      const reactions = await DataStore.query(Reactions);
      const formattedReactions = await formatReactions(reactions);
      if(JSON.stringify(formattedReactions) !== JSON.stringify(oldReactions)) {
        setReactions(formattedReactions);
      }
    } catch (err) {
      console.log('-- Error Loading Reactions Via Datastore --', err);
    }
  }

  const loadReactions = async (setReactions, oldReactions) => {
    try {
      const variables = { limit: 999999999 };
      const allReactions = await API.graphql({ query: listReactions, variables: variables });

      const unfilteredItems = allReactions?.data?.listReactions?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      const formattedReactions = await formatReactions(items);
      if(formattedReactions.length > 0) {
        if(JSON.stringify(formattedReactions) !== JSON.stringify(oldReactions)) {
          setReactions(formattedReactions);
        }
      }
    } catch (err) {
      console.log('-- Error Loading Reactions, Trying Datastore --', err);
      loadReactionsFromDatastore(setReactions, oldReactions);
    }
  };

export default loadReactions;