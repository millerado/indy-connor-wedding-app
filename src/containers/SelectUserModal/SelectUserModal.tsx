import React, { useMemo, useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Auth, Predicates, SortDirection } from "aws-amplify";
import { Modal, Text, TextSizes, TextInput } from "../../components";
import { DataStore } from "../../utils";
import { Users } from "../../models";
import { AuthContext, SnackbarContext } from "../../contexts";
import SingleUserInModal from "../SingleUserInModal/SingleUserInModal";
import styles from "./SelectUserModalStyles";

interface SelectUserModalProps {
  showModal: boolean;
  closeModal: () => void;
}

const SelectUserModal = (props: SelectUserModalProps) => {
  const { showModal, closeModal } = props;
  const [allUsers, setAllUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const snackbarContext = useContext(SnackbarContext);
  const { setSnackbar } = snackbarContext;

  const authContext = useContext(AuthContext);
  const { setAuthStatus, authStatus } = authContext;

  const fetchUsers = async () => {
    // await DataStore.stop();
    const dt = await DataStore.query(Users, Predicates.ALL, {
      sort: (u) => u.name(SortDirection.ASCENDING),
    });
    const newUsers = dt.map((u) => {
      return {
        id: u.id,
        name: u.name,
        image: u.image ? JSON.parse(u.image) : undefined,
        fullObject: u,
      };
    });
    
    // Quick check to make sure we're only updating state if the subscription caught a change that we care about
    if (newUsers !== allUsers) {
      setAllUsers(newUsers);
      if(!searchText) {
        setDisplayedUsers(newUsers);
      }
    }
  };

  useEffect(() => {
    // Subscribe to Users
    const usersSubscription = DataStore.observe(Users).subscribe((u) => {
      if (showModal) {
        fetchUsers();
      }
    });

    if (showModal) {
      fetchUsers();
    }

    return () => {
      usersSubscription.unsubscribe();
    };
  }, [showModal]);

  const rowClickedHandler = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId);
    closeModal();
    if (user) {
      setAuthStatus(user.fullObject);
      setSnackbar({
        message: `Now Signed-In as ${user.name}`,
        showCloseIcon: true,
      });
    }
  };

  const updateSearchtext = (text: string) => {
    setSearchText(text);
    if(text.length > 0) {
      const filteredUsers = allUsers.filter(u => u.name.toLowerCase().includes(text.toLowerCase()));
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(allUsers);
    }
  }

  return (
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
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text color={theme.colors.onSecondary} bold size={TextSizes.L}>
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
                style={[
                  ss.textInput,
                  ss.modalTextInput,
                ]}
                onChangeText={(text) => updateSearchtext(text)}
              />
            </View>
          </View>
          <View style={ss.modalContentWrapper}>
            <ScrollView
              style={ss.modalScrollView}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              {displayedUsers.map((u, index) => (
                <SingleUserInModal
                  key={u.id}
                  userId={u.id}
                  singleUser={u}
                  index={index}
                  rowClickedCallback={rowClickedHandler}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectUserModal;
