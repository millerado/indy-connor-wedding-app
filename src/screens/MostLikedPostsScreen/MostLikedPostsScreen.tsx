import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { ActivityIndicator, Divider } from "../../components";
import { AuthContext, DataContext } from "../../contexts";
import { AddPostListHeader } from "../../containers";
import { PostPreview } from "../../containers";
import styles from "./MostLikedPostsScreenStyles";

const MostLikedPostsScreen = () => {
  const [sortedPosts, setSortedPosts] = useState([]);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;
  const { refreshData, selectedEventId, allUsers, allComments, allAdminFavorites, allReactions, allPosts } = useContext(DataContext);

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
    return <Divider height={5} margin={0} />;
  }, []);

  const onRefresh = async () => {
    refreshData(selectedEventId);
  }

  useEffect(() => {
    // Get count of Reaction for each post
    const formattedPosts = allPosts.map((post) => {
      const obj = Object.assign({}, post);
      const reactionCount = allReactions.filter((reaction) => reaction.postsID === post.id).length;
      obj.reactionCount = reactionCount;
      return obj;
    });
    // Sort posts by reaction count
    const sorted = formattedPosts.sort((a, b) => b.reactionCount - a.reactionCount);
    const filtered = sorted.filter((post) => post.images?.length > 0);
    setSortedPosts(filtered);
  }, [allReactions, allPosts]);

  return (
    <View style={ss.pageWrapper}>
      {sortedPosts.length === 0 ? (
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
  );
};

export default MostLikedPostsScreen;
