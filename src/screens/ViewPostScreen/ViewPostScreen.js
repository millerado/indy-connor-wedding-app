import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreatePosts, onUpdatePosts, onDeletePosts } from '../../graphql/subscriptions';
import { listPosts } from '../../graphql/queries';
import { PostPreview } from "../../containers";
import { Posts } from "../../models";
import { DataStore } from "../../utils";
import { ActivityIndicator } from "../../components";
import styles from "./ViewPostScreenStyles";

const ViewPostScreen = ({ navigation, route }) => {
  // console.log('-- Route Params --', route.params);
  const { postsID, post: initialPost, postUser: initialPostUser, reactions: initialReactions, comments: initialComments } = route.params;
  const [post, setPost] = useState(initialPost || undefined);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        loadPosts();
      }
      setPriorConnectionState(payload.data.connectionState);
    }
  });

  const formatPosts = async (items) => {
    try {
      const formattedPosts = items.map((post) => {
        const obj = Object.assign({}, post);
        const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
          return JSON.parse(image);
        }) : undefined;
        obj.images = images;
        return obj;
      });
      if (items.length > 0) {
        setPost(formattedPosts[0]);
      }
    } catch (err) {
      console.log("error fetching Contents", err);
    }
  };

  const loadPostsFromDatastore = async () => {
    try {
      const allPosts = await DataStore.query(Posts, p => p.id.eq(postsID));
      if(allPosts.length > 0) {
        formatPosts(allPosts);
      }
    } catch (err) {
      console.log('-- Error Loading Post --', err);
    }
  }

  const graphVariables = { filter: { id: {eq: postsID} }, limit: 999999999 };

  const loadPosts = async () => {
    try {
      const allPosts = await API.graphql({ query: listPosts, variables: graphVariables });

      const unfilteredItems = allPosts?.data?.listPosts?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        formatPosts(items);
      }
    } catch (err) {
      console.log('-- Error Loading Post, Try with Datastore --', err);
      loadPostsFromDatastore();
    }
  }

  useEffect(() => {
    const createSub = API.graphql(
      graphqlOperation(onCreatePosts, graphVariables)
    ).subscribe({
      next: ({ value }) => loadPosts(),
    });
    
    const updateSub = API.graphql(
      graphqlOperation(onUpdatePosts, graphVariables)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });
    
    const deleteSub = API.graphql(
      graphqlOperation(onDeletePosts, graphVariables)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });

    loadPosts();

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    }
  }, []);

  return (
    <View style={ss.pageWrapper}>
      {post ? (
        <ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
          <PostPreview
            post={post}
            previewMode={false}
            postUser={initialPostUser}
            reactions={initialReactions}
            comments={initialComments}
          />
        </ScrollView>
      ) : (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      )}
    </View>
  );
};

export default ViewPostScreen;
