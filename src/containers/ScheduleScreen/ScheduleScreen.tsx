import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, SectionList, Pressable } from 'react-native';
import { Dialog, Portal, Menu, useTheme } from "react-native-paper";
import { Schedule } from '../../models';
import { Text, Divider, Icon, ActivityIndicator, TextSizes, Button, ConditionalWrapper } from '../../components';
import { ScheduleModal } from '..';
import { DataStore } from '../../utils';
import { AuthContext } from '../../contexts';
import styles from './ScheduleScreenStyles';

const emptyScheduleData = [
  { day: 'Friday', data: [] },
  { day: 'Saturday', data: [] },
  { day: 'Sunday', data: [] },
];

const ScheduleScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [rawScheduleData, setRawScheduleData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const authStatus = useContext(AuthContext).authStatus;

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const addNewButton = () => {
    return (
      <Pressable onPress={openModal}>
        <View>
          <Icon
            name={'addItem'}
            color={theme.colors.primary}
          />
        </View>
      </Pressable>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => authStatus?.isAdmin ? addNewButton() : null,
    });
  }, [authStatus, theme]);

  useEffect(() => {
    const newScheduleData = [...emptyScheduleData];
    const days = 'Friday,Saturday,Sunday'.split(',');
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const dayData = rawScheduleData.filter(item => item.day === day);
      if (dayData.length > 0) {
        dayData.sort((a, b) => a.sortOrder - b.sortOrder);
        newScheduleData[i].data = dayData;
      }
    }
    setScheduleData(newScheduleData);
  }, [rawScheduleData]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Schedule).subscribe(({ items }) => {
      try {
        setRawScheduleData(items);
        if (dataLoading) {
          setDataLoading(false);
        }
        // console.log('-- Fetched Data --', dt);
      } catch (err) { console.log('error fetching Data', err) }
    });

    return () => subscription.unsubscribe();
  }, []);

  return ( 
    <View style={ss.pageWrapper}>
      <ScheduleModal showModal={showModal} closeModal={closeModal} modalType={'create'} />
      {dataLoading || rawScheduleData.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <>
          <SectionList
            renderItem={({ item }) => (
              <ScheduleItem item={item} />
            )}
            renderSectionHeader={({ section: { day } }) => (
              <View style={ss.sectionHeader}>
                <Text color={theme.colors.white} size={TextSizes.XL} bold>{day}</Text>
              </View>
            )}
            sections={scheduleData}
            keyExtractor={(item, index) => item + index}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            style={{ width: '100%' }}
            ItemSeparatorComponent={Divider}
          />
        </>

      )}
    </View>
  );
};

export default ScheduleScreen;


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
