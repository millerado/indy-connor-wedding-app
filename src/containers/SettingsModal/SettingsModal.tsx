import React, { useMemo, useState, useContext } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Text, Button, Modal, TextSizes } from "../../components";
import { typography } from "../../styles";
import { ThemeContext, AuthContext, UnauthedUser } from "../../contexts";
import { DataStore } from '../../utils';
import styles from "./SettingsModalStyles";

const SettingsModal = () => {
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  // Get theme Context
  const themeContext = useContext(ThemeContext);
  const { themeName, setThemeName } = themeContext;

  // Get the Auth Context
  const { authStatus, setAuthStatus } = useContext(AuthContext);

  // Load theme for use in the file
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const openNotificationDialog = () => {
    closeModal();
    if (authStatus.isAdmin) {
      navigation.navigate('Send Notification');
    }
  }

  // Handlers for presses
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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

  const handleChangeUserPress = () => {
    closeModal();
    // Timeout only here to let one modal disappear before the other appears (iOS breaks if two mdoals are open)
    // ...Yes, this is ugly...
    setTimeout(() => {
      setAuthStatus(UnauthedUser);
      // setShowSelectUserModal(true);
    }, 350);
  }

  const resetDatastore = async () => {
    await DataStore.stop();
    await DataStore.clear();
    await DataStore.start();
  }

  return (
    <>
      <Pressable onPress={openModal}>
        <Icon name='settings' color={theme.colors.primary} size={typography.fontSizeXXL} />
      </Pressable>
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
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text
                  color={theme.colors.white}
                  bold
                  size={TextSizes.M}>
                  Settings
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
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
                <Button onPress={handleChangeUserPress} style={{marginTop: 10}}>
                  {authStatus.isAuthed ? 'Change User' : 'Sign In to App'}
                </Button>
                {authStatus.isAdmin && (
                  <Button onPress={openNotificationDialog} style={{marginTop: 10}}>
                    Send Global Notification
                  </Button>
                )}
                {authStatus.isAdmin && (
                  <Button onPress={goToGamesPage} style={{marginTop: 10}}>
                    Manage Games
                  </Button>
                )}
                {authStatus.isAdmin && (
                  <Button onPress={goToMostLikedPage} style={{marginTop: 10}}>
                    Most Liked Posts
                  </Button>
                )}
                {/* {authStatus.isAdmin && (
                  <Button onPress={resetDatastore} style={{marginTop: 10}}>
                    Debug Reset Datastore
                  </Button>
                )} */}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SettingsModal;
