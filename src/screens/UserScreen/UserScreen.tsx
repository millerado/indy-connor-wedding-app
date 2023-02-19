import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, Platform } from 'react-native';
import { SortDirection } from 'aws-amplify';
import { useTheme } from 'react-native-paper';
import { Posts } from "../../models";
import { Divider, ActivityIndicator } from '../../components';
// import { PostPreview } from '../../containers';
import { DataStore } from '../../utils';
import UserScreenHeader from './UserScreenHeader';
import styles from './UserScreenStyles';

const UserScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { userId, name, picture } = route.params;
  console.log('-- Nav props --', userId, name, picture);
  const [allPosts, setAllPosts] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      // await DataStore.stop();
      // const postsData = await DataStore.query(Posts, p => p.userId("eq", userId), {
      //   sort: s => s.createdAt(SortDirection.DESCENDING)
      // });
      // const newPosts = postsData.map(post => {
      //   const obj = Object.assign({}, post);
      //   // obj.image = post.image ? JSON.parse(post.image) : undefined;
      //   return obj;
      // });
      // if (newPosts !== allPosts) {
      //   setAllPosts(newPosts);
      // }
      if (dataLoading) {
        setDataLoading(false);
      }
      // console.log('-- postsData --', postsData);
    } catch (err) {
      console.log("error fetching Contents", err);
    }
  };

  const renderItem = useCallback(
    ({ item }) => {
      return null;
      // return (
      //   <PostPreview
      //     post={item}
      //     previewMode
      //   />
      // )
    }
  );

  const listHeader = useCallback(
    () => {
      return (
        <UserScreenHeader name={name} picture={picture} hasPosted={allPosts.length > 0} userId={userId} />
      )
    }
  )

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(
    () => {
      return (
        <Divider height={5} margin={0} />
      )
    }
  )

  useEffect(() => {
    const postSubscription = DataStore.observe(Posts).subscribe((post) => {
      fetchPosts();
    });

    fetchPosts();

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
          removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
          keyboardShouldPersistTaps='handled'
          keyboardDismissMode="on-drag"
        />
      )}
    </View>
  )
}

export default UserScreen;