import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, Platform } from "react-native";
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
import { useTheme } from "react-native-paper";
import { Posts } from "../../models";
import { Divider, ActivityIndicator } from "../../components";
import { PostPreview } from '../../containers';
import { DataStore } from "../../utils";
import { loadPosts, loadUsers, loadAdminFavorites, loadComments, loadReactions } from "../../services";
import UserScreenHeader from "./UserScreenHeader";
import styles from "./UserScreenStyles";

const UserScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { userId, name, picture } = route.params;
  // console.log("-- Nav props --", userId, name, picture);
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allAdminFavorites, setAllAdminFavorites] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);

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
      formattedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (JSON.stringify(allPosts) !== JSON.stringify(formattedPosts)) {
        setAllPosts(formattedPosts);
      }
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
    if(userId) {
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
  }

  const renderItem = useCallback(({ item }) => {
    const postComments = allComments.filter((comment) => comment.postsID === item.id);
    const postReactions = allReactions.filter((reaction) => reaction.postsID === item.id);

    return (
      <PostPreview
        post={item}
        previewMode
        allUsers={allUsers}
        allAdminFavorites={allAdminFavorites}
        comments={postComments}
        reactions={postReactions}
      />
    );
  }, [allUsers, allAdminFavorites, allComments, allReactions]);

  const listHeader = useCallback(() => {
    return (
      <UserScreenHeader
        name={name}
        picture={picture}
        hasPosted={allPosts.length > 0}
        userId={userId}
      />
    );
  }, [name, picture, userId, allPosts.length]);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider height={5} margin={0} />;
  }, []);

  const onRefresh = async () => {
    loadPosts();
    loadUsers(setAllUsers, allUsers);
    loadAdminFavorites(setAllAdminFavorites, allAdminFavorites);
    loadComments(setAllComments, undefined, allComments);
    loadReactions(setAllReactions, undefined, allReactions);
  }

  useEffect(() => {
    if(userId) {
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
        graphqlOperation(onCreateComments)
      ).subscribe({
        next: ({ value }) => loadComments(setAllComments, undefined, allComments),
      });

      const commentUpdateSub = API.graphql(
        graphqlOperation(onUpdateComments)
      ).subscribe({
        next: ({ value }) => loadComments(setAllComments, undefined, allComments)
      });

      const commentDeleteSub = API.graphql(
        graphqlOperation(onDeleteComments)
      ).subscribe({
        next: ({ value }) => loadComments(setAllComments, undefined, allComments)
      });

      const reactionsCreateSub = API.graphql(
        graphqlOperation(onCreateReactions)
      ).subscribe({
        next: ({ value }) => loadReactions(setAllReactions, undefined, allReactions),
      });

      const reactionsUpdateSub = API.graphql(
        graphqlOperation(onUpdateReactions)
      ).subscribe({
        next: ({ value }) => loadReactions(setAllReactions, undefined, allReactions)
      });

      const reactionsDeleteSub = API.graphql(
        graphqlOperation(onDeleteReactions)
      ).subscribe({
        next: ({ value }) => loadReactions(setAllReactions, undefined, allReactions)
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
    }
  }, [userId]);

  return (
    <View style={ss.pageWrapper}>
      {dataLoading && (allPosts.length === 0 || allUsers.length === 0) ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
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
