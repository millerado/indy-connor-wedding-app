import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  memo,
  useMemo,
} from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dialog, Menu, Portal, useTheme } from "react-native-paper";
import { SortDirection } from "aws-amplify";
import SingleComment from "../SingleComment/SingleComment";
import AddCommentListView from "../AddCommentListView/AddCommentListView";
import { Reactions, Users, Comments, Posts } from "../../models";
import {
  Icon,
  Text,
  Avatar,
  ImageS3,
  Button,
  Divider,
  ConditionalWrapper,
  ZoomableView,
  DoubleTap,
} from "../../components";
import { typography, calcDimensions } from "../../styles";
import { formatDate, DataStore } from "../../utils/";
import { AuthContext } from "../../contexts";
import CommentModal from "../CommentModal/CommentModal";
import CaptionModal from "../CaptionModal/CaptionModal";
import LikedByUsersModal from "../LikedByUsersModal/LikedByUsersModal";
import FormatTextWithMentions from '../FormatTextWithMentions/FormatTextWithMentions';
import styles from "./PostPreviewStyles";
import _ from "lodash";

const previewLines = 3;
const expandedLines = undefined; // If we're not doing a details page, we should show full caption in Preview
const dimensions = calcDimensions();

const PostPreview = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { post, previewMode = true, postUser: initialPostUser, reactions: initialReactions, comments: initialComments } = props;
  if (!post) {
    return null;
  }

  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [captionTextExandable, setCaptionTextExandable] = useState(false);
  const [captionExanded, setCaptionExanded] = useState(true);
  const [showUnauthedMessage, setShowUnauthedMessage] = useState(false);
  const [postUser, setPostUser] = useState(initialPostUser || {
    id: "",
    name: "",
    image: undefined,
  });
  const [reactions, setReactions] = useState(initialReactions || []);
  const [comments, setComments] = useState(initialComments || []);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showCaptionModal, setShowCaptionModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const authStatus = useContext(AuthContext).authStatus;

  const { messageBody, image, userId, createdAt, id: postsID } = post;


  const likePressHandler = async () => {
    if (authStatus?.isAuthed) {
      if (isLiked) {
        try {
          // await DataStore.stop();
          await DataStore.delete(Reactions, (reaction) =>
            reaction.and( reaction => [
              reaction.userId.eq(authStatus.userId),
              reaction.postsID.eq(postsID),
              reaction.reactionType.eq("like")
            ])
          );
        } catch (error) {
          console.log("Error deleting reaction", error);
        }
      } else {
        try {
          // await DataStore.stop();
          await DataStore.save(
            new Reactions({
              postsID: postsID,
              userId: authStatus.userId,
              reactionType: "like",
            })
          );
          // console.log("Comment saved successfully!");
        } catch (error) {
          console.log("Error saving reaction", error);
        }
      }
    } else {
      setShowUnauthedMessage(true);
    }
  };

  const showDeleteDialog = () => {
    setShowMenu(false);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const deletePost = async () => {
    if (authStatus?.isAuthed) {
      try {
        // await DataStore.stop();
        await DataStore.delete(Posts, post.id);
        setDeleteDialogVisible(false);
        if (!previewMode) {
          navigation.popToTop();
        }
      } catch (error) {
        console.log("Error deleting post", error);
      }
    }
  };

  const onTextLayout = useCallback(
    (e) => {
      const numLines = e.nativeEvent.lines.length;
      if (!captionTextExandable && numLines > previewLines) {
        setCaptionTextExandable(true);
        setCaptionExanded(false);
      }
    },
    [captionExanded]
  );

  const goToPostScreen = () => {
    if (previewMode) {
      navigation.push("View Post", {
        postsID: postsID,
        post: post,
        postUser: postUser,
        reactions: reactions,
        comments: comments,
      });
    }
  };

  const goToUserScreen = () => {
    navigation.push("User", {
      userId: postUser.id,
      name: postUser.name,
      picture: postUser.image,
    });
  };

  const openCommentModal = () => {
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
  };

  const closeCaptionModal = () => {
    setShowCaptionModal(false);
  };

  const openCaptionModal = () => {
    setShowMenu(false);
    setShowCaptionModal(true);
  };

  const commentsButtonHandler = () => {
    if (authStatus?.isAuthed) {
      openCommentModal();
    } else {
      setShowUnauthedMessage(true);
    }
  };

  const handleShowLikesList = () => {
    setShowLikesModal(true);
  }

  const handleHideLikesList = () => {
    setShowLikesModal(false);
  }

  useEffect(() => {
    if (authStatus?.isAuthed) {
      setIsLiked(reactions.filter((r) => r.userId === authStatus.userId).length > 0);
    }
  }, [reactions, authStatus]);

  useEffect(() => {
    const reactionsSubscription = DataStore.observeQuery(Reactions, (r) =>
      r.postsID.eq(postsID)
    ).subscribe(({ items }) => {
      if (items) {
        const reactionsSet = new Set();

        const newReactions = items.map((reaction) => {
          return {
            userId: reaction.userId,
            reactionType: reaction.reactionType,
          };
        }).filter((reaction) => {
          if (reactionsSet.has(reaction.userId)) {
            return false;
          }
          reactionsSet.add(reaction.userId);
          return true;
        });
        // console.log("Reactions data", reactionsData);
        // console.log('-- Filtered --', newReactions);
        if (newReactions !== reactions) {
          // Make sure it's not a change to a different Post
          setReactions(newReactions);
        }
      }
    });

    const commentsSubscription = DataStore.observeQuery(Comments, (c) =>
      c.postsID.eq(postsID),
      {
        sort: (s) => s.createdAt(previewMode ? SortDirection.DESCENDING : SortDirection.ASCENDING),
      }
    ).subscribe(({ items }) => {
      if (items !== comments) {
        // Make sure it's not a change to a different Post
        setComments(items);
      }
    });

    const usersSubscription = DataStore.observeQuery(Users, (u) =>
      u.id.eq(userId)
    ).subscribe(({ items }) => {
      if (items?.length > 0) {
        const user = items[0];
        const newUser = {
          id: user.id,
          name: user.name,
          image: user.image ? JSON.parse(user.image) : undefined,
        };
        // Quick check to make sure we're only updating state if the subscription caught a chance to the user associated with this post
        if (newUser !== postUser) {
          setPostUser(newUser);
        }
      }
    });

    return () => {
      commentsSubscription.unsubscribe();
      reactionsSubscription.unsubscribe();
      usersSubscription.unsubscribe();
    };
  }, [postsID]);

  return (
    <>
      <View style={ss.postsWrapper}>
        <CommentModal
          showModal={showCommentModal}
          closeModal={closeCommentModal}
          modalType={"create"}
          postsID={postsID}
        />
        <CaptionModal
          showModal={showCaptionModal}
          closeModal={closeCaptionModal}
          post={post}
          postsID={postsID}
        />
        <LikedByUsersModal
          showModal={showLikesModal}
          closeModal={handleHideLikesList}
          reactions={reactions}
        />
        <Portal>
          <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
            <Dialog.Title>Delete Post</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to delete this post?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <View style={{paddingRight: 10}}>
                <Button onPress={hideDeleteDialog}>Cancel</Button>
              </View>
              <View>
                <Button onPress={deletePost}>Delete</Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={ss.userInfoWrapper}>
          <View style={ss.leftSide}>
            <Pressable onPress={goToUserScreen}>
              <View style={ss.avatarWrapper}>
                <Avatar
                  fileName={postUser?.image?.url}
                  name={postUser?.name}
                  size={typography.fontSizeM * 2}
                  variant="circle"
                  absolute={false}
                />
              </View>
            </Pressable>
            <View>
              <Pressable onPress={goToUserScreen}>
                <Text bold>{postUser?.name}</Text>
              </Pressable>
              <Text size="XS">{formatDate(createdAt)}</Text>
            </View>
          </View>
          {userId === authStatus?.userId || authStatus?.isAdmin ? (
            <Menu
              visible={showMenu}
              onDismiss={closeMenu}
              anchor={
                <Pressable onPress={openMenu}>
                  <Icon name="edit" color={theme.colors.onPrimary} />
                </Pressable>
              }
            >
              {userId === authStatus?.userId && (
                <>
                  <Menu.Item
                    onPress={openCaptionModal}
                    title="Edit Caption"
                    icon={({ size, color }) => (
                      <Icon name="edit" size={size} color={theme.colors.onPrimary} />
                    )}
                  />
                  <Divider style={{ paddingTop: 10, paddingBottom: 10 }} />
                </>
              )}
              <Menu.Item
                onPress={showDeleteDialog}
                title="Delete Post"
                s
                icon={({ size, color }) => (
                  <Icon name="trash" size={size} color={theme.colors.onPrimary} />
                )}
              />
            </Menu>
          ) : null}
        </View>
        {image?.url && (
          <View style={ss.imageWrapper}>
            <ConditionalWrapper
              condition={!previewMode}
              wrapper={(children) => (
                <ZoomableView maxZoom={10} style={ss.zoomWrapper} height={dimensions.width * (image.height / image.width)} width={dimensions.width}>{children}</ZoomableView>
              )}>
              <DoubleTap doubleTap={likePressHandler} singleTap={goToPostScreen} delay={500}>
                <ImageS3
                  fileName={image.url}
                  height={image.height}
                  width={image.width}
                />
              </DoubleTap>
            </ConditionalWrapper>
          </View>
        )}
        {messageBody ? (
          <View style={ss.captionWrapper}>
            <Text
              onTextLayout={onTextLayout}
              size="M"
              numberOfLines={captionExanded || !previewMode ? expandedLines : previewLines}
            >
              <FormatTextWithMentions text={messageBody} />
            </Text>
            {captionTextExandable && previewMode && (
              <Text
                style={{ paddingTop: 5 }}
                onPress={() => setCaptionExanded(!captionExanded)}
                bold
                size="S"
                color={theme.colors.onQuaternary}
              >
                {captionExanded ? "show less" : "show more"}
              </Text>
            )}
          </View>
        ) : null}
        <View style={ss.reactionsWrapper}>
          <View style={ss.reactionIcons}>
            <Pressable onPress={commentsButtonHandler}>
              <Icon
                style={{ paddingRight: 15 }}
                name="comment"
                size={typography.fontSizeXXL}
                color={theme.colors.secondary}
              />
            </Pressable>
            <Pressable onPress={likePressHandler}>
              <Icon
                onPress={likePressHandler}
                name={isLiked ? "heart" : "heart-outline"}
                size={typography.fontSizeXXL}
                color={isLiked ? theme.colors.primary : theme.colors.secondary}
              />
            </Pressable>
          </View>
          {reactions.length > 0 && (
            <Pressable onPress={handleShowLikesList}>
              <View style={ss.likedByWrapper}>
                <Text size="S" color={theme.colors.primary}>
                  Liked by {reactions.length}{" "}
                  {reactions.length === 1 ? "person" : "people"}
                </Text>
              </View>
            </Pressable>
          )}
        </View>
        {comments.length > 0 && (
          <Pressable onPress={goToPostScreen}>
            {previewMode ? (
              <SingleComment comment={comments[0]} numberOfLines={2} />
            ) : (
              <>
                {comments.map((comment, index) => (
                  <View key={comment.id}>
                    {index === 0 ? null : <Divider color={theme.colors.onTertiary} />}
                    <SingleComment comment={comment} />
                  </View>
                ))}
              </>
            )}
            {previewMode && (
              <View style={ss.moreCommentsWrapper}>
                <Text bold color={theme.colors.onQuaternary} size="S" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  {comments.length > 1
                    ? `View all ${comments.length} comments`
                    : "View full comment"}
                </Text>
              </View>
            )}
          </Pressable>
        )}
        {previewMode && (
          <AddCommentListView postsID={postsID} />
        )}
      </View>
      <Portal>
        <Dialog visible={showUnauthedMessage} onDismiss={() => setShowUnauthedMessage(false)}>
          <Dialog.Content>
            <Text>Please login to like and comment on posts</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <View>
              <Button onPress={() => setShowUnauthedMessage(false)}>OK</Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </>
  );
};

export default memo(PostPreview);
