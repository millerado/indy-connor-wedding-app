import React, { forwardRef, useMemo } from 'react';
import { TextInput as PaperTextInput, TextInputProps, useTheme } from 'react-native-paper';

const TextInput = forwardRef((props: TextInputProps, ref) => {
  const {mode = 'outlined', key, ...restOfProps} = props;
  const theme = useTheme();

  return (
    <PaperTextInput mode={mode} {...restOfProps} ref={ref} key={key} theme={theme} />
  )
});

export default TextInput;