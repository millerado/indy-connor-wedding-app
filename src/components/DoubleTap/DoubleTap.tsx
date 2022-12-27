import React, { useState } from "react";
import { Pressable } from "react-native";

interface DoubleTapProps {
  delay?: number;
  singleTap?: () => void;
  doubleTap?: () => void;
  children: React.ReactNode;
}

// Function based off of: https://www.npmjs.com/package/react-native-double-tap
// Rebuilt because that library is old, single purpose, and easy to shift over so we can maintain and customize
const DoubleTap = (props: DoubleTapProps) => {
  const [firstPress, setFirstPress] = useState(true);
  const [lastTime, setLastTime] = useState(new Date());
  const [timer, setTimer] = useState(false);
  const {delay = 200, singleTap, doubleTap, children} = props;

  const onTap = () => {
    let now = new Date().getTime();
    if (firstPress) {
      // set the flag indicating first press has occured
      setFirstPress(false);

      //start a timer --> if a second tap doesnt come in by the delay, trigger singleTap event handler
      setTimer(setTimeout(() => {
        //check if user passed in prop for singleTap event handler
        singleTap ? singleTap() : null;

        // reset back to initial state
        setFirstPress(true);
        setTimer(false);
      }, delay));

      // mark the last time of the press
      setLastTime(now);
    } else {
      //if user pressed immediately again within span of delayTime
      if (now - lastTime < delay) {
        // clear the timeout for the single press
        timer && clearTimeout(timer);

        //check if user passed in prop for double click
        doubleTap ? doubleTap() : null;

        // reset back to initial state
        setFirstPress(true);
      }
    }
  }

  return (
    <Pressable onPress={onTap}>
      {children}
    </Pressable>
  );

}

export default DoubleTap;