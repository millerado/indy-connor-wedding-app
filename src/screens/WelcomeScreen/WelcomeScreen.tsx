import React, { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { View, ScrollView, SafeAreaView, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appPasscode } from "../../../appConfig";
import { Text, TextInput, Button, TextSizes, ActivityIndicator } from "../../components";
import { SingleUserInModal } from "../../containers";
import { AuthContext, SnackbarContext, DataContext } from "../../contexts";
import { adminPasscode } from "../../../appConfig";
import styles from "./WelcomeScreenStyles";

const WelcomeScreen = () => {
  const [view, setView] = useState("passcode");
  const [passCodeError, setPassCodeError] = useState("");
  const [passCode, setPassCode] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clickedUser, setClickedUser] = useState(undefined);
  const [adminPassword, setAdminPassword] = useState("");

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { setAuthStatus } = useContext(AuthContext);
  const { setSnackbar } = useContext(SnackbarContext);
  const { allUsers } = useContext(DataContext);

  const rowClickedHandler = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    setClickedUser(user);
  };

  const confirmChangeUser = () => {
    setSearchText("");
    setAdminPassword("");
    setClickedUser(undefined);
    if (clickedUser) {
      setAuthStatus(clickedUser.fullObject);
      setSnackbar({
        message: `Now Signed-In as ${clickedUser.name}`,
        showCloseIcon: true,
      });
    }
  };

  const handlePasscodeSubmit = async () => {
    if (passCode.toLowerCase().trim() === appPasscode.toLowerCase()) {
      try {
        const jsonValue = JSON.stringify({
          passcodeConfirmed: true,
        });
        await AsyncStorage.setItem("@onboardingProcess", jsonValue);
        setView("selectUser");
      } catch (e) {
        console.log("Error Updating Storage", e);
      }
    } else {
      setPassCodeError("Incorrect Passcode");
    }
  };

  const updateSearchtext = (text: string) => {
    console.log("updateSearchtext", text);
    setSearchText(text);
    if (text.length > 0) {
      const filteredUsers = allUsers.filter((u) =>
        u.name.toLowerCase().includes(text.toLowerCase())
      );
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(allUsers);
    }
  };

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={ss.pageActivityIndicatorWrapper}>
        <ActivityIndicator size={60} />
      </View>
    );
  }, [ss]);

  const renderItem = ({ item: u, index }) => {
    return (
      <View key={u.id} style={{backgroundColor: theme.colors.background, paddingHorizontal: 5,}}>
        <SingleUserInModal
          key={u.id}
          userId={u.id}
          singleUser={u}
          index={index}
          rowClickedCallback={rowClickedHandler}
        />
        {clickedUser?.id === u.id && (
          <View style={{ padding: 5 }}>
            {clickedUser?.fullObject.admin && (
              <TextInput
                clearButtonMode="while-editing"
                maxLength={20}
                returnKeyType="done"
                label="Admin Password"
                dense
                value={adminPassword}
                autoCapitalize="none"
                enablesReturnKeyAutomatically={true}
                style={[ss.textInput, ss.modalTextInput, { marginBottom: 10 }]}
                onChangeText={(text) => setAdminPassword(text)}
              />
            )}
            <Button
              onPress={confirmChangeUser}
              disabled={
                clickedUser?.fullObject.admin &&
                adminPassword.toLowerCase() !== adminPasscode.toLowerCase()
              }
            >
              Use as {u.name}
            </Button>
          </View>
        )}
      </View>
    );
  };

  function renderHeader() {
    return (
      <View
        style={[
          ss.modalHeaderLightBackground,
        ]}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text color={theme.colors.primary} bold size={TextSizes.L}>
            Let us know who you are
          </Text>
          <TextInput
            clearButtonMode="while-editing"
            maxLength={50}
            returnKeyType="done"
            label="Search for a User"
            dense
            value={searchText}
            autoCapitalize="none"
            enablesReturnKeyAutomatically={true}
            autoComplete="name"
            textContentType="name"
            style={[ss.textInput, ss.modalTextInput]}
            onChangeText={(text) => updateSearchtext(text)}
          />
        </View>
      </View>
    )
  }

  const keyExtractor = useCallback((item) => item.id, []);

  useEffect(() => {
    if(displayedUsers.length === 0 || searchText.length === 0) {
      // console.log('-- UseEffect Setting Users --');
      setDisplayedUsers(allUsers);
    }
  }, [allUsers]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        if(Platform.OS === 'ios') {
          // iOS is an unlisted app, no need to show Passcode screen
          setView("selectUser");
          // console.log('-- iOS, skip passcode --');
        } else {
          const jsonValue = await AsyncStorage.getItem("@onboardingProcess");
          if (jsonValue) {
            const value = JSON.parse(jsonValue);
            if (!value.passcodeConfirmed) {
              setView("passcode");
            } else {
              setView("selectUser");
            }
          } else {
            setView("passcode");
          }
        }
      } catch (e) {
        console.log("-- Error loading onboarding data --", e);
      }
    };

    checkOnboarding();
  }, []);

  return (
    <SafeAreaView style={[{backgroundColor: theme.colors.primary}]}>
      {view === "passcode" ? (
        <ScrollView
          style={[ss.modalScrollView, { height: "100%", backgroundColor: theme.colors.background }]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View>
            <Text size={TextSizes.L} style={{ textAlign: "center" }} bold>
              Welcome to Indy and Connor's Wedding App!
            </Text>
            <Text size={TextSizes.L}>
              Please enter the passcode to access all the content for the weekend:
            </Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text size={TextSizes.S}>
              Hint: In what state is the wedding? (full name)
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
            <Button onPress={handlePasscodeSubmit}>Submit Passcode</Button>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text size={TextSizes.L}>
              This app is in the public {Platform.OS === "android" ? 'Android Play Store' : 'iOS App Store'}, so we need this
              passcode to ensure only guests of our wedding can access the content.
            </Text>
          </View>
        </ScrollView>
      ) : (
          <View style={{backgroundColor: theme.colors.primary, width: '100%'}}>
            <FlatList
              data={displayedUsers}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListHeaderComponent={renderHeader()}
              stickyHeaderIndices={[0]}
              removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
              maxToRenderPerBatch={10} // Also the default
              initialNumToRender={10} // Also the default
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              ListEmptyComponent={listEmptyComponent}
              // style={ss.modalScrollView}
            />
          </View>
      )}
    </SafeAreaView>
  );
};

export default WelcomeScreen;
