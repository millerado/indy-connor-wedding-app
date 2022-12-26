import * as React from 'react';
import { Switch as PaperSwitch, withTheme } from 'react-native-paper';

const Switch = (props): React.ReactElement => (
  <PaperSwitch {...props} />
);

export default withTheme(Switch);