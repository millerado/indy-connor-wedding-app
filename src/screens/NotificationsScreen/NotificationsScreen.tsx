import React, {useMemo, useEffect, useState} from 'react';
import { View, ScrollView} from "react-native";
import { useTheme } from "react-native-paper";
import { Text, VideoS3 } from '../../components';
import { calcDimensions } from '../../styles';
import styles from './NotificationsScreenStyles';

const NotificationsScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const dimensions = calcDimensions();

  return (
    <View style={ss.pageWrapper}>
      <ScrollView>
        <VideoS3
          fileName={'021f7192-79fa-4a80-bbba-425a89fcee5c.MOV'}
          height={1920}
          width={1080}
        />
      </ScrollView>
    </View>
  );
};

export default NotificationsScreen;
