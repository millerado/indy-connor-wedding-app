import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Button, IconButton, Switch, TextInput, TextSizes, Avatar } from "../../components";
import { ThemeContext, AuthContext } from "../../contexts";
import { IntroModal, SingleUserInModal, SelectUserModal } from "../../containers";

const HomeScreen = () => {
  const [showSelectUserModal, setShowSelectUserModal] = useState(false);
  const theme = useTheme();

  const authContect = useContext(AuthContext);
  const {authStatus} = authContect;

  const closeSelectUserModal = () => {
    setShowSelectUserModal(false);
  };

  return (
    <>
      <IntroModal />
      <SelectUserModal showModal={showSelectUserModal} closeModal={closeSelectUserModal} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <Text size={TextSizes.L}>Home Screen</Text>
        <Button mode="contained" onPress={() => setShowSelectUserModal(true)}>Select User Modal</Button>
        <Text>
          {JSON.stringify(authStatus)}
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;
