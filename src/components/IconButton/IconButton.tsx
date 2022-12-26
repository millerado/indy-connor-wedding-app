import * as React from 'react';
import { IconButton as PaperIconButton, withTheme } from 'react-native-paper';

const IconButton = (props): React.ReactElement => (
  <PaperIconButton {...props} />
);

export default withTheme(IconButton);