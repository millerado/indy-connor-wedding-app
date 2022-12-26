import React from "react";
import { MaterialIndicator, MaterialIndicatorProps } from 'react-native-indicators';
import { withTheme } from 'react-native-paper';

const ActivityIndicator = (props: MaterialIndicatorProps) => {
  return (
    <MaterialIndicator {...props} />
  )
};

const defaultProps = {
  size: 20,
};

ActivityIndicator.defaultProps = defaultProps;

export default withTheme(ActivityIndicator);