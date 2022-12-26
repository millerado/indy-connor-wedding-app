import * as React from 'react';
import { Divider as PaperDivider, withTheme } from 'react-native-paper';

const Divider = (props): React.ReactElement => (
  <PaperDivider {...props} />
);

export default withTheme(Divider);