import React, { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { View, ScrollView, SafeAreaView, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from 'aws-amplify';
import { GraphQLQuery } from '@aws-amplify/api';
import { appPasscode } from "../../../appConfig";
import * as queries from '../../graphql/queries'
import { ListUsersQuery } from '../../API';
import { Text, TextInput, Button, TextSizes, ActivityIndicator } from "../../components";
import { SingleUserInModal } from "../../containers";
import { AuthContext, SnackbarContext } from "../../contexts";
import { adminPasscode } from "../../../appConfig";
import styles from "./WelcomeScreenStyles";

const WelcomeScreen = () => {
  const [view, setView] = useState("passcode");
  const [passCodeError, setPassCodeError] = useState("");
  const [passCode, setPassCode] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clickedUser, setClickedUser] = useState(undefined);
  const [adminPassword, setAdminPassword] = useState("");

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { setAuthStatus } = useContext(AuthContext);
  const { setSnackbar } = useContext(SnackbarContext);

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
        // setShowPassCodeModal(false);
        // openSelectUserModal();
      } catch (e) {
        console.log("Error Updating Storage", e);
      }
    } else {
      setPassCodeError("Incorrect Passcode");
    }
  };

  const updateSearchtext = (text: string) => {
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

  const listHeader = useCallback(() => {
    return (
      <View
        style={[
          ss.modalHeader,
        ]}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text color={theme.colors.onModalHeader} bold size={TextSizes.L}>
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
    );
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
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
      } catch (e) {
        console.log("-- Error loading onboarding data --", e);
      }
    };

    checkOnboarding();
  }, []);

  // CT 7/2/23: Moving from a Subscription to a GraphQL call so that I can reset datastore and not have it be an issue
  // useEffect(() => {
  //   // Subscribe to Users
  //   const usersSubscription = DataStore.observeQuery(Users, Predicates.ALL, {
  //     sort: (u) => u.name(SortDirection.ASCENDING),
  //   }).subscribe(({ items }) => {
  //     const newUsers = items.map((u) => {
  //       return {
  //         id: u.id,
  //         name: u.name,
  //         image: u.image ? JSON.parse(u.image) : undefined,
  //         fullObject: u,
  //       };
  //     });

  //     // Quick check to make sure we're only updating state if the subscription caught a change that we care about
  //     // if (JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
  //       setAllUsers(newUsers);
  //       if (!searchText) {
  //         setDisplayedUsers(newUsers);
  //       }
  //     // }
  //   });

  //   return () => {
  //     usersSubscription.unsubscribe();
  //   };
  // }, []);

    useEffect(() => {
      const getData = async () => {
        // console.log('-- App UseEffect --');
        const allUsers = await API.graphql({ query: queries.listUsers, variables: { limit: 999999999 } });

        const items = allUsers?.data?.listUsers?.items;
        if(items) {
          const newUsers = items.map((u) => {
            return {
              id: u.id,
              name: u.name,
              image: u.image ? JSON.parse(u.image) : undefined,
              fullObject: u,
            };
          });
          newUsers.sort((a, b) => a.name.localeCompare(b.name));
    
          setAllUsers(newUsers);
          setDisplayedUsers(newUsers);
        }

        // console.log('Set Users of Length', allUsers.data.listUsers.items.length);
      };
      getData();
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
              This app is in the public iOS and Android store, so we need this
              passcode to ensure only guests of our wedding can access the content
            </Text>
          </View>
        </ScrollView>
      ) : (
          <View style={{backgroundColor: theme.colors.primary, width: '100%'}}>
            <FlatList
              data={displayedUsers}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListHeaderComponent={listHeader}
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
