import React, { useContext, useState } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, TextSizes } from "../../components";
import { AuthContext } from "../../contexts";
import { IntroModal } from "../../containers";

const HomeScreen = () => {
  const theme = useTheme();

  const authContect = useContext(AuthContext);
  const {authStatus} = authContect;

  return (
    <>
      <IntroModal />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <Text size={TextSizes.L}>Home Screen</Text>
        <Text>
          {JSON.stringify(authStatus)}
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;
