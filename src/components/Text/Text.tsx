import * as React from 'react';
import { Text as PaperText, withTheme } from 'react-native-paper';

const Text = (props): React.ReactElement => (
  <PaperText {...props} />
);

export default withTheme(Text);