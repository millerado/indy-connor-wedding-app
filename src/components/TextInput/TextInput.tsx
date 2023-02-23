import React, { forwardRef, useMemo } from 'react';
import { TextInput as PaperTextInput, TextInputProps, withTheme } from 'react-native-paper';

const TextInput = forwardRef((props: TextInputProps, ref) => {
  const {mode = 'outlined', ...restOfProps} = props;
  
  return (
    <PaperTextInput mode={mode} {...props} ref={ref} />
  )
});

export default withTheme(TextInput);