import * as React from 'react';
import { Divider as PaperDivider, DividerProps, useTheme } from 'react-native-paper';

const Divider = (props: DividerProps) => {
  const { key, ...restOfProps } = props;
  const theme = useTheme();
  return (
    <PaperDivider theme={theme} {...restOfProps} key={key} />
  );
};

export default Divider;