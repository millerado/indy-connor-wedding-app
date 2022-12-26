import * as React from 'react';
import { Button as PaperButton, ButtonProps, withTheme } from 'react-native-paper';

const Button = (props: ButtonProps) => (
  <PaperButton {...props} />
);

export default withTheme(Button);