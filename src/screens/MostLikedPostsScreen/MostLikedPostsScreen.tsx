import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Predicates, SortDirection, API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreatePosts, onUpdatePosts, onDeletePosts, onCreateReactions, onUpdateReactions, onDeleteReactions } from "../../graphql/subscriptions";
import { listPosts, listReactions } from '../../graphql/queries'
import { Posts, Reactions } from "../../models";
import { ActivityIndicator, Divider } from "../../components";
import { AuthContext } from "../../contexts";
import {  AddPostListHeader } from "../../containers";
import { DataStore } from "../../utils";
import { PostPreview } from "../../containers";
import styles from "./MostLikedPostsScreenStyles";

const MostLikedPostsScreen = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [reactions, setReactions] = useState([]); 
  const [dataLoading, setDataLoading] = useState(true);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        loadPosts();
        loadReactions();
      }
      setPriorConnectionState(payload.data.connectionState);
    }
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <PostPreview
        post={item}
        previewMode
      />
    );
  }, []);

  const listHeader = useCallback(() => {
    return <AddPostListHeader />;
  }, [authStatus]);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider height={5} margin={0} />;
  }, []);

  const onRefresh = () => {
    loadPosts();
    loadReactions();
  }

  const formatPostItems = (items) => {
    if(items.length > 0) {
      const formattedPosts = items.map((post) => {
        const obj = Object.assign({}, post);
        const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
          return JSON.parse(image);
        }) : undefined;
        obj.images = images;
        return obj;
      });
      return formattedPosts;
    }
    return [];
  }

  // Backup function that gets called if you're offline
  const loadPostsFromDatastore = async () => {
    try {
      const posts = await DataStore.query(Posts);
      const formattedPosts = formatPostItems(posts);
      setAllPosts(formattedPosts);
      setDataLoading(false);

    } catch (err) {
      console.log('-- Error Loading Posts Via Datastore --', err);
    }
  }

  const loadPosts = async () => {
    try {
      const allPosts = await API.graphql({ query: listPosts, variables: { limit: 999999999 } });

      const unfilteredItems = allPosts?.data?.listPosts?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        const formattedPosts = formatPostItems(items);
        setAllPosts(formattedPosts);
        setDataLoading(false);
      }
    } catch (err) {
      console.log('-- Error Loading Posts, Will Try Datastore --', err);
      loadPostsFromDatastore();
    }
  };

  const loadReactionsFromDatastore = async () => {
    try {
      const reactions = await DataStore.query(Reactions);
      if(reactions.length > 0) {
        setReactions(reactions);
      }
    } catch (err) {
      console.log('-- Error Loading Reactions Via Datastore --', err);
    }
  }

  const loadReactions = async () => {
    try {
      const allReactions = await API.graphql({ query: listReactions, variables: { limit: 999999999 } });

      const unfilteredItems = allReactions?.data?.listReactions?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        setReactions(items);
      }
    } catch (err) {
      console.log('-- Error Loading Reactions, Will Try Datastore --', err);
      loadReactionsFromDatastore();
    }
  };

  useEffect(() => {
    // Get count of Reaction for each post
    const formattedPosts = allPosts.map((post) => {
      const obj = Object.assign({}, post);
      const reactionCount = reactions.filter((reaction) => reaction.postsID === post.id).length;
      obj.reactionCount = reactionCount;
      return obj;
    });
    // Sort posts by reaction count
    const sorted = formattedPosts.sort((a, b) => b.reactionCount - a.reactionCount);
    setSortedPosts(sorted);
  }, [reactions, allPosts]);

  useEffect(() => {
    const createSub = API.graphql(
      graphqlOperation(onCreatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(),
    });
    
    const updateSub = API.graphql(
      graphqlOperation(onUpdatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });
    
    const deleteSub = API.graphql(
      graphqlOperation(onDeletePosts)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });

    const createReactionSub = API.graphql(
      graphqlOperation(onCreateReactions)
    ).subscribe({
      next: ({ value }) => loadReactions(),
    });

    const updateReactionSub = API.graphql(
      graphqlOperation(onUpdateReactions)
    ).subscribe({
      next: ({ value }) => loadReactions()
    });

    const deleteReactionSub = API.graphql(
      graphqlOperation(onDeleteReactions)
    ).subscribe({
      next: ({ value }) => loadReactions()
    });

    loadPosts();
    loadReactions();

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
      createReactionSub.unsubscribe();
      updateReactionSub.unsubscribe();
      deleteReactionSub.unsubscribe();
    }
  }, []);

  return (
    <>
      <View style={ss.pageWrapper}>
        {dataLoading || allPosts.length === 0 ? (
          <View style={ss.pageActivityIndicatorWrapper}>
            <ActivityIndicator size={60} />
          </View>
        ) : (
          <FlatList
            data={sortedPosts}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={listItemSeparator}
            ListHeaderComponent={listHeader}
            removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
            maxToRenderPerBatch={10} // Also the default
            initialNumToRender={10} // Also the default
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            style={{ width: '100%' }}
            onRefresh={onRefresh}
            refreshing={false}
          />
        )}
      </View>
    </>
  );
};

export default MostLikedPostsScreen;
