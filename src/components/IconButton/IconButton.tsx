import * as React from 'react';
import { IconButton as PaperIconButton, IconButtonProps, withTheme } from 'react-native-paper';

const IconButton = (props: IconButtonProps) => (
  <PaperIconButton {...props} />
);

export default withTheme(IconButton);