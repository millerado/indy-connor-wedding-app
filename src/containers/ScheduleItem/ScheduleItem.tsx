import React, { useState, useContext, memo, useMemo } from 'react';
import { View, Pressable } from 'react-native';
import { Dialog, Portal, Menu, useTheme } from "react-native-paper";
import { Schedule } from '../../models';
import { Text, Divider, Icon, Button, ConditionalWrapper } from '../../components';
import ScheduleModal from '../ScheduleModal/ScheduleModal';
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
    <>
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
            <Button onPress={deleteScheduleItem}>
              Delete
            </Button>
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
              <View style={{ flex: 9 }}>
                <Text size='L' bold>{name}: {time}</Text>
                <Text size='M'><Text bold>Location</Text>: {location}</Text>
              </View>
              <View style={ss.textWrapper}>
                <Text size='M'>{description}</Text>
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
    </>
  );
};

export default memo(ScheduleItem);