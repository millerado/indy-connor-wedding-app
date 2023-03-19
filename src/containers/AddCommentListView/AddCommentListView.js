import React, { useContext, useMemo, useState } from "react";
import { View, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { Avatar, Text, TextSizes } from "../../components";
import { typography } from "../../styles";
import { AuthContext } from "../../contexts";
import CommentModal from "../CommentModal/CommentModal";
import styles from "./AddCommentListViewStyles";

const AddCommentListView = (props) => {
  const { postsID } = props;
  const authStatus = useContext(AuthContext).authStatus;
  const [showModal, setShowModal] = useState(false);

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  if (!authStatus?.isAuthed || !postsID) {
    return null;
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    !authStatus?.isAuthed || !postsID ? (
      null
    ) : (
      <>
        <CommentModal
          showModal={showModal}
          closeModal={closeModal}
          modalType={"create"}
          postsID={postsID}
        />
        <Pressable onPress={openModal}>
          <View style={ss.addCommentWrapper}>
            <View style={ss.avatarWrapper}>
              <Avatar
                fileName={authStatus.picture?.url}
                name={authStatus.name}
                size={typography.fontSizeM * 2}
                variant="circle"
                absolute={false}
              ></Avatar>
            </View>
            <View style={[ss.textWrapper, ss.fakeTextInput]}>
              <Text size={TextSizes.M} bold>
                Add a comment
              </Text>
            </View>
          </View>
        </Pressable>
      </>
    )
  );
};

export default AddCommentListView;
