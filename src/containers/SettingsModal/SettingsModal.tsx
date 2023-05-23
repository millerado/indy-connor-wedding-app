import React, { useMemo, useState, useContext } from "react";
import { Pressable, ScrollView, View, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Text, Button, Modal, TextInput, TextSizes } from "../../components";
import { typography } from "../../styles";
import { ThemeContext, AuthContext } from "../../contexts";
import { sendGlobalPushNotification, DataStore } from '../../utils';
import { Users, Teams, StandingsPeople, StandingsTeams } from '../../models';
import SelectUserModal from '../SelectUserModal/SelectUserModal';
import styles from "./SettingsModalStyles";
import { Predicates } from "aws-amplify";

const SettingsModal = () => {
  const [view, setView] = useState("settings");
  const [showModal, setShowModal] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationSending, setNotificationSending] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");
  const [showSelectUserModal, setShowSelectUserModal] = useState(false);

  const navigation = useNavigation();

  // Get theme Context
  const themeContext = useContext(ThemeContext);
  const { themeName, setThemeName } = themeContext;

  // Get the Auth Context
  const authStatus = useContext(AuthContext).authStatus;

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const handleSendNotification = async () => {
    if(authStatus.isAdmin) {
      setNotificationSending(true);
      Keyboard.dismiss();
      // TO-DO: Turn this back on once we have push notifications
      // sendGlobalPushNotification(
      //   'T Party',
      //   notificationText,
      //   {}
      // );
      setNotificationSending(false);
      setNotificationText("");
      setNotificationStatus("Notification sent!");
    }
  }

  const openNotificationDialog = () => {
    if (authStatus.isAdmin) {
      setView('notification');
    }
  }

  // Handlers for presses
  const openModal = () => {
    setShowModal(true);
    setNotificationText("");
  };

  const closeModal = () => {
    setShowModal(false);
    setView('settings');
    setNotificationText("");
    setNotificationStatus('');
    setNotificationSending(false);
  };

  const handleThemeChange = async (newThemeName) => {
    setThemeName(newThemeName);
  }

  const goToUserPage = async () => {
    closeModal();
    navigation.push("User", {
      userId: authStatus.userId,
      name: authStatus.name,
      picture: authStatus.image,
    });
  };

  const goToMostLikedPage = async () => {
    closeModal();
    navigation.push("Most Liked Posts");
  }

  const goToGamesPage = async () => {
    closeModal();
    navigation.push("Games List");
  };

  const openSelectUserModal = () => {
    closeModal();
    // Timeout only here to let one modal disappear before the other appears (iOS breaks if two mdoals are open)
    // ...Yes, this is ugly...
    setTimeout(() => {
      setShowSelectUserModal(true);
    }, 350);
  }

  const closeSelectUserModal = () => {
    setShowSelectUserModal(false);
  };

  const resetDatastore = async () => {
    await DataStore.stop();
    await DataStore.clear();
    await DataStore.start();
  }

  const createFakeStandings = async () => {
    await DataStore.delete(StandingsPeople, Predicates.ALL);
    await DataStore.delete(StandingsTeams, Predicates.ALL);
    const users = await DataStore.query(Users);
    const teams = await DataStore.query(Teams);
    const standingsPeople = users.map((user) => {
      return {
        userId: user.id,
        teamId: user.teamsID,
        points: Math.floor(Math.random() * 50),
        rank: 0
      }
    });
    standingsPeople.sort((a, b) => b.points - a.points);
    standingsPeople.forEach((standing, index) => {
      standing.rank = index + 1;
    });
    const standingsTeams = teams.map((team) => {
      // Sum up all points from stndingsPeople where teamId === team.id
      const teamPoints = standingsPeople.reduce((acc, standing) => {
        if (standing.teamId === team.id) {
          return acc + standing.points;
        }
        return acc;
      }, 0);

      return {
        teamId: team.id,
        points: teamPoints,
        rank: 0
      }
    });
    standingsTeams.sort((a, b) => b.points - a.points);
    standingsTeams.forEach((standing, index) => {
      standing.rank = index + 1;
    });

    for(let i = 0; i < standingsPeople.length; i++) {
      await DataStore.save(new StandingsPeople({
        userId: standingsPeople[i].userId,
        points: standingsPeople[i].points,
        rank: standingsPeople[i].rank,
      }));
    }
    for(let i = 0; i < standingsTeams.length; i++) {
      await DataStore.save(new StandingsTeams({
        teamId: standingsTeams[i].teamId,
        rank: standingsTeams[i].rank,
        points: standingsTeams[i].points,
      }));
    }
  }

  return (
    <>
      <Pressable onPress={openModal}>
        <Icon name='settings' color={theme.colors.primary} size={typography.fontSizeXXL} />
      </Pressable>
      <SelectUserModal showModal={showSelectUserModal} closeModal={closeSelectUserModal} fullScreen={false} />
      <Modal
        isVisible={showModal}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        avoidKeyboard={true}
        style={{ padding: 0, margin: 0 }}
      >
        <View style={ss.modalBackground}>
          <View style={ss.modalBody}>
            <View style={ss.modalHeader}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Button
                  onPress={closeModal}
                  compact
                  variant='onModalHeader'
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: view === 'settings' ? 1 : 2, alignItems: 'center' }}>
                <Text
                  color={theme.colors.white}
                  bold
                  size={TextSizes.M}>
                  {view === 'settings' ? 'Settings' : 'Send Global Notification'}
                </Text>
              </View>
              <View style={{ flex: view === 'settings' ? 1 : 0 }}></View>
            </View>
            {view === 'settings' ? (
              <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
                <View>
                  {/* <Button
                    onPress={() => handleThemeChange(themeName === "Dark" ? 'Light' : 'Dark')}
                  >
                    Switch to {themeName === "Dark" ? 'Light' : 'Dark'} Mode
                  </Button> */}
                  {authStatus.isAuthed && (
                    <Button onPress={goToUserPage} style={{marginTop: 10}}>
                      View my User Profile
                    </Button>
                  )}
                  <Button onPress={openSelectUserModal} style={{marginTop: 10}}>
                    {authStatus.isAuthed ? 'Change User' : 'Sign In to App'}
                  </Button>
                  {authStatus.isAdmin && (
                    <Button onPress={openNotificationDialog} style={{marginTop: 10}}>
                      Send Global Notification
                    </Button>
                  )}
                  {authStatus.isAuthed && (
                    <Button onPress={goToGamesPage} style={{marginTop: 10}}>
                      Manage Games
                    </Button>
                  )}
                  {authStatus.isAdmin && (
                    <Button onPress={goToMostLikedPage} style={{marginTop: 10}}>
                      Most Liked Posts
                    </Button>
                  )}
                  {authStatus.isAdmin && (
                    <Button onPress={resetDatastore} style={{marginTop: 10}}>
                      Debug Reset Datastore
                    </Button>
                  )}
                  {authStatus.isAdmin && (
                    <Button onPress={createFakeStandings} style={{marginTop: 10}}>
                      Create Fake Standings
                    </Button>
                  )}
                </View>
              </ScrollView>
            ) : (
              <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
                <View style={{ flex: 1, alignItems: 'center', padding: 10, justifyContent: "space-evenly" }}>
                  <TextInput
                    clearButtonMode="while-editing"
                    maxLength={250}
                    returnKeyType="done"
                    label="Notification Message"
                    dense
                    value={notificationText}
                    enablesReturnKeyAutomatically={true}
                    keyboardType="default"
                    style={[
                      ss.textInput,
                      ss.modalTextInput,
                      // ss.textInputWrapper,
                    ]}
                    onChangeText={(text) => setNotificationText(text)}
                    disabled={notificationSending}
                  />
                  <View style={{paddingTop: 10}}>
                    <Text>Please read this carefully, it'll go to everyone</Text>
                  </View>
                  <View style={{paddingTop: 10}}>
                    <Button disabled={notificationText.length === 0 || notificationSending} onPress={handleSendNotification} >
                      Send Message
                    </Button>
                  </View>
                  {notificationStatus.length > 0 && (
                    <View style={{paddingTop: 10}}>
                      <Text size={TextSizes.L} bold>{notificationStatus}</Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SettingsModal;
