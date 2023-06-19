import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { CommentModal, PostPreview, AddCommentListView } from "../../containers";
import { Posts } from "../../models";
import { DataStore } from "../../utils";
import { ActivityIndicator } from "../../components";
import styles from "./ViewPostScreenStyles";

const ViewPostScreen = ({ navigation, route }) => {
  // console.log('-- Route Params --', route.params);
  const { postsID, post: initialPost, postUser: initialPostUser, reactions: initialReactions, comments: initialComments } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState(initialPost || undefined);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const postsSubscription = DataStore.observeQuery(Posts, (p) => p.id.eq(postsID)).subscribe(({ items }) => {
      const formattedPosts = items.map((post) => {
        const obj = Object.assign({}, post);
        const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
          return JSON.parse(image);
        }) : undefined;
        obj.images = images;
        return obj;
      });
      if (items.length > 0) {
        setPost(formattedPosts[0]);
      }
    });

    return () => {
      postsSubscription.unsubscribe();
    };
  }, [postsID]);

  return (
    <View style={ss.pageWrapper}>
      <CommentModal
        showModal={showModal}
        closeModal={closeModal}
        modalType={'create'}
        postsID={postsID}
      />
      {post ? (
        <ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
          <>
            <PostPreview
              post={post}
              previewMode={false}
              postUser={initialPostUser}
              reactions={initialReactions}
              comments={initialComments}
            />
            <AddCommentListView postsID={postsID} />
          </>
        </ScrollView>
      ) : (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      )}
    </View>
  );
};

export default ViewPostScreen;
