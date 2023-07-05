import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Divider, ActivityIndicator } from "../../components";
import { PostPreview } from '../../containers';
import { DataContext } from "../../contexts";
import UserScreenHeader from "./UserScreenHeader";
import styles from "./UserScreenStyles";

const UserScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { userId, name, picture } = route.params;
  const [displayPosts, setDisplayPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const { refreshData, allPosts, allUsers, allAdminFavorites, allComments, allReactions } = useContext(DataContext);

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
    try {
      refreshData();
    } catch (err) {
      console.log('-- Error refreshing --', err);
    }
  }

  useEffect(() => {
    if(userId && allPosts.length > 0) {
      // Filter allPosts to posts where userId is in the array of usersInPost
      const filteredPosts = allPosts.filter((post) => post.usersInPost.includes(userId));
      if(JSON.stringify(filteredPosts) !== JSON.stringify(displayPosts)) {
        setDisplayPosts(filteredPosts);
      }
      setDataLoading(false);
    }

  }, [allPosts, userId])

  return (
    <View style={ss.pageWrapper}>
      {dataLoading || allUsers.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={displayPosts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={listItemSeparator}
          ListHeaderComponent={listHeader}
          removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onRefresh={onRefresh}
          refreshing={false}
        />
      )}
    </View>
  );
};

export default UserScreen;
