import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { View, FlatList, Platform, Pressable, ImageBackground, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import Zoom from 'react-native-zoom-reanimated';
import { FAQ } from '../../models';
import { Divider, ActivityIndicator, TextInput, Icon } from '../../components';
import { FAQModal, FAQItem } from '../../containers';
import { calcDimensions } from '../../styles';
import { DataStore } from '../../utils';
import { AuthContext } from '../../contexts';
const resortMap = require('../../assets/images/rmmcMapRotated.png');


import styles from './MapScreenStyles';

const MapScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const dimensions = calcDimensions();

  return (
    <View style={ss.pageWrapper}>
      <Zoom>
        <Image
          source={resortMap} 
          resizeMode='contain'
          style={{width: dimensions.width, height: dimensions.width * (7792 / 5216)}}
        />
      </Zoom>
    </View>
  );
};

export default MapScreen;
