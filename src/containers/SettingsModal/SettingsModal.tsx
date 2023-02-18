import React, { useMemo, useState, useContext } from "react";
import { Pressable, ScrollView, View, Keyboard } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Icon, Text, Button, Modal, TextInput } from "../../components";
import { typography } from "../../styles";
import { ThemeContext, AuthContext } from "../../contexts";
// import { sendGlobalPushNotification } from '../../utils';
import styles from "./SettingsModalStyles";

const SettingsModal = () => {
  const [view, setView] = useState("settings");
  const [showModal, setShowModal] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationSending, setNotificationSending] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState("");

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
      userId: authStatus.id,
      name: authStatus.name,
      picture: authStatus.picture,
    });
  };

  return (
    <>
      <Pressable onPress={openModal}>
        <Icon name='cog' color={theme.colors.primaryContainer} size={typography.fontSizeXXL} />
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
                  // variant="header"
                  onPress={closeModal}
                  compact
                >
                  Cancel
                </Button>
              </View>
              <View style={{ flex: view === 'settings' ? 1 : 2, alignItems: 'center' }}>
                <Text
                  color={theme.colors.white}
                  bold
                  size="M">
                  {view === 'settings' ? 'Settings' : 'Send Global Notification'}
                </Text>
              </View>
              <View style={{ flex: view === 'settings' ? 1 : 0 }}></View>
            </View>
            {view === 'settings' ? (
              <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
                <View style={{ flex: 1, alignItems: 'center', padding: 10, justifyContent: "space-evenly" }}>
                  <View>
                    <Button
                      onPress={() => handleThemeChange(themeName === "Dark" ? 'Light' : 'Dark')}
                    >
                      Switch to {themeName === "Dark" ? 'Light' : 'Dark'} Mode
                    </Button>
                  </View>
                  {authStatus.isAuthed && (
                    <View style={{ paddingTop: 10 }}>
                      <Button onPress={goToUserPage} >
                        View my User Profile
                      </Button>
                    </View>
                  )}
                  {authStatus.isAdmin && (
                    <View style={{ paddingTop: 10 }}>
                      <Button onPress={openNotificationDialog} >
                        Send Global Notification
                      </Button>
                    </View>
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
                      <Text size='L' bold>{notificationStatus}</Text>
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
