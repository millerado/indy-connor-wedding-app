import * as React from 'react';
import { Button as PaperButton, withTheme } from 'react-native-paper';

const Button = (props): React.ReactElement => (
  <PaperButton {...props} />
);

export default withTheme(Button);