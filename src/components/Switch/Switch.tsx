import * as React from 'react';
import { Switch as PaperSwitch, SwitchProps, useTheme } from 'react-native-paper';

const Switch = (props: SwitchProps) => {
  const { key, ...restOfProps } = props;
  const theme = useTheme();
  return (
    <PaperSwitch {...restOfProps} key={key} theme={theme} />
  );
};

export default Switch;