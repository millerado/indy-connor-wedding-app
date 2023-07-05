import React, { useState, useEffect, useMemo, useContext } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { PostPreview } from "../../containers";
import { ActivityIndicator } from "../../components";
import { DataContext } from "../../contexts";
import styles from "./ViewPostScreenStyles";

const ViewPostScreen = ({ navigation, route }) => {
  // console.log('-- Route Params --', route.params);
  const { postsID, post: initialPost } = route.params;
  const [post, setPost] = useState(initialPost || undefined);
  const [comments, setComments] = useState([]);
  const [reactions, setReactions] = useState([]);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { allPosts, allUsers, allAdminFavorites, allComments, allReactions } = useContext(DataContext);

  useEffect(() => {
    const thisPost = allPosts.find((p) => p.id === postsID);
    if (thisPost) {
      if(JSON.stringify(thisPost) !== JSON.stringify(post)) {
        setPost(thisPost);
      }
    }
  }, [postsID, allPosts]);

  useEffect(() => {
    const thisComments = allComments.filter((c) => c.postsID === postsID);
    if(JSON.stringify(thisComments) !== JSON.stringify(comments)) {
      setComments(thisComments);
    }
  }, [postsID, allComments]);

  useEffect(() => {
    const thisReactions = allReactions.filter((r) => r.postsID === postsID);
    if(JSON.stringify(thisReactions) !== JSON.stringify(reactions)) {
      setReactions(thisReactions);
    }
  }, [postsID, allReactions]);

  return (
    <View style={ss.pageWrapper}>
      {post ? (
        <ScrollView scrollEventThrottle={16} keyboardShouldPersistTaps='handled' keyboardDismissMode="on-drag">
          <PostPreview
            post={post}
            previewMode={false}
            allUsers={allUsers}
            allAdminFavorites={allAdminFavorites}
            comments={comments}
            reactions={reactions}
          />
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
