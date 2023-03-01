import React, { useMemo } from "react"
import { ReactNativeModal as RNModal, ModalProps } from "react-native-modal";
import {
  useTheme,
} from "react-native-paper";
import styles from "./ModalStyles";

const Modal = (props: ModalProps) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  return (
    <RNModal {...props} backdropColor={theme.colors.modalBackground} />
  )
};

export default Modal;