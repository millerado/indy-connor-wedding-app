import React, { useContext, useState, useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, TextSizes } from "../../components";
import { AuthContext } from "../../contexts";
import { IntroModal } from "../../containers";
import styles from './HomeScreenStyles';

const HomeScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authContect = useContext(AuthContext);
  const {authStatus} = authContect;

  return (
    <>
      <IntroModal />
      <View style={ss.pageWrapper}>
        <Text size={TextSizes.L}>Home Screen</Text>
        <Text>
          {JSON.stringify(authStatus)}
        </Text>
      </View>
    </>
  );
};

export default HomeScreen;
