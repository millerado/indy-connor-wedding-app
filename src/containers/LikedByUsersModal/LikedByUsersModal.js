import React, { useMemo, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Modal } from "../../components";
import { DataStore } from '../../utils';
import { Users } from "../../models";
import SingleLikingUser from "../SingleLikingUser/SingleLikingUser";
import styles from "./LikedByUsersModalStyles";

const LikedByUsersModal = (props) => {
  const { showModal, closeModal, reactions } = props;
  const [allUsers, setAllUsers] = useState([]);

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  useEffect(() => {
    // Subscribe to Users
    const usersSubscription = DataStore.observeQuery(Users).subscribe(({ items }) => {
      try {
        if (items) {
          const newUsers = items.map((u) => {
            return {
              id: u.id,
              name: u.name,
              image: u.image ? JSON.parse(u.image) : undefined,
            };
          });
      
          // Quick check to make sure we're only updating state if the subscription caught a chance to the user associated with this post
          // if (JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
          setAllUsers(newUsers);
          // }
        }
      } catch (err) { console.log('error fetching Data', err) }
    });

    return () => {
      usersSubscription.unsubscribe();
    };
  }, [showModal]);

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
