import * as React from "react";
import {
  Chip as PaperChip,
  ChipProps,
  withTheme,
} from "react-native-paper";

const Chip = (props: ChipProps) => {
  const { children, mode='outlined', ...restOfProps } = props;
  if(children) {
    return (
      <PaperChip mode={mode} {...restOfProps}>{children}</PaperChip>
    );
  }
  return null;
};

export default withTheme(Chip);
