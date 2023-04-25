import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Predicates, SortDirection } from "aws-amplify";
import { Posts, Reactions } from "../../models";
import { ActivityIndicator, Divider } from "../../components";
import { AuthContext } from "../../contexts";
import { IntroModal, AddPostListHeader } from "../../containers";
import { DataStore } from "../../utils";
import { PostPreview } from "../../containers";
import styles from "./MostLikedPostsScreenStyles";

const MostLikedPostsScreen = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [reactions, setReactions] = useState([]); 
  const [dataLoading, setDataLoading] = useState(true);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

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
    const postSubscription = DataStore.observeQuery(Posts).subscribe(({ items }) => {
      try {
        // await DataStore.stop();
        const formattedPosts = items.map((post) => {
          const obj = Object.assign({}, post);
          const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
            return JSON.parse(image);
          }) : undefined;
          obj.images = images;
          return obj;
        });
        setAllPosts(formattedPosts);
        setDataLoading(false);
      } catch (err) {
        console.log("error fetching Data", err);
      }
    });

    const reactionsSubscription = DataStore.observeQuery(Reactions).subscribe(({ items }) => {
      try {
        setReactions(items);
      } catch (err) {
        console.log("error fetching Data", err);
      }
    });

    return () => {
      postSubscription.unsubscribe();
      reactionsSubscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <IntroModal />
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
          />
        )}
      </View>
    </>
  );
};

export default MostLikedPostsScreen;
