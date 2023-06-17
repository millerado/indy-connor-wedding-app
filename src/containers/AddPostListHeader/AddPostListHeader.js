import React, { useContext, memo, useMemo } from "react";
import { View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { Avatar, Text, Icon, Divider } from "../../components";
import { typography } from "../../styles";
import { AuthContext } from '../../contexts';
import styles from "./AddPostListHeaderStyles"

// function AddPostListHeader(props) {
const AddPostListHeader = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const authStatus = useContext(AuthContext).authStatus;
  const navigation = useNavigation();
  if(!authStatus?.isAuthed) {
    return null;
  }

  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("Create Post", {view: "create"})}
      >
        <View style={ss.wrapper}>
          <View style={ss.avatarWrapper}>
            <Avatar
              fileName={authStatus.image?.url}
              name={authStatus.name}
              size={typography.fontSizeM * 2}
              variant="circle"
              absolute={false}
            ></Avatar>
          </View>
          <View style={[ss.textWrapper, ss.fakeTextInput]}>
            <Text size="M" color={theme.colors.primary} bold>
              What do you want to post?
            </Text>
            <Icon name='camera' color={theme.colors.primary} size={typography.fontSizeL} />
          </View>
        </View>
      </Pressable>
      <Divider />
    </>
  );
};

export default memo(AddPostListHeader);
