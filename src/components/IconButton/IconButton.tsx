import * as React from 'react';
import { IconButton as PaperIconButton, IconButtonProps, useTheme } from 'react-native-paper';

const IconButton = (props: IconButtonProps) => {
  const { key, ...restOfProps } = props;
  const theme = useTheme();
  return (
    <PaperIconButton {...restOfProps} theme={theme} key={key} />
  )
};

export default IconButton;