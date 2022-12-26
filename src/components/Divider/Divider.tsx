import * as React from 'react';
import { Divider as PaperDivider, DividerProps, withTheme } from 'react-native-paper';

const Divider = (props: DividerProps) => (
  <PaperDivider {...props} />
);

export default withTheme(Divider);