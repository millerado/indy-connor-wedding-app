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
import { Predicates, SortDirection } from "aws-amplify";
import {
  Chip,
  Avatar,
  Text,
  TextSizes,
  ActivityIndicator,
  Icon,
  Divider,
  Button,
  TextInput,
  DropdownInput
} from "../../components";
import { Posts, Users, Games } from "../../models";
import { uploadImageS3, DataStore, sendUserPushNotification, gamePlayers, nth } from "../../utils";
import { typography, calcDimensions } from "../../styles";
import { AuthContext } from '../../contexts';
import { TaggingUserSuggestions, ImageScroll, FormatTextWithMentions } from '../../containers';
import styles from "./CreatePostScreenStyles";

const dimensions = calcDimensions();

const CreatePostScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [images, setImages] = useState([]);
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
  const [games, setGames] = useState([]);
  const [gamesDropdown, setGamesDropdown] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [teams, setTeams] = useState([]);

  const authStatus = useContext(AuthContext).authStatus;
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const uploadImageCallback = async (props) => {
    const { success, uploadedImages, errorSummary, errorDetails } = props;
    if (success) {
      const newImages = [];
      for(let i = 0; i < uploadedImages.length; i++) {
        const img = uploadedImages[i];
        newImages.push(img.imageObject);
      }
      setImages(newImages);
      setError(undefined);
      setImageLoading('downloading');
    } else {
      setError({ errorSummary: errorSummary, errorDetails: errorDetails });
      setImageLoading(undefined);
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
    if (messageBody !== "" || images) {
      try {
        // await DataStore.stop();
        const imagesArray = [];
        if(images.length > 0) {
          for(let i = 0; i < images.length; i++) {
            imagesArray.push(JSON.stringify(images[i]));
          }
        }
        const newPost = await DataStore.save(
          new Posts({
            userId: authStatus.userId,
            messageBody,
            images: imagesArray,
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
    if (images) {
      setImages([]);
    }
    uploadImageS3.pickImage(uploadImageCallback, true);
    setImageLoading('uploading');
  }

  const startTakePhoto = async () => {
    setShowMenu(false);
    if (images) {
      setImages([]);
    }
    uploadImageS3.takePhoto(uploadImageCallback);
    setImageLoading('uploading');
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

  const handleSelectedGame = (item) => {
    const game = games.find((g) => g.id === item);
    setSelectedGame(game);
    if(game) {
      console.log('-- Full Game Details --', game);
      const { canHaveMultipleWinners, minNumberOfPlayersPerTeam, maxNumberOfPlayersPerTeam, minNumberOfTeams, maxNumberOfTeams, points, rules } = game;
      const newTeams = [];
      for(let i = 1; i < points.length; i++) {
        const point = points[i];
        newTeams.push({
          id: i,
          name: `Team ${i + 1}`,
          points: point,
          players: [],
          minPlayers: minNumberOfPlayersPerTeam,
          maxPlayers: maxNumberOfPlayersPerTeam,
          canHaveMultipleWinners,
        });
      }
      newTeams.push({
        id: 0,
        name: 'Everyone Else',
        points: points[0],
        players: [],
        minPlayers: minNumberOfPlayersPerTeam,
        maxPlayers: maxNumberOfPlayersPerTeam,
        canHaveMultipleWinners,
      })
      setTeams(newTeams);
    } else {
      // They selected None
      console.log('-- No Game Selected, RESET --');
      setTeams([]);
    }
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

    const usersSubscription = DataStore.observeQuery(Users).subscribe(({ users }) => {
      try {
        if (users) {
          setAllUsers(users.sort((a, b) => a.name.localeCompare(b.name)));
        }
      } catch (err) { console.log('error fetching Data', err) }
    });

    const gamesSubscription = DataStore.observeQuery(Games, Predicates.ALL, {
      sort: (s) => s.name(SortDirection.ASCENDING),
    }).subscribe(({ items }) => {
      const g = items.map((game, index) => {
        return {
          value: game.id,
          iconName: game.iconName,
          label: game.name,
          players: gamePlayers(game),
        }
      });
      // And a "None" row to unselect a game
      g.unshift({
        value: null,
        iconName: "close",
        label: "None",
        players: 'Nevermind, not playing a game',
      })
      setGames(items);
      setGamesDropdown(g);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
      usersSubscription.unsubscribe();
      gamesSubscription.unsubscribe();
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
            <View style={{ width: "100%" }}>
              <DropdownInput
                data={gamesDropdown}
                search
                placeholder='Playing a Game?'
                focusPlaceholder='...'
                searchPlaceholder="Search..."
                value={selectedGame?.id}
                setValue={handleSelectedGame}
                renderLeftIcon={(item) => (
                  <View style={{paddingRight: 10}}>
                    <Icon
                      size={20}
                      name={selectedGame ? selectedGame.iconName : 'game'}
                    />
                  </View>
                )}
                renderItem={(item) => (
                  <View style={{flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 2}}>
                    <View style={{paddingRight: 10, justifyContent: 'center'}}>
                      <Icon
                        size={typography.fontSizeL}
                        name={item.iconName}
                      />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <Text size={TextSizes.M}>
                        {item.label}
                      </Text>
                      <Text size={TextSizes.XS}>
                        {item.players}
                      </Text>
                    </View>
                  </View>
                )}
              />
              {selectedGame && (
                <>
                  <View style={{ paddingHorizontal: 15, paddingBottom: 10, width: "100%" }}>
                    <Text>
                      {JSON.stringify(teams)}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%', padding: 10, flexWrap: 'wrap', justifyContent: 'space-evenly', paddingVertical: (8 / -2)}}>
                    <View style={{padding: 8 / 2}}>
                      <Chip
                        onPress={() => console.log('Pressed')}
                        elevated
                        icon={(item) => (
                          <Avatar
                            // fileName={authStatus.image?.url}
                            name={'Indigo Miller'}
                            size={typography.fontSizeXS * 2}
                            variant="circle"
                            absolute={false}
                          />
                        )}
                        closeIcon={() => (
                          <Icon
                            size={typography.fontSizeXS * 2}
                            name={'close'}
                          />
                        )}
                        onClose={() => console.log('-- Close Chip --')}
                      >
                        <Text size={TextSizes.S}>
                          Indigo Miller
                        </Text>
                      </Chip>
                    </View>
                    <View style={{padding: 8 / 2}}>
                      <Chip
                        onPress={() => console.log('Pressed')}
                        elevated
                        icon={(item) => (
                          <Avatar
                            // fileName={authStatus.image?.url}
                            name={'Anna Wilson'}
                            size={typography.fontSizeXS * 2}
                            variant="circle"
                            absolute={false}
                          />
                        )}
                        closeIcon={() => (
                          <Icon
                            size={typography.fontSizeXS * 2}
                            name={'close'}
                          />
                        )}
                        onClose={() => console.log('-- Close Chip --')}
                      >
                        <Text size={TextSizes.S}>
                          Anna Wilson
                        </Text>
                      </Chip>
                    </View>
                    <View style={{padding: 8 / 2}}>
                      <Chip
                        onPress={() => console.log('Pressed')}
                        elevated
                        icon={(item) => (
                          <Avatar
                            // fileName={authStatus.image?.url}
                            name={'James Jones'}
                            size={typography.fontSizeXS * 2}
                            variant="circle"
                            absolute={false}
                          />
                        )}
                        closeIcon={() => (
                          <Icon
                            size={typography.fontSizeXS * 2}
                            name={'close'}
                          />
                        )}
                        onClose={() => console.log('-- Close Chip --')}
                      >
                        <Text size={TextSizes.S}>
                          James Jones
                        </Text>
                      </Chip>
                    </View>
                  </View>
                </>
              )}
            </View>
            <View style={{ paddingHorizontal: 15, width: "100%" }}>
              <TextInput
                label="What's going on?"
                clearButtonMode="while-editing"
                returnKeyType="default"
                value={messageBody}
                multiline
                keyboardType="default"
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
            <View style={{ width: "100%", paddingVertical: 10 }}>
              <Divider />
            </View>
            <View>
              <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                disabled={!isConnected}
                anchor={
                  images.length > 0 ? (
                    <ImageScroll images={images} doubleTapHandler={openMenu} singleTapHandler={openMenu} tapDelay={500} />
                  ) : (
                    <Pressable onPress={openMenu} disabled={!isConnected}>
                      {renderPlaceholder()}
                    </Pressable>
                  )}
                >
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
            <View style={{ width: "100%", paddingVertical: 10 }}>
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
              <View style={{ minWidth: "50%" }}>
                <Button
                  variant="primary"
                  onPress={savePost}
                  disabled={messageBody === "" && images.length === 0}
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
      <View style={{ backgroundColor: theme.colors.background, width: '100%', height: dimensions.height * .25, alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 5 }}>
        <Icon name='camera' size={typography.fontSizeXXXL} color={theme.colors.primary} />
        <Text color={theme.colors.primary} size={isConnected ? 'XXL' : 'L'} bold>
          {isConnected ? 'Add Photo(s)' : 'Must be online to add photos'}
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
