import * as React from 'react';
import { TextInput as PaperTextInput, TextInputProps, withTheme } from 'react-native-paper';

const TextInput = (props: TextInputProps) => (
  <PaperTextInput {...props} />
);

const defaultProps = {
  mode: 'outlined',
};

TextInput.defaultProps = defaultProps;

export default withTheme(TextInput);