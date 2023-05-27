import React, { useState } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { MultiSelect, IMultiSelectRef } from 'react-native-element-dropdown';
import Text, { TextSizes } from '../Text/Text';
import styles from "./MultiselectInputStyles";

interface MultiselectInputProps extends IMultiSelectRef {
  values: string[];
  setValues: (values: string[]) => void;
  data: any[];
  placeholder?: string;
  focusPlaceholder?: string;
  valueField?: string;
  label?: string;
}

const MultiselectInput = (props: MultiselectInputProps) => {
  const { values, setValues, data, placeholder, focusPlaceholder, valueField, label, ...restOfProps } = props;
  const theme = useTheme();
  const ss = styles(theme);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (label) => {
    if (values?.length > 0 || isFocus) {
      return (
        <View style={ss.dropdownLabelWrapper}>
          <Text style={[isFocus && { color: theme.colors.primary }]} size={TextSizes.XS}>
            {label}
          </Text>
        </View>
      );
    }
    return null;
  };
  return (
    <View style={ss.dropdownWrapper}>
      {renderLabel(placeholder)}
      <MultiSelect
        style={[ss.dropdown, isFocus && { borderColor: theme.colors.primary }]}
        placeholderStyle={ss.dropdownPlaceholder}
        selectedTextStyle={ss.dropdownSelectedText}
        itemTextStyle={ss.dropdownItemText}
        iconStyle={ss.dropdownIcon}
        data={data}
        placeholder={isFocus ? focusPlaceholder : placeholder}
        labelField="label"
        valueField={valueField || "value"}
        value={values}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValues(item);
        }}
        {...restOfProps}
      />
    </View>
  );
};

export default MultiselectInput;
