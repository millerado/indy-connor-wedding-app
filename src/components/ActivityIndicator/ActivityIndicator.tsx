import React from "react";
import { ActivityIndicator as PaperIndicator, ActivityIndicatorProps } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const { size = 20, key, ...restOfProps } = props;
  const theme = useTheme();
  return (
    <PaperIndicator {...restOfProps} key={key} color={theme.colors.primary} />
  )
};

export default ActivityIndicator;