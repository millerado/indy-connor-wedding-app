import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { View, FlatList, Platform } from "react-native";
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
import { ActivityIndicator, Divider } from "../../components";
import { AuthContext } from "../../contexts";
import { AddPostListHeader } from "../../containers";
import { PostPreview } from "../../containers";
import { loadPosts, loadUsers, loadAdminFavorites, loadComments, loadReactions } from "../../services";
import styles from "./HomeScreenStyles";

const HomeScreen = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allAdminFavorites, setAllAdminFavorites] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const priorConnectionState = useRef(undefined);

  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

  // Hub.listen("api", (data: any) => {
  //   const { payload } = data;
  //   if ( payload.event === CONNECTION_STATE_CHANGE ) {
  //     if (priorConnectionState.current === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
  //       console.log('-- Hub Thinks Reconnected --');
  //       onRefresh();
  //     }
  //     priorConnectionState.current = payload.data.connectionState;
  //   }
  // });

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
    return <AddPostListHeader />;
  }, [authStatus]);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider />;
  }, []);

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={ss.pageActivityIndicatorWrapper}>
        <ActivityIndicator size={60} />
      </View>
    );
  }, [ss]);

  const onRefresh = async () => {
    loadPosts(setAllPosts, allPosts);
    loadUsers(setAllUsers, allUsers);
    loadAdminFavorites(setAllAdminFavorites, allAdminFavorites);
    loadComments(setAllComments, undefined, allComments);
    loadReactions(setAllReactions, undefined, allReactions);
  }

  useEffect(() => {
    const postCreateSub = API.graphql(
      graphqlOperation(onCreatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(setAllPosts, allPosts),
    });
    
    const postUpdateSub = API.graphql(
      graphqlOperation(onUpdatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(setAllPosts, allPosts)
    });
    
    const postDeleteSub = API.graphql(
      graphqlOperation(onDeletePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(setAllPosts, allPosts)
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
  }, []);

  return (
    <View style={ss.pageWrapper}>
      <FlatList
        data={allUsers.length > 0 ? allPosts : []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={listItemSeparator}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={listHeader}
        removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
        maxToRenderPerBatch={10} // Also the default
        initialNumToRender={10} // Also the default
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{ width: '100%' }}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={listEmptyComponent}  
        onRefresh={onRefresh}
        refreshing={false}
      />
    </View>
  );
};

export default HomeScreen;
