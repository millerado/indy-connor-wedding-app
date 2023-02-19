import React, { useState, useEffect, useMemo } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appPasscode } from "../../../appConfig";
import { Text, Modal, TextInput, Button, TextSizes } from "../../components";
import SelectUserModal from "../SelectUserModal/SelectUserModal";
import styles from "./IntroModalStyles";

const IntroModal = (props) => {
  const [showPassCodeModal, setShowPassCodeModal] = useState(false);
  const [passCodeError, setPassCodeError] = useState("");
  const [passCode, setPassCode] = useState("");
  const [showSelectUserModal, setShowSelectUserModal] = useState(false);

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const handleAttemptedClose = () => {
    console.log("-- User trying to close modal --");
  };

  const handlePasscodeSubmit = async () => {
    if (passCode.toLowerCase().trim() === appPasscode.toLowerCase()) {
      try {
        const jsonValue = JSON.stringify({
          passcodeConfirmed: true,
        });
        await AsyncStorage.setItem("@onboardingProcess", jsonValue);
        setShowPassCodeModal(false);
        openSelectUserModal(); 
      } catch (e) {
        console.log("Error Updating Storage", e);
      }
    } else {
      setPassCodeError("Incorrect Passcode");
    }
  };

  const openSelectUserModal = () => {
    // Timeout only here to let one modal disappear before the other appears (iOS breaks if two mdoals are open)
    // ...Yes, this is ugly...
    setTimeout(() => {
      setShowSelectUserModal(true);
    }, 350);
  };

  const closeSelectUserModal = () => {
    setShowSelectUserModal(false);
  };

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@onboardingProcess");
        if (jsonValue) {
          const value = JSON.parse(jsonValue);
          if (!value.passcodeConfirmed) {
            setShowPassCodeModal(true);
          }
        } else {
          setShowPassCodeModal(true);
        }
      } catch (e) {
        console.log("-- Error loading onboarding data --", e);
      }
    };

    // Timeout only here to let the splash screen clear before we pop a modal
    // ...Yes, this is ugly...
    setTimeout(() => {
      checkOnboarding();
    }, 300);
  }, []);

  return (
    <>
      <SelectUserModal
        showModal={showSelectUserModal}
        closeModal={closeSelectUserModal}
        fullScreen
      />
      <Modal
        isVisible={showPassCodeModal}
        onBackButtonPress={handleAttemptedClose}
        onBackdropPress={handleAttemptedClose}
        style={{ padding: 0, margin: 0 }}
      >
        <SafeAreaView
          style={{ flex: 0, backgroundColor: theme.colors.onPrimary }}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={[ss.modalBackground, ss.modalFullScreenBackground]}>
            <View style={ss.modalFullScreenBody}>
              <View style={[ss.modalHeader, ss.modalFullScreenHeader]}>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text
                    color={theme.colors.onSecondary}
                    bold
                    size={TextSizes.L}
                  >
                    Indigo and Connor's Wedding
                  </Text>
                </View>
              </View>
              <View style={ss.modalContentWrapper}>
                <ScrollView
                  style={[ss.modalScrollView, { height: "100%" }]}
                  keyboardShouldPersistTaps="handled"
                  keyboardDismissMode="on-drag"
                >
                  <View>
                    <Text size={TextSizes.L}>
                      Welcome to Indy and Connor's Wedding App! To access the
                      app, please enter the passcode:
                    </Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text size={TextSizes.S}>
                      Hint: It's the state the wedding is in (full state name)
                    </Text>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <TextInput
                      clearButtonMode="while-editing"
                      maxLength={50}
                      returnKeyType="go"
                      label="Passcode"
                      dense
                      value={passCode}
                      enablesReturnKeyAutomatically={true}
                      keyboardType="default"
                      style={[
                        // ss.textInput,
                        ss.modalFullScreenTextInput,
                        // ss.textInputWrapper,
                      ]}
                      onChangeText={(text) => setPassCode(text)}
                      onSubmitEditing={handlePasscodeSubmit}
                    />
                  </View>
                  {passCodeError !== "" && (
                    <View style={{ paddingTop: 10 }}>
                      <Text size={TextSizes.L} color={theme.colors.error}>
                        Incorrect Passcode
                      </Text>
                    </View>
                  )}
                  <View style={{ paddingTop: 10 }}>
                    <Button onPress={handlePasscodeSubmit}>
                      Submit Passcode
                    </Button>
                  </View>
                  <View style={{ paddingTop: 10 }}>
                    <Text size={TextSizes.L}>
                      Because the app is in the public iOS and Android app
                      store, we've added password protection to ensure that only
                      our guests will be using the application.
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default IntroModal;
