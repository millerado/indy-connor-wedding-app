import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Button, IconButton, Switch, TextInput, TextSizes, Avatar } from "../../components";
import { ThemeContext, AuthContext } from "../../contexts";
import { IntroModal, SingleUserInModal, SelectUserModal } from "../../containers";

const HomeScreen = () => {
  const [showSelectUserModal, setShowSelectUserModal] = useState(false);
  const theme = useTheme();
  // Get theme Context
  const themeContext = useContext(ThemeContext);
  const { themeName, setThemeName } = themeContext;

  const closeSelectUserModal = () => {
    setShowSelectUserModal(false);
  };

  return (
    <>
      <IntroModal />
      <SelectUserModal showModal={showSelectUserModal} closeModal={closeSelectUserModal} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <Text size={TextSizes.L}>Home Screen</Text>
        <Button mode="contained" onPress={() => setShowSelectUserModal(true)}>Test</Button>
        <IconButton icon="camera" mode="contained" />
        <Switch />
        <View style={{ height: 50, width: 300 }}>
          <TextInput label="Email" />
        </View>
        <View style={{height: 20, width: 20, backgroundColor: theme.colors.primary}} />
        <View style={{height: 20, width: 20, backgroundColor: theme.colors.secondary}} />
        <View style={{height: 20, width: 20, backgroundColor: theme.colors.tertiary}} />
        <Text>Theme Name: {themeName}</Text>
        <Button
          onPress={() => {
            setThemeName(themeName === "Light" ? "Dark" : "Light");
          }}
          disabled={false}
        >
          Toggle Theme
        </Button>
        <Avatar name="Indy Miller" size={40} variant='circle' />
        <SingleUserInModal userId="1" index={0} singleUser={{id: '1', name: 'Connor Tyrrell', }} />
      </View>
    </>
  );
};

export default HomeScreen;
