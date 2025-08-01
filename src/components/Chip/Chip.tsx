import * as React from "react";
import {
  Chip as PaperChip,
  ChipProps,
  useTheme,
} from "react-native-paper";

const Chip = (props: ChipProps) => {
  const { children, mode='outlined', key, ...restOfProps } = props;
  const theme = useTheme();
  if(children) {
    return (
      <PaperChip mode={mode} theme={theme} {...restOfProps} key={key}>{children}</PaperChip>
    );
  }
  return null;
};

export default Chip;
