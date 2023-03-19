import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, SectionList, Pressable } from 'react-native';
import { useTheme } from "react-native-paper";
import { Schedule } from '../../models';
import { Text, Divider, Icon, ActivityIndicator, TextSizes } from '../../components';
import { ScheduleItem, ScheduleModal } from '../../containers';
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
                <Text color={theme.colors.onPrimary} size={TextSizes.XL} bold>{day}</Text>
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