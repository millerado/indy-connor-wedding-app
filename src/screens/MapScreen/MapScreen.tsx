import { useMemo } from 'react';
import { View, Image } from "react-native";
import { useTheme } from "react-native-paper";
import Zoom from 'react-native-zoom-reanimated'
import { calcDimensions } from '../../styles';
import styles from './MapScreenStyles';
const resortMap = require('../../assets/images/rmmcMap.png');

const MapScreen = () => {
  const theme = useTheme();
  const ss = useMemo(
    () => styles(theme), [theme]
  );
  const dimensions = calcDimensions();
  return (
    <View style={ss.pageWrapper}>
      <Zoom>
        <Image resizeMode='contain' style={{width: dimensions.width, height: dimensions.width * (5216/7792)}} source={resortMap} />
      </Zoom>
    </View>
  );
};

export default MapScreen;
