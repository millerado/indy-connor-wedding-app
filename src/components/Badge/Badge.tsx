import * as React from "react";
import {
  Badge as PaperBadge,
  BadgeProps,
  useTheme,
} from "react-native-paper";

const Badge = (props: BadgeProps) => {
  const { children, key, ...restOfProps } = props;
  const theme = useTheme();
  if(children) {
    return (
      <PaperBadge {...restOfProps} theme={theme} key={key}>{children}</PaperBadge>
    );
  }
  return null;
};

export default Badge;
