import React from "react";
import { MaterialIndicator, MaterialIndicatorProps } from 'react-native-indicators';
import { useTheme } from 'react-native-paper';

const ActivityIndicator = (props: MaterialIndicatorProps) => {
  const theme = useTheme();
  return (
    <MaterialIndicator {...props} color={theme.colors.primary} />
  )
};

const defaultProps = {
  size: 20,
};

ActivityIndicator.defaultProps = defaultProps;

export default ActivityIndicator;