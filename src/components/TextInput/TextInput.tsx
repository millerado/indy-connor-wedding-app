import * as React from 'react';
import { TextInput as PaperTextInput, TextInputProps, withTheme } from 'react-native-paper';

const defaultProps = {
  mode: 'outlined',
};

const TextInput = (props: TextInputProps): React.ReactElement => (
  <PaperTextInput {...props} />
);

TextInput.defaultProps = defaultProps;

export default withTheme(TextInput);