import React, { useMemo, useEffect, useState, useContext, useCallback } from 'react';
import { View, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { ActivityIndicator, Divider } from '../../components';
import { ImageScroll } from '../../containers';
import { DataContext } from '../../contexts';
import styles from './AdminFavoritesScreenStyles';

const AdminFavoritesScreen = ({ navigation, route }) => {
  const [allImagePosts, setAllImagePosts] = useState([]);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { allAdminFavorites, allPosts } = useContext(DataContext);

  const keyExtractor = useCallback((item) => item.id, []);

  const renderItem = useCallback(({ item }) => {
    if(allImagePosts.length > 0) {
      const imagePost = allImagePosts.find((post) => post.url === item.url);
      console.log('-- Found Post --', imagePost);

      return (
        <ImageScroll
          images={[item]}
          previewMode={true}
          tapDelay={500}
          adminFavorites={allAdminFavorites}
          singleTapHandler={() => imagePost ? 
            navigation.push("View Post", {
              postsID: imagePost.postId,
              // post: post,
            }) :
            console.log('Single Tap')}
          doubleTapHandler={() => console.log('Double Tap')}
        />
      );
    } else {
      return null
    }
  }, [allImagePosts]);

  useEffect(() => {
    const postPicsToArray = async () => {
      const pics = [];
      for(let i = 0; i < allPosts.length; i++) {
        const post = allPosts[i];
        const { images } = post;
        if ( images ) {
          for(let j = 0; j < images.length; j++) {
            const image = images[j];
            pics.push({
              postId: post.id,
              url: image.url,
            });
          }
        }
      }
      if(JSON.stringify(pics) !== JSON.stringify(allImagePosts)) {
        setAllImagePosts(pics);
      }
    }
    if(allPosts.length > 0) {
      postPicsToArray();
    }
  }, [allPosts])

  return (
    <View style={ss.pageWrapper}>
      {allAdminFavorites.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={allAdminFavorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={Divider}
          style={{ width: '100%'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
        />
      )}
    </View>
  );
};

export default AdminFavoritesScreen;