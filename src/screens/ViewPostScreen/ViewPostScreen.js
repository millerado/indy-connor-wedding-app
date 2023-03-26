import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { CommentModal, PostPreview, AddCommentListView } from "../../containers";
import { Posts } from "../../models";
import { DataStore } from "../../utils";
import { ActivityIndicator } from "../../components";
import styles from "./ViewPostScreenStyles";

const ViewPostScreen = ({ navigation, route }) => {
  const { postsID, post: initialPost, postUser: initialPostUser, reactions: initialReactions, comments: initialComments } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState(initialPost || undefined);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const closeModal = () => {
    setShowModal(false);
  };

  //// TO-DO: Fix this
  useEffect(() => {
    const postSubscription = DataStore.observeQuery(
      Posts,
      (p) => p.id.eq(postsID)
    ).subscribe(({ item }) => {
      if (item) {
        const newPost = {
          ...item,
          image: item.image ? JSON.parse(item.image) : undefined,
        };
        setPost(newPost);
      }
    });

    return () => {
      postSubscription.unsubscribe();
    };
  }, []);



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