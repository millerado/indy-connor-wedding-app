import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useTheme } from "react-native-paper";
import { MentionInput } from 'react-native-controlled-mentions';
import {
  Text,
  Button,
  ActivityIndicator,
  Modal,
  TextInput,
} from "../../components";
import { Posts, Users } from "../../models";
import TaggingUserSuggestions from "../TaggingUserSuggestions/TaggingUserSuggestions";
import styles from "./CaptionModalStyles";

const CaptionModal = (props) => {
  const [messageBodyText, setMessageBodyText] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const { showModal, closeModal, post, postsID } = props;
  const { messageBody } = post;

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const resetModal = () => {
    setMessageBodyText(messageBody ? messageBody : "");
  };

  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    return TaggingUserSuggestions(keyword, onSuggestionPress, allUsers);
  };

  useEffect(() => {
    const usersSubscription = DataStore.observeQuery(Users).subscribe(({ users }) => {
      try {
        if (users) {
          const newUsers = users.sort((a, b) => a.name.localeCompare(b.name));
          // if(JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
            setAllUsers(newUsers);
          // }
        }
      } catch (err) { console.log('error fetching Data', err) }
    });

    return () => {
      usersSubscription.unsubscribe();
    };
  }, [postsID]);

  useEffect(() => {
    resetModal();
  }, [messageBody]);

  const handleCloseModal = () => {
    closeModal();
    resetModal();
  };

  const handleSaveItem = async () => {
    setIsLoading(true);
    try {
      // await DataStore.stop();
      const oldPost = await DataStore.query(Posts, post.id);
      // await DataStore.stop();
      await DataStore.save(
        Posts.copyOf(oldPost, (updatedItem) => {
          updatedItem.messageBody = messageBodyText;
        })
      );
      setIsLoading(false);
      setError("");
      handleCloseModal();
    } catch (err) {
      console.log("error updating caption", err);
      setError("There was an error saving this comment");
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isVisible={showModal}
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}
      avoidKeyboard={true}
      style={{ padding: 0, margin: 0 }}
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
              <Text color={theme.colors.onPrimary} bold size="M">
                Edit Caption
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              {!isLoading ? (
                <Button
                  variant="onModalHeader"
                  onPress={() => handleSaveItem()}
                  compact
                  disabled={isLoading}
                >
                  Submit
                </Button>
              ) : (
                <ActivityIndicator size={30} />
              )}
            </View>
          </View>
          <View style={ss.modalContentWrapper}>
            <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              <TextInput
                label='Add a Caption'
                clearButtonMode="while-editing"
                returnKeyType="default"
                value={messageBodyText}
                multiline
                keyboardType="default"
                autoFocus={true}
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
                      value={messageBodyText}
                      onChange={setMessageBodyText}
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

export default CaptionModal;
