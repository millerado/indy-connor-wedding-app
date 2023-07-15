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
import _ from "lodash";
import SingleComment from "../SingleComment/SingleComment";
import AddCommentListView from "../AddCommentListView/AddCommentListView";
import ImageScroll from "../ImageScroll/ImageScroll";
import { Reactions, Posts } from "../../models";
import {
  Icon,
  Text,
  Avatar,
  Button,
  Divider,
} from "../../components";
import { typography } from "../../styles";
import { formatDate, DataStore, formatGameString } from "../../utils/";
import { AuthContext } from "../../contexts";
import CommentModal from "../CommentModal/CommentModal";
import LikedByUsersModal from "../LikedByUsersModal/LikedByUsersModal";
import FormatTextWithMentions from '../FormatTextWithMentions/FormatTextWithMentions';
import styles from "./PostPreviewStyles";

const previewLines = 3;
const commentLines = 2;
const expandedLines = undefined; // If we're not doing a details page, we should show full caption in Preview

const PostPreview = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { 
    post, 
    previewMode = true, 
    postUser: initialPostUser, 
    allUsers, 
    allAdminFavorites: adminFavorites,
    comments,
    reactions,
  } = props;
  if (!post) {
    return null;
  }

  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [captionTextExandable, setCaptionTextExandable] = useState(false);
  const [commentTextExandable, setCommentTextExandable] = useState(false);
  const [captionExanded, setCaptionExanded] = useState(true);
  const [commentExpanded, setCommentExpanded] = useState(true);
  const [showUnauthedMessage, setShowUnauthedMessage] = useState(false);
  const [postUser, setPostUser] = useState(initialPostUser || {
    id: "",
    name: "",
    image: undefined,
  });
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const authStatus = useContext(AuthContext).authStatus;

  const { messageBody, images, userId, createdAt, id: postsID, olympicEvent } = post;
  const eventDetails = olympicEvent ? JSON.parse(post.eventDetails) : null;

  const likePressHandler = async () => {
    // console.log('-- likePressHandler --', isLiked, postsID, authStatus?.userId);
    if (authStatus?.isAuthed) {
      if (isLiked) {
        try {
          // await DataStore.stop();
          await DataStore.delete(Reactions, (reaction) =>
            reaction.and(reaction => [
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
      setIsLiked(!isLiked); // Immediate UI update before the subscription updates
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

  const onCommentTextLayout = useCallback(
    (e) => {
      const numLines = e.nativeEvent.lines.length;
      if(!commentTextExandable && numLines > commentLines) {
        setCommentTextExandable(true);
        setCommentExpanded(false);
      }
    },
    []
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

  const goToEditScreen = () => {
    setShowMenu(false);
    navigation.push("Create Post", {
      view: "edit",
      currentPost: post,
    });
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
    const postingUser = allUsers.find((u) => u.id === post.userId);
    if (postingUser) {
      setPostUser(postingUser);
    }
  }, [allUsers]);

  return (
    <>
      <View style={ss.postsWrapper}>
        <CommentModal
          showModal={showCommentModal}
          closeModal={closeCommentModal}
          modalType={"create"}
          postsID={postsID}
        />
        <LikedByUsersModal
          showModal={showLikesModal}
          closeModal={handleHideLikesList}
          reactions={reactions}
          allUsers={allUsers}
        />
        <Portal>
          <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
            <Dialog.Title>Delete Post</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to delete this post?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <View style={{ paddingRight: 10 }}>
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
            {eventDetails ? (
              <View style={ss.avatarWrapper}>
                {messageBody.toLowerCase().includes("#ohshit") ? (
                  <Icon name={'ohShit'} color={theme.colors.primary} size={typography.fontSizeM * 2} />
                ) : (
                  <Icon name={eventDetails.game.iconName} color={theme.colors.primary} size={typography.fontSizeM * 2} />
                )}
              </View>
            ) : (
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
            )}
            <View>
              {eventDetails ? (
                <Text bold>{eventDetails.game.name}</Text>
              ) : (
                <Pressable onPress={goToUserScreen}>
                  <Text bold>{postUser?.name}</Text>
                </Pressable>
              )}
              <Text size="XS">{formatDate(createdAt)}</Text>
            </View>
          </View>
          {userId === authStatus?.userId || authStatus?.isAdmin ? (
            <Menu
              visible={showMenu}
              onDismiss={closeMenu}
              anchor={
                <Pressable onPress={openMenu}>
                  <Icon name="edit" color={theme.colors.primary} />
                </Pressable>
              }
            >
              <Menu.Item
                onPress={goToEditScreen}
                title="Edit Post"
                icon={({ size, color }) => (
                  <Icon name="edit" size={size} color={theme.colors.primary} />
                )}
              />
              <Divider />
              <Menu.Item
                onPress={showDeleteDialog}
                title="Delete Post"
                s
                icon={({ size, color }) => (
                  <Icon name="trash" size={size} color={theme.colors.primary} />
                )}
              />
            </Menu>
          ) : null}
        </View>
        <ImageScroll images={images} previewMode={previewMode} doubleTapHandler={likePressHandler} singleTapHandler={goToPostScreen} tapDelay={500} adminFavorites={adminFavorites} />
        {eventDetails ? (
          <View style={ss.captionWrapper}>
            <FormatTextWithMentions text={formatGameString(eventDetails, allUsers)} size={'M'} />
          </View>
        ) : null}
        {messageBody ? (
          <View style={ss.captionWrapper}>
            <FormatTextWithMentions
              text={messageBody} 
              onTextLayout={onTextLayout}
              size="M"
              numberOfLines={captionExanded || !previewMode ? expandedLines : previewLines}
            />
            {captionTextExandable && previewMode && (
              <Text
                style={{ paddingTop: 5 }}
                onPress={() => setCaptionExanded(!captionExanded)}
                bold
                size="S"
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
                name={isLiked ? "heart" : "heartOutline"}
                size={typography.fontSizeXXL}
                color={theme.colors.red}
              />
            </Pressable>
          </View>
          {reactions.length > 0 && (
            <Pressable onPress={handleShowLikesList}>
              <View style={ss.likedByWrapper}>
                <Text size="S">
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
              <SingleComment 
                comment={comments[0]} 
                numberOfLines={commentExpanded ? expandedLines : commentLines}
                allUsers={allUsers} 
                onTextLayout={onCommentTextLayout}
              />
            ) : (
              <>
                {comments.map((comment, index) => (
                  <View key={comment.id}>
                    {index === 0 ? null : <Divider color={theme.colors.onTertiary} />}
                    <SingleComment comment={comment} allUsers={allUsers} />
                  </View>
                ))}
              </>
            )}
            {previewMode && (comments.length > 1 || commentTextExandable) && (
              <View style={ss.moreCommentsWrapper}>
                <Text bold size="S" style={{ paddingTop: 5, paddingBottom: 5 }}>
                  {comments.length > 1
                    ? `View all ${comments.length} comments`
                    : "View full comment"}
                </Text>
              </View>
            )}
          </Pressable>
        )}
        <AddCommentListView postsID={postsID} />
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
