import React, { useState, useEffect, useRef, useContext, memo, useMemo } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView, Pressable, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import { debounce } from "lodash";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";
import { Menu } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { Users } from "../../models";
import { Text, ActivityIndicator, Icon, Avatar, Divider, ConditionalWrapper, TextInput, Button, TextSizes } from '../../components';
import { uploadImageS3, DataStore } from '../../utils';
import { typography, calcDimensions } from '../../styles';
import { AuthContext } from '../../contexts';
import styles from './UserScreenStyles';

const dimensions = calcDimensions();

// This list header contains:
// Show user's basic information (name, picture, etc...)
// Edit user information
// Edit picture
const UserScreenHeader = (props) => {
  const { name: nameProp, picture, hasPosted, userId } = props;
  const [isConnected, setIsConnected] = useState(false);
  const [about, setAbout] = useState(undefined);
  const [image, setImage] = useState(picture);
  const [imageLoading, setImageLoading] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [dbUser, setDbUser] = useState(undefined);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState(undefined);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [photoPermissions, setPhotoPermissions] = useState({
    photos: 'loading',
    camera: 'loading',
  });
  const auth = useContext(AuthContext);
  const { authStatus, setAuthStatus } = auth;

  const navigation = useNavigation();

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const addEditButton = () => {
    return (
      <Pressable onPress={() => setEditMode(!editMode)}>
        <View>
          <Icon
            name={editMode ? 'check' : 'edit'}
            color={theme.colors.primaryContainer}
            size={typography.fontSizeXXL}
          />
        </View>
      </Pressable>
    );
  }

  const openMenu = () => {
    Keyboard.dismiss();
    if (photoPermissions.camera === 'allowed' || photoPermissions.photos === 'allowed') {
      setShowMenu(true);
    } else if (image?.url) {
      alert('You must enable Camera or Photo permissions to change your picture');
    } else {
      alert('You must enable Camera or Photo permissions to add your picture')
    }
  }

  const closeMenu = () => {
    setShowMenu(false);
  }

  // Handlers for About Me Change with Debounce
  const saveAbout = async (newAbout) => {
    try {
      saveUserToDynamoDB({ updateAbout: newAbout });
    } catch (err) {
      console.log("Error saving About", err);
    }
  }

  const debouncedAboutChange = useRef(debounce((newAbout, oldDbUser) => {
    saveAbout(newAbout);
  }, 500)).current;

  const handleAboutChange = (newAbout) => {
    setAbout(newAbout);
    debouncedAboutChange(newAbout, dbUser);
  };

  const uploadImageCallback = async (props) => {
    // Callback is setup to handle multiple images in an array, in this case we only upload one
    const {success, uploadedImages, errorSummary, errorDetails} = props;
    if (success) {
      // The utility passes back an array, but we only are looking for 1 image
      const image = uploadedImages[0];
      saveUserToDynamoDB({ updatePicture: JSON.stringify(image.imageObject) });
      setImage(image.imageObject);
      setError(undefined);
      setImageLoading('downloading');
    } else {
      setError({ errorSummary: errorSummary, errorDetails: errorDetails });
      setImageLoading(undefined);
    }
  }

  // Handlers for updating user in DynamoDB
  const saveUserToDynamoDB = async (props) => {
    // console.log('-- saveUserToDynamoDB --', props);
    const { updatePicture, updateAbout } = props;
    // Change userInDb to dbUser
    try {
      // await DataStore.stop();
      const oldUser = await DataStore.query(Users, userId);
      // await DataStore.stop();
      const newUser = await DataStore.save(
        Users.copyOf(oldUser, updatedUser => {
          updatedUser.image = updatePicture ? updatePicture : oldUser.image;
          updatedUser.about = updateAbout ? updateAbout : oldUser.about;
        })
      );
      setDbUser(newUser);
    } catch (err) {
      console.log('error posting User', err)
    }
  }

  const getUser = async () => {
    // await DataStore.stop();
    const user = await DataStore.query(Users, userId);
    // console.log('-- Get User --', users);
    if (user) {
      setAbout(user.about);
      setImage(user.image ? JSON.parse(user.image) : undefined);
      setDbUser(user);
    }
  };

  const startPickImage = () => {
    setShowMenu(false);
    uploadImageS3.pickImage(uploadImageCallback, false);
    setImageLoading('uploading');
  }

  const startTakePhoto = () => {
    setShowMenu(false);
    uploadImageS3.takePhoto(uploadImageCallback, false);
    setImageLoading('uploading');
  }

  const imageLoadedCallback = () => {
    setImageLoading(undefined);
  }

  useEffect(() => {
    const headerRight = authStatus !== undefined && dbUser?.name ? addEditButton() : null;
    const headerTitle = dbUser?.name ? dbUser.name : 'User';
    navigation.setOptions({
      title: headerTitle,
      headerRight: () => headerRight,
    });
  }, [authStatus, dbUser, editMode]);

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
    getUser();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);

  const imageViewHeight = image ? image.width > image.height ? (image.height / image.width) * dimensions.width : dimensions.width : dimensions.width * .33;
  // console.log('-- dbUser --', dbUser);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={ss.pageWrapper}>
      <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        {authStatus && dbUser && (
          <>
            {editMode && (
              <>
                <View style={ss.inputWrapper}>
                  <TextInput
                    clearButtonMode='while-editing'
                    // maxLength={50}
                    returnKeyType="done"
                    label="About Me"
                    dense
                    autoCapitalize='sentences'
                    enablesReturnKeyAutomatically={true}
                    value={about}
                    keyboardType='default'
                    style={[ss.textInput, ss.threeQuarterWidth]}
                    onChangeText={(text) => handleAboutChange(text)}
                    disabled={!isConnected}
                  />
                </View>
                {!isConnected && (
                  <View style={ss.inputWrapper}>
                    <Text color={theme.colors.error} size={TextSizes.S}>
                      You must be connected to the internet to edit your profile.
                    </Text>
                  </View>
                )}
              </>
            )}
            <Menu
              visible={showMenu}
              onDismiss={closeMenu}
              disabled={!isConnected}
              anchor={
                <ConditionalWrapper
                  condition={authStatus.id === dbUser.owner}
                  wrapper={(children) => (
                    <Pressable onPress={(openMenu)} disabled={!isConnected}>
                      {children}
                    </Pressable>
                  )}>
                  <Avatar
                    size={image?.width ? Math.min(image.width, dimensions.width) : dimensions.width}
                    fileName={image?.url}
                    name={dbUser.name || nameProp}
                    variant='square'
                    textSize={TextSizes.XXXL}
                    bold={true}
                    height={image?.height ? Math.min(image.height, dimensions.width * .33) : dimensions.width * .33}
                    absolute={false}
                    imageLoadedCallback={imageLoadedCallback}
                  />
                  {error && error.errorSummary !== 'Upload Cancelled' && (
                    <View
                      style={{
                        padding: 10,
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Text color={theme.colors.error} size={TextSizes.L}>
                        {error.errorSummary}
                      </Text>
                      <View style={{ paddingTop: 10 }}>
                        <Button onPress={() => setShowErrorDetails(!showErrorDetails)} >
                          {`${showErrorDetails ? 'Hide' : 'Show'} Error Details`}
                        </Button>
                      </View>
                      {showErrorDetails && (
                        <View style={{ paddingTop: 10 }}>
                          <Text color={theme.colors.error} size={TextSizes.M}>
                            {error.errorDetails}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                  {imageLoading && (
                    <View style={{ position: 'absolute', width: dimensions.width, height: dimensions.width, alignItems: 'center', justifyContent: 'center' }}>
                      <ActivityIndicator size={imageViewHeight * .5} />
                    </View>
                  )}
                </ConditionalWrapper>
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
          </>
        )}
        <View style={{ padding: 10 }}>
          <Text bold size={TextSizes.XL}>
            {hasPosted ? `${dbUser?.name.split(' ')[0]}'s Posts:` : `${dbUser?.name.split(' ')[0]} hasn't posted yet`}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}

export default memo(UserScreenHeader)