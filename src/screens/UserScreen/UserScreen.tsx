import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, FlatList, Platform } from "react-native";
import { SortDirection } from "aws-amplify";
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

  const loadPosts = async (items) => {
    try {
      const formattedPosts = items.map((post) => {
        const obj = Object.assign({}, post);
        const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
          return JSON.parse(image);
        }) : undefined;
        obj.images = images;
        return obj;
      });
      if (formattedPosts !== allPosts) {
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
    const postSubscription = DataStore.observeQuery(
      Posts,
      (p) => p.userId.eq(userId),
      { sort: (s) => s.createdAt(SortDirection.DESCENDING) }
    ).subscribe(({ items }) => {
      loadPosts(items);
    });

    return () => {
      postSubscription.unsubscribe();
    };
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
