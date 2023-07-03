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
import { Posts } from "../../models";
import { ActivityIndicator, Divider } from "../../components";
import { AuthContext } from "../../contexts";
import { IntroModal, AddPostListHeader } from "../../containers";
import { DataStore } from "../../utils";
import { PostPreview } from "../../containers";
import styles from "./HomeScreenStyles";

import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import * as subscriptions from '../../graphql/subscriptions';
import * as queries from '../../graphql/queries'
import { ListPostsQuery } from '../../API';

const HomeScreen = () => {
  const [allPosts, setAllPosts] = useState([]);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authContext = useContext(AuthContext);
  const { authStatus } = authContext;

  const formatPostItems = (items) => {
    if(items.length > 0) {
      const formattedPosts = items.map((post) => {
        const obj = Object.assign({}, post);
        const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
          return JSON.parse(image);
        }) : undefined;
        obj.images = images;
        return obj;
      });
      return formattedPosts;
    }
    return [];
  }

  // Backup function that gets called if you're offline
  const loadPostsFromDatastore = async () => {
    try {
      const posts = await DataStore.query(Posts, Predicates.ALL, {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      });
      const formattedPosts = formatPostItems(posts);
      setAllPosts(formattedPosts);

    } catch (err) {
      console.log('-- Error Loading Posts Via Datastore --', err);
    }
  }

  const loadPosts = async () => {
    try {
      const allUsers = await API.graphql<GraphQLQuery<ListPostsQuery>>(
        { query: queries.listPosts }
      );

      const items = allUsers?.data?.listPosts?.items;
      if(items.length > 0) {
        items.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        const formattedPosts = formatPostItems(items);
        setAllPosts(formattedPosts);
      }
    } catch (err) {
      console.log('-- Error Loading Posts, Will Try Datastore --', err);
      loadPostsFromDatastore();
    }
  };

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
    return <Divider />;
  }, []);

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={ss.pageActivityIndicatorWrapper}>
        <ActivityIndicator size={60} />
      </View>
    );
  }, [ss]);

  const onRefresh = () => {
    loadPosts();
  }

  // Sample with a filter
  // graphqlOperation(subscriptions.onCreatePosts, {filter: {postsID: {eq: "876f0317-ec70-4cbf-93fc-ef634a9fcb26"}}})
  useEffect(() => {
    const createSub = API.graphql(
      graphqlOperation(subscriptions.onCreatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts(),
    });
    
    const updateSub = API.graphql(
      graphqlOperation(subscriptions.onUpdatePosts)
    ).subscribe({
      next: ({ value }) => loadPosts()
    });
    
    const deleteSub = API.graphql(
      graphqlOperation(subscriptions.onDeletePosts)
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
    <>
      <IntroModal />
      <View style={ss.pageWrapper}>
        <FlatList
          data={allPosts}
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
    </>
  );
};

export default HomeScreen;
