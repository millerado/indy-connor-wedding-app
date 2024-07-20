import React from "react";
import { MaterialIndicator, MaterialIndicatorProps } from 'react-native-indicators';
import { useTheme } from 'react-native-paper';

const ActivityIndicator = (props: MaterialIndicatorProps) => {
  const { size = 20, ...restOfProps } = props;
  const theme = useTheme();
  return (
    <MaterialIndicator {...restOfProps} color={theme.colors.primary} />
  )
};

export default ActivityIndicator;