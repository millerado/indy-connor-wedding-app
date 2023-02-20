import * as React from "react";
import {
  Badge as PaperBadge,
  BadgeProps,
  withTheme,
} from "react-native-paper";

const Badge = (props: BadgeProps) => {
  const { children, ...restOfProps } = props;
  if(children) {
    return (
      <PaperBadge {...restOfProps}>{children}</PaperBadge>
    );
  }
  return null;
};

export default withTheme(Badge);
