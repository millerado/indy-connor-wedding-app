import React, { useState, useContext, memo, useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { Dialog, Portal, Menu, useTheme } from "react-native-paper";
import { Schedule } from '../../models';
import { Text, Divider, Icon, Button, ConditionalWrapper, TextSizes } from '../../components';
import ScheduleModal from '../ScheduleModal/ScheduleModal';
import FormatTextWithMentions from '../FormatTextWithMentions/FormatTextWithMentions';
import { DataStore } from '../../utils';
import { AuthContext } from '../../contexts';
import styles from './ScheduleItemStyles';

const ScheduleItem = (props) => {

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const { name, time, location, description, id } = props.item;
  const authStatus = useContext(AuthContext).authStatus;

  const deleteScheduleItem = async () => {
    if (authStatus?.isAuthed) {
      try {
        await DataStore.delete(Schedule, id);
        setDeleteDialogVisible(false);
      } catch (error) {
        console.log("Error deleting Schedule item", error);
      }
    }
  };

  const showDeleteDialog = () => {
    setShowMenu(false);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowMenu(false);
    setShowModal(true);
  }

  return (
    <View key={id}>
      <ScheduleModal showModal={showModal} closeModal={closeModal} modalType={'update'} item={props.item} />
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Delete Schedule Item</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this Schedule Item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <View style={{paddingRight: 10}}>
              <Button onPress={hideDeleteDialog}>
                Cancel
              </Button>
            </View>
            <View>
              <Button onPress={deleteScheduleItem}>
                Delete
              </Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Menu
        visible={showMenu}
        onDismiss={closeMenu}
        anchor={
          <View style={ss.itemWrapper}>
            <ConditionalWrapper
                condition={authStatus.isAdmin}
                wrapper={(children) => (
                  <Pressable onPress={openMenu}>{children}</Pressable>
                )}
            >
              <View>
                <Text size={TextSizes.XL} bold>{name}{' '}</Text>
                <Text size={TextSizes.L}>Time: {time}</Text>
                <Text size={TextSizes.L}>Location: <Text bold size={TextSizes.L}>{location}</Text></Text>
              </View>
              <View>
                <FormatTextWithMentions text={description} size={TextSizes.M} />
              </View>
            </ConditionalWrapper>
          </View>
        }
      >
        <Menu.Item
          onPress={openModal}
          title="Edit"
          icon={({ size, color }) => (
            <Icon name="edit" size={size} color={theme.colors.onPrimary} />
          )}
        />
        <Divider/>
        <Menu.Item
          onPress={showDeleteDialog}
          title="Delete"
          icon={({ size, color }) => (
            <Icon name="trash" size={size} color={theme.colors.onPrimary} />
          )}
        />
      </Menu>
    </View>
  );
};

export default memo(ScheduleItem);