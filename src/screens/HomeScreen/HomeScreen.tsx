import React, {
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Divider } from "../../components";
import { AuthContext, DataContext } from "../../contexts";
import { AddPostListHeader } from "../../containers";
import { PostPreview } from "../../containers";
import styles from "./HomeScreenStyles";

const HomeScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;
  const { refreshData, selectedEventId, allUsers, allComments, allAdminFavorites, allReactions, allPosts, allEvents } = useContext(DataContext);
  // console.log('-- allPosts --', allPosts.length);

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

  useEffect(() => {
    // console.log('-- All Events on Homescreen Length --', allEvents.length);
    // console.log('-- All Events --', allEvents[1]);
    // if(allEvents.length > 0){
    //   console.log(allEvents[1].users[0]);
    // }
  }, [allEvents]);
  // console.log('-- Home Screen All Events --', allEvents.length);

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
    refreshData(selectedEventId);
  }

  return (
    <View style={ss.pageWrapper}>
      {/* <FlashList
        data={allUsers.length > 0 ? allPosts : []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={listItemSeparator}
        StickyHeaderComponent={listHeader}
        // stickyHeaderIndices={[0]}
        ListHeaderComponent={listHeader}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={listEmptyComponent}  
        onRefresh={onRefresh}
        refreshing={false}
        estimatedItemSize={490}
        disableAutoLayout={true}
      /> */}
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

// const functions = {
//   postPictures: true,
//   gameOlympics: true,
//   postComments: true,
//   postReactions: true,
//   adminFavoritePhotos: true,
//   schedule: true,
//   map: true,
//   faq: true,
// }

export default HomeScreen;
