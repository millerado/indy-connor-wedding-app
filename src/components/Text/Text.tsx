import * as React from 'react';
import { Text as PaperText, TextProps, withTheme } from 'react-native-paper';

const Text = (props: TextProps) => (
  <PaperText {...props} />
);

export default withTheme(Text);