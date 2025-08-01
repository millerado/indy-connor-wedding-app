import React, {useMemo} from 'react';
import { AnimatedFAB as PaperAnimatedFAB, AnimatedFABProps, withTheme, useTheme } from 'react-native-paper';
import styles from "./AnimatedFABStyles";

const AnimatedFAB = (props: AnimatedFABProps) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const {animateFrom = 'right', iconMode = 'dynamic', key, ...restOfProps} = props;

  return (
    <PaperAnimatedFAB theme={theme} animateFrom={animateFrom} iconMode={iconMode} key={key} {...restOfProps} style={ss.fabStyle} />
  )
};

export default AnimatedFAB;