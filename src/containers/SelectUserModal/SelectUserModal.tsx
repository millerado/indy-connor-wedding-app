import React, {
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { View, ScrollView, SafeAreaView, FlatList, Platform } from "react-native";
import { useTheme } from "react-native-paper";
import { Predicates, SortDirection } from "aws-amplify";
import {
  Modal,
  Text,
  TextSizes,
  TextInput,
  Button,
  ConditionalWrapper,
} from "../../components";
import { DataStore } from "../../utils";
import { Users } from "../../models";
import { AuthContext, SnackbarContext } from "../../contexts";
import { adminPasscode } from "../../../appConfig";
import SingleUserInModal from "../SingleUserInModal/SingleUserInModal";
import styles from "./SelectUserModalStyles";

interface SelectUserModalProps {
  showModal: boolean;
  closeModal: () => void;
  fullScreen: boolean;
}

const SelectUserModal = (props: SelectUserModalProps) => {
  const { showModal, closeModal, fullScreen } = props;
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [clickedUser, setClickedUser] = useState(undefined);
  const [adminPassword, setAdminPassword] = useState("");

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { setSnackbar } = useContext(SnackbarContext);

  const authContext = useContext(AuthContext);
  const { setAuthStatus } = authContext;

  const rowClickedHandler = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    setClickedUser(user);
  };

  const confirmChangeUser = () => {
    closeModal();
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

  const handleAttemptedClose = () => {
    console.log("-- User trying to close modal --");
  };

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
          fullScreen ? ss.modalFullScreenHeader : undefined,
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
    // Subscribe to Users
    const usersSubscription = DataStore.observeQuery(Users, Predicates.ALL, {
      sort: (u) => u.name(SortDirection.ASCENDING),
    }).subscribe(({ items }) => {
      const newUsers = items.map((u) => {
        return {
          id: u.id,
          name: u.name,
          image: u.image ? JSON.parse(u.image) : undefined,
          fullObject: u,
        };
      });

      // Quick check to make sure we're only updating state if the subscription caught a change that we care about
      // if (JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
        setAllUsers(newUsers);
        if (!searchText) {
          setDisplayedUsers(newUsers);
        }
      // }
    });

    return () => {
      usersSubscription.unsubscribe();
    };
  }, []);

  return (
    <Modal
      isVisible={showModal}
      onBackButtonPress={fullScreen ? handleAttemptedClose : closeModal}
      onBackdropPress={fullScreen ? handleAttemptedClose : closeModal}
      avoidKeyboard={true}
      style={{ padding: 0, margin: 0 }}
    >
      <ConditionalWrapper
        condition={fullScreen}
        wrapper={(children) => (
          <>
            <SafeAreaView
              style={{ flex: 0, backgroundColor: theme.colors.onPrimary }}
            />
            <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
          </>
        )}
      >
        <View
          style={[
            ss.modalBackground,
            fullScreen ? ss.modalFullScreenBackground : undefined,
          ]}
        >
          <View style={[fullScreen ? ss.modalFullScreenBody : ss.modalBody, {backgroundColor: theme.colors.primary}]}>
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
              // style={ss.modalScrollView}
            />
          </View>
        </View>
      </ConditionalWrapper>
    </Modal>
  );
};

export default SelectUserModal;
