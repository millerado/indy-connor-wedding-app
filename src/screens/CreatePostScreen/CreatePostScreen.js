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
  DropdownInput,
  MultiselectInput,
  ConditionalWrapper,
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
  const [formValid, setFormValid] = useState(false);

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
    if (formValid) {
      try {
        // await DataStore.stop();
        const imagesArray = [];
        if(images.length > 0) {
          for(let i = 0; i < images.length; i++) {
            imagesArray.push(JSON.stringify(images[i]));
          }
        }
        // Create an array of userIds from messageBody based Regex matches on [username](userId)
        const regex = /@\[(.*?)\]\((.*?)\)/g;
        const matches = messageBody.match(regex);
        const taggedUserIds = [authStatus.userId]; // And make sure the creating-user is included
        if (matches) {
          matches.forEach((match) => {
            const [, username, userId] = match.match(/@\[(.*?)\]\((.*?)\)/);
            taggedUserIds.push(userId);
          });
        }

        // Create an array of userIds from the array of teams.players
        const teamUserIds = [];
        if (selectedGame) {
          for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            for (let j = 0; j < team.players.length; j++) {
              teamUserIds.push(team.players[j]);
            }
          }
        }

        // Combine the two arrays of userIds, and remove duplicates
        const allUserIds = [...new Set([...taggedUserIds, ...teamUserIds])];

        const gamePoints = [];
        if(selectedGame) {
          for(let i = 0; i < teams.length; i++) {
            if(teams[i].points > 0) {
              for(let j = 0; j < teams[i].players.length; j++) {
                gamePoints.push({
                  userId: teams[i].players[j],
                  points: teams[i].points,
                });
              }
            }
          }
        }

        const eventDetails = {
          game: selectedGame,
          teams: teams,
          points: gamePoints,
        }

        const newPost = await DataStore.save(
          new Posts({
            userId: authStatus.userId,
            messageBody,
            images: imagesArray,
            olympicEvent: selectedGame ? true : false,
            eventDetails: selectedGame ? JSON.stringify(eventDetails) : null,
            usersInPost: allUserIds,
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
      setError("Please Upload an Image or Fill in a Message (or fix your game details)");
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
    const users = allUsers.map((user) => {
      return user.fullObject;
    });
    return TaggingUserSuggestions(keyword, onSuggestionPress, users);
  };

  const handleSelectedGame = (item) => {
    const game = games.find((g) => g.id === item);
    setSelectedGame(game);
    if(game) {
      // console.log('-- Full Game Details --', game);
      const { canHaveMultipleWinners, minNumberOfPlayersPerTeam, maxNumberOfPlayersPerTeam, minNumberOfTeams, maxNumberOfTeams, points, rules } = game;
      const newTeams = [];
      for(let i = 1; i < points.length; i++) {
        const point = points[i];
        let playerString = '';
        if (canHaveMultipleWinners) {
          playerString = `at least ${minNumberOfPlayersPerTeam} player`;
        } else {
          if(minNumberOfPlayersPerTeam === maxNumberOfPlayersPerTeam) {
            playerString = `${minNumberOfPlayersPerTeam} player${minNumberOfPlayersPerTeam > 1 ? 's' : ''}`;
          } else if (!maxNumberOfPlayersPerTeam) {
            playerString = `at least ${minNumberOfPlayersPerTeam} player${minNumberOfPlayersPerTeam > 1 ? 's' : ''}`;
          } else {
            playerString = `${minNumberOfPlayersPerTeam}-${maxNumberOfPlayersPerTeam} players`;
          }
        }
        newTeams.push({
          id: i,
          name: `${nth(i)} Place`,
          label: `${nth(i)} Place (${playerString})`,
          points: point,
          players: [],
          minPlayers: minNumberOfPlayersPerTeam,
          maxPlayers: canHaveMultipleWinners ? null : maxNumberOfPlayersPerTeam,
          canHaveMultipleWinners,
        });
      }

      // Based on the number of teams in newTeam, minNumberOfPlayersPerTeam, maxNumberOfPlayersPerTeam (nullable), minNumberOfTeam, maxNumberOfTeams (nullable), and canHaveMultipleWinners
      // Determine the minimum and maximum players for the "everyone else" bucket
      // If there is a maxNumberOfTeams, then the minimum number of players is the maxNumberOfTeams * minNumberOfPlayersPerTeam
      // If there is a maxNumberOfTeams, then the maximum number of players is the maxNumberOfTeams * maxNumberOfPlayersPerTeam
      // If there is no maxNumberOfTeams, then the minimum number of players is minNumberOfTeams * minNumberOfPlayersPerTeam
      // If there is no maxNumberOfTeams, then the maximum number of players is null
      const minNumberInTeams = newTeams.length * minNumberOfPlayersPerTeam;
      const maxNumberInTeams = newTeams.length * maxNumberOfPlayersPerTeam;
      let minNumberOfPlayersForEveryoneElse = null; 
      let maxNumberOfPlayersForEveryoneElse = null;
      if (maxNumberOfTeams) {
        minNumberOfPlayersForEveryoneElse = (minNumberOfTeams * minNumberOfPlayersPerTeam) - minNumberInTeams;
        maxNumberOfPlayersForEveryoneElse = (maxNumberOfTeams * maxNumberOfPlayersPerTeam) - maxNumberInTeams;
      } else {
        minNumberOfPlayersForEveryoneElse = (minNumberOfTeams * minNumberOfPlayersPerTeam) - minNumberInTeams;
      }

      let playerString = '';
      if(maxNumberOfPlayersForEveryoneElse) {
        if(minNumberOfPlayersForEveryoneElse === maxNumberOfPlayersForEveryoneElse) {
          playerString = `${minNumberOfPlayersForEveryoneElse} player${minNumberOfPlayersForEveryoneElse > 1 ? 's' : ''}`;
        } else {
          playerString = `${minNumberOfPlayersForEveryoneElse}-${maxNumberOfPlayersForEveryoneElse} player${maxNumberOfPlayersForEveryoneElse > 1 ? 's' : ''}`;
        }
      } else {
        playerString = `at least ${minNumberOfPlayersForEveryoneElse} player${minNumberOfPlayersForEveryoneElse > 1 ? 's' : ''}`;
      }

      newTeams.push({
        id: 0,
        name: 'Everyone Else',
        label: `Everyone Else (${playerString})`,
        points: points[0],
        players: [],
        minPlayers: minNumberOfPlayersForEveryoneElse,
        maxPlayers: maxNumberOfPlayersForEveryoneElse,
        canHaveMultipleWinners,
      })
      setTeams(newTeams);
    } else {
      // They selected None
      console.log('-- No Game Selected, RESET --');
      setTeams([]);
    }
  };

  const handleMultiselectChange = (teamId, newValues) => {
    const newTeams = [...teams];
    const teamIndex = newTeams.findIndex((t) => t.id === teamId);
    newTeams[teamIndex].players = newValues;
    setTeams(newTeams);
  }

  const handleRemovePlayer = (teamId, playerId) => {
    const newTeams = [...teams];
    const teamIndex = newTeams.findIndex((t) => t.id === teamId);
    const teamPlayers = newTeams[teamIndex].players.filter((p) => p !== playerId);
    newTeams[teamIndex].players = teamPlayers;
    setTeams(newTeams);
  }

  const handleTeamSetSinglePlayer = (teamId, playerId) => {
    const newTeams = [...teams];
    const teamIndex = newTeams.findIndex((t) => t.id === teamId);
    const teamPlayers = newTeams[teamIndex].players = [playerId];
    newTeams[teamIndex].players = teamPlayers;
    setTeams(newTeams);
  }

  const addSaveButton = (disabled) => {
    return (
      <Button
        variant="primary"
        onPress={savePost}
        disabled={disabled}
        short
      >
        Save
      </Button>
    );
  }

  useEffect(() => {
    if (selectedGame) {
      let allTeamsValid = true;
      for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        if (team.players.length < team.minPlayers) {
          allTeamsValid = false;
          break;
        }
      }
      setFormValid(allTeamsValid);
    } else {
      // There's no game, we only need to know if they wrote a message or added 1+ images
      setFormValid(messageBody !== '' || images.length > 0);
    }
  }, [messageBody, images, selectedGame, teams]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => addSaveButton(!formValid),
    });
  }, [formValid]);

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

    const usersSubscription = DataStore.observeQuery(Users, Predicates.ALL, {
      sort: (u) => u.name(SortDirection.ASCENDING),
    }).subscribe(({ items }) => {
      const newUsers = items.map((u) => {
        return {
          id: u.id,
          name: u.name,
          image: u.image ? JSON.parse(u.image) : undefined,
          fullObject: u,
          label: u.name,
          value: u.id,
        };
      });
  
      // Quick check to make sure we're only updating state if the subscription caught a change that we care about
      if (newUsers !== allUsers) {
        setAllUsers(newUsers);
      }
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
                      size={typography.fontSizeXS * 2}
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
                  {teams.map((team, index) => {
                    if(team.maxPlayers === 1) {
                      // console.log('-- Team --', team);
                      return (
                        <DropdownInput
                          key={index}
                          data={allUsers}
                          search
                          placeholder={team.name}
                          label={team.label}
                          focusPlaceholder='...'
                          searchPlaceholder="Search..."
                          value={team.players[0]}
                          setValue={(item) => handleTeamSetSinglePlayer(team.id, item)}
                          renderLeftIcon={(item) => (
                            <View style={{paddingRight: 10}}>
                              {team.players.length > 0 ? (
                                <Avatar
                                  fileName={allUsers.find((u) => u.id === team.players[0])?.image?.url}
                                  name={allUsers.find((u) => u.id === team.players[0])?.name}
                                  size={typography.fontSizeXS * 2}
                                  variant="circle"
                                  absolute={false}
                                  textSize={TextSizes.S}
                                />
                              ) : (
                                <Icon
                                  size={typography.fontSizeXS * 2}
                                  name={'user'}
                                />
                              )}
                            </View>
                          )}
                          renderItem={(item) => (
                            <View style={{flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 2}}>
                              <View style={{paddingRight: 10, justifyContent: 'center'}}>
                                <Avatar
                                  fileName={item.image?.url}
                                  name={item.name}
                                  size={typography.fontSizeXS * 2}
                                  variant="circle"
                                  absolute={false}
                                  textSize={TextSizes.S}
                                />
                              </View>
                              <Text size={TextSizes.M}>
                                {item.name}
                              </Text>
                            </View>
                          )}
                        />
                      );
                    } else {
                      return (
                        <View key={index}>
                          <MultiselectInput
                            key={index}
                            data={allUsers}
                            search
                            // placeholder={team.name}
                            maxSelect={team.maxPlayers}
                            placeholder={team.label}
                            label={team.label}
                            focusPlaceholder='...'
                            searchPlaceholder="Search..."
                            values={team.players}
                            setValues={(item) => handleMultiselectChange(team.id, item)}
                            valueField="id"
                            renderLeftIcon={(item) => (
                              <View style={{paddingRight: 10}}>
                                <Icon
                                  size={typography.fontSizeXS * 2}
                                  name={'user'}
                                />
                              </View>
                            )}
                            renderItem={(item) => (
                              <View style={{flexDirection: 'row', paddingHorizontal: 5, paddingVertical: 2}}>
                                <View style={{paddingRight: 10, justifyContent: 'center'}}>
                                  <Avatar
                                    fileName={item.image?.url}
                                    name={item.name}
                                    size={typography.fontSizeXS * 2}
                                    variant="circle"
                                    absolute={false}
                                    textSize={TextSizes.S}
                                  />
                                </View>
                                <Text size={TextSizes.M}>
                                  {item.name}
                                </Text>
                              </View>
                            )}
                            visibleSelectedItem={false}
                          />
                          <ConditionalWrapper
                            condition={team.players.length > 0}
                            wrapper={(children) => (
                              <View style={{flexDirection: 'row', width: '100%', paddingHorizontal: 10, marginBottom: 10, flexWrap: 'wrap', justifyContent: 'space-evenly', paddingVertical: (8 / -2)}}>
                                {children}
                              </View>
                            )}
                          >
                            {team.players.map((player, index) => {
                              const playerData = allUsers.find((u) => u.id === player);
                              if(playerData) {
                                return(
                                  <View style={{padding: 8 / 2}} key={index}>
                                    <Chip
                                      elevated
                                      icon={(item) => (
                                        <Avatar
                                          fileName={playerData.image?.url}
                                          name={playerData.name}
                                          size={typography.fontSizeXS * 2}
                                          textSize={TextSizes.S}
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
                                      onClose={() => handleRemovePlayer(team.id, player)}
                                    >
                                      <Text size={TextSizes.S}>
                                        {team.players.length <=2 ? playerData.name : ''}
                                      </Text>
                                    </Chip>
                                  </View>
                                )
                              }
                              return null;
                            })}
                          </ConditionalWrapper>
                        </View>
                      );
                    }
                  })}
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
                          textStyle: { fontWeight: 'bold', color: theme.colors.primary }, // The mention style in the input
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
                  disabled={!formValid}
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
