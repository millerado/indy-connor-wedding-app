import * as React from 'react';
import { AnimatedFAB as PaperAnimatedFAB, AnimatedFABProps, withTheme } from 'react-native-paper';

const AnimatedFAB = (props: AnimatedFABProps) => (
  <PaperAnimatedFAB {...props} />
);

const defaultProps = {
  animatedFrom: 'right',
  iconMode: 'dynamic'
};

AnimatedFAB.defaultProps = defaultProps;

export default withTheme(AnimatedFAB);