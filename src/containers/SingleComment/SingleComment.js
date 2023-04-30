import React, { memo, useState, useEffect, useContext, useMemo } from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dialog, Portal, Menu, useTheme } from "react-native-paper";
import { Comments, Users } from "../../models";
import {
  Avatar,
  Divider,
  Text,
  Button,
  ConditionalWrapper,
  Icon,
} from "../../components";
import { formatDate, DataStore } from "../../utils";
import { typography } from "../../styles";
import { AuthContext } from "../../contexts";
import CommentModal from "../CommentModal/CommentModal";
import FormatTextWithMentions from '../FormatTextWithMentions/FormatTextWithMentions';
import styles from "./SingleCommentStyles";

const SingleComment = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { numberOfLines, comment } = props;
  if (!comment) {
    return null;
  }

  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [commentUser, setCommentUser] = useState({
    id: "",
    name: "",
    image: undefined,
  });

  const authStatus = useContext(AuthContext).authStatus;
  const navigation = useNavigation();

  const goToUserScreen = () => {
    if (commentUser?.id) {
      navigation.push("User", {
        userId: commentUser.id,
        name: commentUser.name,
        picture: commentUser.image,
      });
    }
  };

  const deleteComment = async () => {
    if (authStatus?.isAuthed) {
      try {
        // await DataStore.stop();
        await DataStore.delete(Comments, comment.id);
        setDeleteDialogVisible(false);
      } catch (error) {
        console.log("Error deleting comment", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowMenu(false);
    setShowModal(true);
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const showDeleteDialog = () => {
    setShowMenu(false);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const fetchUser = async () => {
    // await DataStore.stop();
    const user = await DataStore.query(Users, comment.userId);
    if (user) {
      const newUser = {
        id: user.id,
        name: user.name,
        image: user.image ? JSON.parse(user.image) : undefined,
      };
      // Quick check to make sure we're only updating state if the subscription caught a chance to the user associated with this post
      if (newUser !== commentUser) {
        setCommentUser(newUser);
      }
    }
  };

  useEffect(() => {
    // Subscribe to Users
    const usersSubscription = DataStore.observe(Users).subscribe((u) => {
      fetchUser();
    });

    if (comment.userId) {
      fetchUser();
    }

    return () => {
      usersSubscription.unsubscribe();
    };
  }, [comment.userId]);

  if (commentUser.id) {
    return (
      <>
        <CommentModal
          showModal={showModal}
          closeModal={closeModal}
          modalType={"update"}
          postsID={comment.postsID}
          comment={comment}
        />
        <Portal>
          <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
            <Dialog.Title>Delete Comment</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to delete this comment?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <View style={{ paddingRight: 10 }}>
                <Button onPress={hideDeleteDialog}>Cancel</Button>
              </View>
              <View>
                <Button onPress={deleteComment}>Delete</Button>
              </View>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Menu
          visible={showMenu}
          onDismiss={closeMenu}
          anchor={
            <View style={ss.commentWrapper}>
              <Pressable onPress={goToUserScreen}>
                <View style={ss.avatarWrapper}>
                  <Avatar
                    name={commentUser.name}
                    fileName={commentUser?.image?.url}
                    size={typography.fontSizeM * 2}
                    variant="circle"
                    absolute={false}
                  />
                </View>
              </Pressable>
              <ConditionalWrapper
                condition={comment.userId === authStatus.userId || authStatus.isAdmin}
                wrapper={(children) => (
                  <Pressable onPress={openMenu}>{children}</Pressable>
                )}
              >
                <View style={ss.textWrapper}>
                  <Text size="XS" color={theme.colors.onQuaternary}>{formatDate(comment.createdAt)}</Text>
                  <Text size="M" bold>{commentUser.name}</Text>
                  <Text size="M" numberOfLines={numberOfLines}>
                    <FormatTextWithMentions text={comment.comment} />
                  </Text>
                </View>
              </ConditionalWrapper>
            </View>
          }
        >
          {comment.userId === authStatus.userId && (
            <>
              <Menu.Item
                onPress={openModal}
                title="Edit Comment"
                icon={({ size, color }) => (
                  <Icon name="edit" size={size} color={theme.colors.onPrimary} />
                )}
              />
              <Divider />
            </>
          )}
          <Menu.Item
            onPress={showDeleteDialog}
            title="Delete Comment"
            icon={({ size, color }) => (
              <Icon name="trash" size={size} color={theme.colors.onPrimary} />
            )}
          />
        </Menu>
      </>
    );
  };
  return null;
};

export default memo(SingleComment);
