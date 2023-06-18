import React, { useContext, useEffect, useMemo, useState } from "react";
import { View, ScrollView} from "react-native";
import { useTheme } from "react-native-paper";
import { MentionInput } from 'react-native-controlled-mentions';
import { DataStore, sendUsersPushNotifications } from "../../utils";
import { Comments, Users } from "../../models";
import {
  Text,
  Button,
  ActivityIndicator,
  Modal,
  TextInput,
} from "../../components";
import { AuthContext } from "../../contexts";
import TaggingUserSuggestions from "../TaggingUserSuggestions/TaggingUserSuggestions";
import styles from "./CommentModalStyles";

const CommentModal = (props) => {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const authStatus = useContext(AuthContext).authStatus;

  const { showModal, modalType, closeModal, postsID, comment } = props;

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  let title = "Add Comment";
  let buttonText = "Submit";
  if (modalType === "update") {
    title = "Update Comment";
    buttonText = "Update";
  }

  const resetModal = () => {
    setCommentText(modalType === "update" ? comment.comment : "");
  };

  const pushNotificationsToTaggedUsers = (commentText) => {
    const regex = /@\[(.*?)\]\((.*?)\)/g;
    const matches = commentText.match(regex);
    if (matches) {
      const taggedBy = `@[${authStatus.name}](${authStatus.userId})`;
      const userIds = matches.map((match) => {
        const [, username, userId] = match.match(/@\[(.*?)\]\((.*?)\)/);
        return userId;
      });
      sendUsersPushNotifications(
        userIds,
        'Camp Conndigo',
        `${taggedBy} tagged you in a comment in the T Party App`,
        { targetType: 'post', id: postsID },
        authStatus.userId,
      );
    }
  }

  const handleCloseModal = () => {
    closeModal();
    resetModal();
  };

  const handleSaveItem = async () => {
    setIsLoading(true);
    if (commentText) {
      // Update Item
      if (modalType === "update") {
        const updatedItem = { ...comment };
        updatedItem.comment = commentText;
        // await DataStore.stop();
        await DataStore.save(
          Comments.copyOf(comment, (updatedItem) => {
            updatedItem.comment = commentText;
          })
        );
        setIsLoading(false);
        setError("");
        handleCloseModal();
      } else {
        // Create Item
        try {
          // await DataStore.stop();
          await DataStore.save(
            new Comments({
              userId: authStatus.userId,
              comment: commentText,
              postsID: postsID,
            })
          );

          setIsLoading(false);
          setError("");
          handleCloseModal();
          pushNotificationsToTaggedUsers(commentText);
        } catch (err) {
          console.log("error posting Comment Items right now", err);
          setIsLoading(false);
        }
      }
    } else {
      setError("Your comment can't be blank.");
      setIsLoading(false);
    }
  };

  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    return TaggingUserSuggestions(keyword, onSuggestionPress, allUsers);
  };

  useEffect(() => {
    resetModal();
  }, [modalType, comment]);

  useEffect(() => {
    // Subscribe to users
    const usersSubscription = DataStore.observeQuery(Users).subscribe(({ users }) => {
      try {
        if (users) {
          const newUsers = users.sort((a, b) => a.name.localeCompare(b.name));
          if(JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
            setAllUsers(newUsers);
          }
        }
      } catch (err) { console.log('error fetching Data', err) }
    });

    return () => {
      usersSubscription.unsubscribe();
    };
  }, [postsID]);

  return (
    <Modal
      isVisible={showModal}
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}
      avoidKeyboard={true}
    >
      <View style={ss.modalBackground}>
        <View style={ss.modalBody}>
          <View style={ss.modalHeader}>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Button
                variant="onModalHeader"
                onPress={() => handleCloseModal()}
                compact
                disabled={isLoading}
              >
                Cancel
              </Button>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text color={theme.colors.white} bold size="M">
                {title}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              {!isLoading ? (
                <Button
                  variant="onModalHeader"
                  onPress={() => handleSaveItem()}
                  compact
                >
                  {buttonText}
                </Button>
              ) : (
                <ActivityIndicator size={30} />
              )}
            </View>
          </View>
          <View style={ss.modalContentWrapper}>
            <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              <TextInput
                label='Add a Comment'
                clearButtonMode="while-editing"
                returnKeyType="default"
                value={commentText}
                multiline
                keyboardType="default"
                autoFocus={modalType === 'create'}
                blurOnSubmit={false}
                disabled={isLoading}
                style={[
                  ss.textInput,
                  ss.modalTextInput,
                  ss.textInputWrapper,
                ]}
                render={props => {
                  const { ref, ...restOfProps } = props;
                  return (
                    <MentionInput
                      value={commentText}
                      onChange={setCommentText}
                      partTypes={[
                        {
                          trigger: '@', // Should be a single character like '@' or '#'
                          renderSuggestions,
                          textStyle: { fontWeight: 'bold', color: theme.colors.primaryContainer }, // The mention style in the input
                          isBottomMentionSuggestionsRender: true,
                          isInsertSpaceAfterMention: true,
                        },
                      ]}
                      {...restOfProps}
                    />
                  );
                }}
              />
              {error !== "" && (
                <Text
                  style={{ marginTop: 10, marginBottom: 10 }}
                  color={theme.colors.error}
                >
                  {error}
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
