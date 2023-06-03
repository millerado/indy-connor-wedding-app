import React, { useMemo, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Divider } from "../../components";
import { calcDimensions, typography } from "../../styles";
import styles from "./NotificationsScreenStyles";

const NotificationsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);


  return (
    <View style={ss.pageWrapper}>
      <Text>
        Notifications Page
        </Text>
    </View>
  );
};

export default NotificationsScreen;
