import * as React from 'react';
import { Switch as PaperSwitch, SwitchProps, withTheme } from 'react-native-paper';

const Switch = (props: SwitchProps) => (
  <PaperSwitch {...props} />
);

export default withTheme(Switch);