import * as React from "react";
import {
  SegmentedButtons as PaperSegmentedButtons,
  SegmentedButtonsProps,
  withTheme,
} from "react-native-paper";

const SegmentedButtons = (props: SegmentedButtonsProps) => {
  return (
    <PaperSegmentedButtons {...props}/>
  );
};

export default withTheme(SegmentedButtons);
