import React, { useState, useEffect, useContext, useMemo } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Menu, useTheme } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { MentionInput } from 'react-native-controlled-mentions';
import {
  Text,
  ActivityIndicator,
  Icon,
  ImageS3,
  Divider,
  Button,
  TextInput,
} from "../../components";
import { Posts, Users } from "../../models";
import { uploadImageS3, DataStore, sendUserPushNotification } from "../../utils";
import { typography, calcDimensions } from "../../styles";
import { AuthContext } from '../../contexts';
import { TaggingUserSuggestions } from '../../containers';
import styles from "./CreatePostScreenStyles";

const dimensions = calcDimensions();

const CreatePostScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [image, setImage] = useState(undefined);
  const [imageLoading, setImageLoading] = useState(undefined);
  const [dataPosting, setDataPosting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState(undefined);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [photoPermissions, setPhotoPermissions] = useState({
    photos: 'loading',
    camera: 'loading',
  });

  const authStatus = useContext(AuthContext).authStatus;
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const uploadImageCallback = async (props) => {
    console.log('-- Upload Image Callback --', props);
    const { success, uploadedImages, errorSummary, errorDetails } = props;
    if (success) {
      const image = uploadedImages[0];
      setImage(image.imageObject);
      setError(undefined);
      setImageLoading('downloading');
    } else {
      setError({ errorSummary: errorSummary, errorDetails: errorDetails });
      setImageLoading(undefined);
    }
  };

  const fetchUsers = async () => {
    // await DataStore.stop();
    const users = await DataStore.query(Users);
    if (users) {
      setAllUsers(users.sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  const pushNotificationsToTaggedUsers = (captionText, postId) => {
    const regex = /@\[(.*?)\]\((.*?)\)/g;
    const matches = captionText.match(regex);
    if (matches) {
      const userFirstName = authStatus.name.split(' ')[0];
      matches.forEach((match) => {
        const [, username, userId] = match.match(/@\[(.*?)\]\((.*?)\)/);
        sendUserPushNotification(
          userId,
          'T Party',
          `${userFirstName} tagged you in a post in the T Party App`,
          { targetType: 'post', id: postId }
        );
      });
    }
  }

  const savePost = async () => {
    setDataPosting(true);
    if (messageBody !== "" || image) {
      try {
        // await DataStore.stop();
        const newPost = await DataStore.save(
          new Posts({
            userId: authStatus.userId,
            messageBody,
            images: [JSON.stringify(image)],
            olympicEvent: false,
          })
        );
        pushNotificationsToTaggedUsers(messageBody, newPost.id);
        navigation.popToTop();
        // Page is unmounting and you can't "go back" to it, no need to refresh state
      } catch (err) {
        console.log("error posting item", err);
        setDataPosting(false);
      }
    } else {
      // console.log('-- Validation Error --');
      setError("Please Upload an Image or Fill in a Message.");
      setDataPosting(false);
    }
  };

  const startPickImage = async () => {
    setShowMenu(false);
    if (image) {
      setImage(undefined);
    }
    uploadImageS3.pickImage(uploadImageCallback, true);
    setImageLoading('uploading');
  }

  const startTakePhoto = async () => {
    setShowMenu(false);
    if (image) {
      setImage(undefined);
    }
    uploadImageS3.takePhoto(uploadImageCallback);
    setImageLoading('uploading');
  }

  const imageLoadedCallback = () => {
    setImageLoading(undefined);
  }

  const openMenu = () => {
    Keyboard.dismiss();
    if (photoPermissions.camera === 'allowed' || photoPermissions.photos === 'allowed') {
      setShowMenu(true);
    }
  }

  const closeMenu = () => {
    setShowMenu(false);
  }

  const renderPlaceholder = () => {
    return addPhotoPlaceholder(dimensions, isConnected, theme, photoPermissions, imageLoading)
  }

  const renderSuggestions = ({ keyword, onSuggestionPress }) => {
    return TaggingUserSuggestions(keyword, onSuggestionPress, allUsers);
  };

  useEffect(() => {
    (async () => {
      const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const picsPermission = cameraRollStatus.status === "granted" ? 'allowed' : 'denied';
      const cameraPermission = cameraStatus.status === "granted" ? 'allowed' : 'denied';
      setPhotoPermissions({
        photos: picsPermission,
        camera: cameraPermission,
      });
    })();

    // Subscribe to Users
    const usersSubscription = DataStore.observe(Users).subscribe((u) => {
      fetchUsers();
    });

    // And initial user load
    fetchUsers();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
      usersSubscription.unsubscribe();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={ss.pageWrapper}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{ flex: 1, width: "100%" }}
      >
        {dataPosting ? (
          <View style={{ padding: 20, width: "100%", alignItems: "center" }}>
            <ActivityIndicator size={typography.fontSizeXXXL} />
          </View>
        ) : (
          <>
            <View style={{ padding: 10, width: "100%" }}>
              <TextInput
                label="What's going on?"
                clearButtonMode="while-editing"
                returnKeyType="default"
                value={messageBody}
                multiline
                keyboardType="default"
                autoFocus={true}
                blurOnSubmit={false}
                disabled={!authStatus || !authStatus.isAuthed}
                style={[
                  ss.textInput,
                  ss.fullWidthTextInput,
                  ss.textInputWrapper,
                ]}
                render={props => {
                  const { ref, ...restOfProps } = props;
                  return (
                    <MentionInput
                      value={messageBody}
                      onChange={setMessageBody}
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
            </View>
            <View>
              <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                disabled={!isConnected}
                anchor={
                  <Pressable onPress={openMenu} disabled={!isConnected}>
                    <ImageS3
                      fileName={image?.url}
                      width={image?.width || dimensions.width}
                      height={image?.height || dimensions.height * .25}
                      placeholder={renderPlaceholder}
                      imageLoadedCallback={imageLoadedCallback}
                    />
                  </Pressable>
                }>
                {photoPermissions.photos === 'allowed' && (
                  <Menu.Item onPress={startPickImage} title="Upload an Image" icon={({ size, color }) => (
                    <Icon name="picture" size={size} color={theme.colors.onPrimary} />
                  )} />
                )}
                {photoPermissions.camera === 'allowed' && photoPermissions.photos === 'allowed' && (
                  <Divider />
                )}
                {photoPermissions.camera === 'allowed' && (
                  <Menu.Item onPress={startTakePhoto} title="Take a Photo" icon={({ size, color }) => (
                    <Icon name="camera" size={size} color={theme.colors.onPrimary} />
                  )} />
                )}
              </Menu>
            </View>
            <View style={{ width: "100%", paddingTop: 10, paddingBottom: 10, }}>
              <Divider />
            </View>
            <View
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                width: "100%",
                alignItems: "center",
              }}
            >
              <View style={{ width: "50%" }}>
                <Button
                  variant="primary"
                  onPress={savePost}
                  disabled={messageBody === "" && !image}
                >
                  Save Post
                </Button>
              </View>
            </View>
            {error && error.errorSummary !== 'Upload Cancelled' && (
              <View
                style={{
                  padding: 10,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text color={theme.colors.error} size='L'>
                  {error.errorSummary}
                </Text>
                <View style={{ paddingTop: 10 }}>
                  <Button onPress={() => setShowErrorDetails(!showErrorDetails)}>{`${showErrorDetails ? 'Hide' : 'Show'} Error Details`}</Button>
                </View>
                {showErrorDetails && (
                  <View style={{ paddingTop: 10 }}>
                    <Text color={theme.colors.error} size='M'>
                      {error.errorDetails}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePostScreen;

const addPhotoPlaceholder = (dimensions, isConnected, theme, photoPermissions, imageLoading) => {
  return (
    <View style={{ paddingLeft: 10, paddingRight: 10, width: '100%' }}>
      <View style={{ backgroundColor: theme.colors.onTertiary, width: '100%', height: dimensions.height * .25, alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 5 }}>
        <Icon name='camera' size={typography.fontSizeXXXL} color={theme.colors.primary} />
        <Text color={theme.colors.primary} size={isConnected ? 'XXL' : 'L'} bold>
          {isConnected ? 'Add Photo' : 'Must be online to add photos'}
        </Text>
        {photoPermissions.camera === 'denied' && photoPermissions.photos === 'denied' && (
          <Text color={theme.colors.primary} size={'M'} bold>
            Please grant photo or camera permissions to upload pictures
          </Text>
        )}
      </View>
      {imageLoading && (
        <View style={{ position: 'absolute', width: dimensions.width, height: dimensions.height * .25, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={dimensions.height * .25 * .5} />
        </View>
      )}
    </View>
  );
}
