import * as React from "react";
import {
  SegmentedButtons as PaperSegmentedButtons,
  SegmentedButtonsProps,
  useTheme,
} from "react-native-paper";

const SegmentedButtons = (props: SegmentedButtonsProps) => {
  const { key, ...restOfProps } = props;
  const theme = useTheme();
  return (
    <PaperSegmentedButtons {...restOfProps} key={key} theme={theme} />
  );
};

export default SegmentedButtons;
