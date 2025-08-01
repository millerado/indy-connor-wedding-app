import React, { useMemo } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import Text from '../Text/Text';
import styles from "./TabStyles";

interface TabProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}

const Tab = (props: TabProps) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { options, selectedOption, setSelectedOption, key } = props;

  return (
    <View style={ss.tabWrapper} key={key}>
      {options.map((item, index) => {
        return (
          <Pressable onPress={() => setSelectedOption(item)} style={[ss.tabItem, {backgroundColor: selectedOption === item ? theme.colors.primary : theme.colors.background}]} key={index}>
            <View>
              <Text color={selectedOption === item ? theme.colors.onPrimary : undefined} bold>
                {item.toUpperCase()}
              </Text>
            </View>
          </Pressable>
        )
      })}
    </View>
  )
};

export default Tab;
