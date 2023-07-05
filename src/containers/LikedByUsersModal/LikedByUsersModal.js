import React, { useMemo} from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Modal } from "../../components";
import SingleLikingUser from "../SingleLikingUser/SingleLikingUser";
import styles from "./LikedByUsersModalStyles";

const LikedByUsersModal = (props) => {
  const { showModal, closeModal, reactions, allUsers } = props;

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  return (
    <Modal
      isVisible={showModal}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      avoidKeyboard={true}
      style={{ padding: 0, margin: 0 }}
    >
      <View style={ss.modalBackground}>
        <View style={ss.modalBody}>
          <View style={ss.modalContentWrapper}>
            <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              {reactions.map((reaction, index) => (
                <SingleLikingUser userId={reaction.userId} key={reaction.userId} index={index} closeModal={closeModal} likingUser={allUsers.find((u) => u.id === reaction.userId)} />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LikedByUsersModal;
