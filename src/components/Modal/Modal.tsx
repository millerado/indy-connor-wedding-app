import React from "react"
import { ReactNativeModal as RNModal, ModalProps } from "react-native-modal";

const Modal = (props: ModalProps) => {
  return (
    <RNModal {...props} />
  )
};

export default Modal;