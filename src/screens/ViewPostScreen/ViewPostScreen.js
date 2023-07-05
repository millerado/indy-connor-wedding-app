import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { 
  onCreatePosts, onUpdatePosts, onDeletePosts,
  onCreateUsers, onUpdateUsers, onDeleteUsers,
  onCreateAdminFavorites, onUpdateAdminFavorites, onDeleteAdminFavorites,
  onCreateComments, onUpdateComments, onDeleteComments,
  onCreateReactions, onUpdateReactions, onDeleteReactions,
} from "../../graphql/subscriptions";
import { listPosts } from '../../graphql/queries';
import { PostPreview } from "../../containers";
import { Posts } from "../../models";
import { DataStore } from "../../utils";
import { ActivityIndicator } from "../../components";
import { loadUsers, loadAdminFavorites, loadComments, loadReactions } from "../../services";
import styles from "./ViewPostScreenStyles";

const ViewPostScreen = ({ navigation, route }) => {
  // console.log('-- Route Params --', route.params);
  const { postsID, post: initialPost } = route.params;
  const [post, setPost] = useState(initialPost || undefined);
  const [allUsers, setAllUsers] = useState([]);
  const [allAdminFavorites, setAllAdminFavorites] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  // Hub.listen("api", (data: any) => {
  //   const { payload } = data;
  //   if ( payload.event === CONNECTION_STATE_CHANGE ) {
  //     if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
  //       loadPosts();
  //     }
  //     setPriorConnectionState(payload.data.connectionState);
  //   }
  // });

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
        if(JSON.stringify(formattedPosts[0]) !== JSON.stringify(post)){
          setPost(formattedPosts[0]);
        }
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
  const subFilterVariables = { filter: { postsID: {eq: postsID} } };

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

  const onRefresh = async () => {
    loadPosts();
    loadUsers(setAllUsers, allUsers);
    loadAdminFavorites(setAllAdminFavorites, allAdminFavorites);
    loadComments(setAllComments, postsID, allComments);
    loadReactions(setAllReactions, postsID, allReactions);
  }

  useEffect(() => {
    const postCreateSub = API.graphql(
      graphqlOperation(onCreatePosts, graphVariables)
    ).subscribe({
      next: ({ value }) => loadPosts(),
    });
    
    const postUpdateSub = API.graphql(
      graphqlOperation(onUpdatePosts, graphVariables)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });
    
    const postDeleteSub = API.graphql(
      graphqlOperation(onDeletePosts, graphVariables)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });

    const userCreateSub = API.graphql(
      graphqlOperation(onCreateUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(setAllUsers, allUsers),
    });

    const userUpdateSub = API.graphql(
      graphqlOperation(onUpdateUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(setAllUsers, allUsers)
    });

    const userDeleteSub = API.graphql(
      graphqlOperation(onDeleteUsers)
    ).subscribe({
      next: ({ value }) => loadUsers(setAllUsers, allUsers)
    });

    const adminFavoriteCreateSub = API.graphql(
      graphqlOperation(onCreateAdminFavorites)
    ).subscribe({
      next: ({ value }) => loadAdminFavorites(setAllAdminFavorites, allAdminFavorites),
    });

    const adminFavoriteUpdateSub = API.graphql(
      graphqlOperation(onUpdateAdminFavorites)
    ).subscribe({
      next: ({ value }) => loadAdminFavorites(setAllAdminFavorites, allAdminFavorites)
    });

    const adminFavoriteDeleteSub = API.graphql(
      graphqlOperation(onDeleteAdminFavorites)
    ).subscribe({
      next: ({ value }) => loadAdminFavorites(setAllAdminFavorites, allAdminFavorites)
    });

    const commentCreateSub = API.graphql(
      graphqlOperation(onCreateComments, subFilterVariables)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, postsID, allComments),
    });

    const commentUpdateSub = API.graphql(
      graphqlOperation(onUpdateComments, subFilterVariables)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, postsID, allComments)
    });

    const commentDeleteSub = API.graphql(
      graphqlOperation(onDeleteComments, subFilterVariables)
    ).subscribe({
      next: ({ value }) => loadComments(setAllComments, postsID, allComments)
    });

    const reactionsCreateSub = API.graphql(
      graphqlOperation(onCreateReactions, subFilterVariables)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, postsID, allReactions),
    });

    const reactionsUpdateSub = API.graphql(
      graphqlOperation(onUpdateReactions, subFilterVariables)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, postsID, allReactions)
    });

    const reactionsDeleteSub = API.graphql(
      graphqlOperation(onDeleteReactions, subFilterVariables)
    ).subscribe({
      next: ({ value }) => loadReactions(setAllReactions, postsID, allReactions)
    });

    onRefresh();

    return () => {
      postCreateSub.unsubscribe();
      postUpdateSub.unsubscribe();
      postDeleteSub.unsubscribe();
      userCreateSub.unsubscribe();
      userUpdateSub.unsubscribe();
      userDeleteSub.unsubscribe();
      adminFavoriteCreateSub.unsubscribe();
      adminFavoriteUpdateSub.unsubscribe();
      adminFavoriteDeleteSub.unsubscribe();
      commentCreateSub.unsubscribe();
      commentUpdateSub.unsubscribe();
      commentDeleteSub.unsubscribe();
      reactionsCreateSub.unsubscribe();
      reactionsUpdateSub.unsubscribe();
      reactionsDeleteSub.unsubscribe();
    }
  }, [postsID]);

  return (
    <View style={ss.pageWrapper}>
      {post ? (
        <ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
          <PostPreview
            post={post}
            previewMode={false}
            allUsers={allUsers}
            allAdminFavorites={allAdminFavorites}
            comments={allComments}
            reactions={allReactions}
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
