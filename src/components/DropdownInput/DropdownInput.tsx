import React, { useState } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Dropdown, MultiSelect, IDropdownRef, IMultiSelectRef } from 'react-native-element-dropdown';
import Text from '../Text/Text';
import styles from "./DropdownInputStyles";

interface DropdownProps extends IDropdownRef {
  value: string;
  setValue: (value: string) => void;
  data: [{label: string; value: string; icon?: string}];
  placeholder?: string;
  focusPlaceholder?: string;
}

const DropdownInput = (props: DropdownProps) => {
  const { value, setValue, data, placeholder, focusPlaceholder, ...restOfProps } = props;
  const theme = useTheme();
  const ss = styles(theme);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (label) => {
    if (value || isFocus) {
      return (
        <View style={ss.label}>
          <Text style={[isFocus && { color: theme.colors.primary }]}>
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
      <Dropdown
        style={[ss.dropdown, isFocus && { borderColor: theme.colors.primary }]}
        placeholderStyle={ss.placeholderStyle}
        selectedTextStyle={ss.selectedTextStyle}
        itemTextStyle={ss.itemTextStyle}
        iconStyle={ss.iconStyle}
        data={data}
        placeholder={isFocus ? focusPlaceholder : placeholder}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        {...restOfProps}
      />
    </View>
  );
};

export default DropdownInput;
