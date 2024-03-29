import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import Zoom from 'react-native-zoom-reanimated';
import { calcDimensions } from '../../styles';
import styles from './MapScreenStyles';
const resortMap = require('../../assets/images/rmmcMapRotated.png');

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
          style={{width: dimensions.width, height: dimensions.width * (6000 / 3952)}}
        />
      </Zoom>
    </View>
  );
};

export default MapScreen;
