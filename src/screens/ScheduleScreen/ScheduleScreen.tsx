import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { View, FlatList, Platform, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { Schedule } from "../../models";
import {
  Text,
  TextSizes,
  Divider,
  Icon,
  ActivityIndicator,
} from "../../components";
import { ScheduleItem, ScheduleModal } from "../../containers";
import { DataStore } from "../../utils";
import { AuthContext } from "../../contexts";
import styles from "./ScheduleScreenStyles";

const emptyScheduleData = [
  { day: "Friday", data: [] },
  { day: "Saturday", data: [] },
  { day: "Sunday", data: [] },
];

const ScheduleScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [rawScheduleData, setRawScheduleData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Friday");

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
          <Icon name={"addItem"} color={theme.colors.primary} />
        </View>
      </Pressable>
    );
  };

  const keyExtractor = useCallback((item) => item.id, []);

  const renderListHeader = () => {
    return (
      <View style={ss.headerWrapper}>
        {emptyScheduleData.map((item, index) => {
          return (
            <Pressable onPress={() => setSelectedDay(item.day)} style={[ss.headerItem, {backgroundColor: selectedDay === item.day ? theme.colors.primary : theme.colors.background}]}>
              <View>
                <Text color={selectedDay === item.day ? theme.colors.onPrimary : undefined}>
                  {item.day.toUpperCase()}
                </Text>
              </View>
            </Pressable>
          )
        })}
      </View>
    )
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (authStatus?.isAdmin ? addNewButton() : null),
    });
  }, [authStatus, theme]);

  useEffect(() => {
    const newScheduleData = [...emptyScheduleData];
    const days = "Friday,Saturday,Sunday".split(",");
    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const dayData = rawScheduleData.filter((item) => item.day === day);
      if (dayData.length > 0) {
        dayData.sort((a, b) => a.sortOrder - b.sortOrder);
        newScheduleData[i].data = dayData;
      }
    }
    setScheduleData(newScheduleData);
  }, [rawScheduleData]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(Schedule).subscribe(
      ({ items }) => {
        try {
          setRawScheduleData(items);
          if (dataLoading) {
            setDataLoading(false);
          }
          // console.log('-- Fetched Data --', dt);
        } catch (err) {
          console.log("error fetching Data", err);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={ss.pageWrapper}>
      <ScheduleModal
        showModal={showModal}
        closeModal={closeModal}
        modalType={"create"}
      />
      {dataLoading || rawScheduleData.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <>
          <FlatList
            data={scheduleData.find((item) => item.day === selectedDay).data}
            renderItem={({ item }) => <ScheduleItem item={item} />}
            keyExtractor={keyExtractor}
            ListHeaderComponent={renderListHeader}
            stickyHeaderIndices={[0]}
            ItemSeparatorComponent={Divider}
            style={{ width: '100%'}}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
            maxToRenderPerBatch={10} // Also the default
            initialNumToRender={10} // Also the default
          />
        </>
      )}
    </View>
  );
};

export default ScheduleScreen;
