import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, Platform } from "react-native";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreatePosts, onUpdatePosts, onDeletePosts } from '../../graphql/subscriptions';
import { listPosts } from '../../graphql/queries';
import { useTheme } from "react-native-paper";
import { Posts } from "../../models";
import { Divider, ActivityIndicator } from "../../components";
import { PostPreview } from '../../containers';
import { DataStore } from "../../utils";
import UserScreenHeader from "./UserScreenHeader";
import styles from "./UserScreenStyles";

const UserScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { userId, name, picture } = route.params;
  // console.log("-- Nav props --", userId, name, picture);
  const [allPosts, setAllPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);

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
      formattedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllPosts(formattedPosts);
      if (dataLoading) {
        setDataLoading(false);
      }
      // console.log('-- postsData --', postsData);
    } catch (err) {
      console.log("error fetching Contents", err);
    }
  };

  const loadPostsFromDatastore = async () => {
    try {
      const allPosts = await DataStore.query(Posts, p => p.usersInPost.contains(userId));
      if(allPosts.length > 0) {
        formatPosts(allPosts);
      }
    } catch (err) {
      console.log('-- Error Loading User Posts --', err);
    }
  }

  const graphVariables = { filter: { usersInPost: {contains: userId} }, limit: 999999999 };

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
      console.log('-- Error Loading User Posts, Try with Datastore --', err);
      loadPostsFromDatastore();
    }
  }

  const renderItem = useCallback(({ item }) => {
    return (
      <PostPreview
        post={item}
        previewMode
      />
    )
  }, [allPosts]);

  const listHeader = useCallback(() => {
    return (
      <UserScreenHeader
        name={name}
        picture={picture}
        hasPosted={allPosts.length > 0}
        userId={userId}
      />
    );
  }, [name, picture, userId, allPosts]);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider height={5} margin={0} />;
  }, []);

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
      {dataLoading ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <FlatList
          data={allPosts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={listItemSeparator}
          ListHeaderComponent={listHeader}
          removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      )}
    </View>
  );
};

export default UserScreen;
