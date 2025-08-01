import React, { useState } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import Text, { TextSizes } from '../Text/Text';
import styles from "./DropdownInputStyles";

interface DropdownProps extends IDropdownRef {
  value: string;
  setValue: (value: string) => void;
  data: [{label: string; value: string; icon?: string}];
  placeholder?: string;
  focusPlaceholder?: string;
}

const DropdownInput = (props: DropdownProps) => {
  const { value, setValue, data, placeholder, focusPlaceholder, key, ...restOfProps } = props;
  const theme = useTheme();
  const ss = styles(theme);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (label) => {
    if (value || isFocus) {
      return (
        <View style={ss.dropdownLabelWrapper} key={key}>
          <Text style={[isFocus && { color: theme.colors.primary }]} size={TextSizes.XS}>
            {label}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={ss.dropdownWrapper} key={key}>
      {renderLabel(placeholder)}
      <Dropdown
        style={[ss.dropdown, isFocus && { borderColor: theme.colors.primary }]}
        placeholderStyle={ss.dropdownPlaceholder}
        selectedTextStyle={ss.dropdownSelectedText}
        itemTextStyle={ss.dropdownItemText}
        iconStyle={ss.dropdownIcon}
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
