import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { View, FlatList, Platform, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { TabView, TabBar } from 'react-native-tab-view';
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreateSchedule, onUpdateSchedule, onDeleteSchedule} from '../../graphql/subscriptions';
import { listSchedules } from '../../graphql/queries';
import { Schedule } from "../../models";
import {
  Text,
  Divider,
  Icon,
  ActivityIndicator,
} from "../../components";
import { ScheduleItem, ScheduleModal } from "../../containers";
import { DataStore } from "../../utils";
import { AuthContext } from "../../contexts";
import { calcDimensions } from "../../styles";
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
  const [showModal, setShowModal] = useState(false);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'friday', title: 'Friday' },
    { key: 'saturday', title: 'Saturday' },
    { key: 'sunday', title: 'Sunday' },
  ];

  const authStatus = useContext(AuthContext).authStatus;
  const dimensions = calcDimensions();

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        loadSchedule();
      }
      setPriorConnectionState(payload.data.connectionState);
    }
  });

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

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={ss.pageActivityIndicatorWrapper}>
        <ActivityIndicator size={60} />
      </View>
    );
  }, [ss]);

  const renderScene = ({ route }) => {
    return (
      <FlatList
        key={route.key}
        data={scheduleData.length === 0 ? [] : scheduleData.find((item) => item.day === route.title).data}
        renderItem={({ item }) => <ScheduleItem item={item} />}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Divider}
        style={{ width: '100%', backgroundColor: theme.colors.background}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
        maxToRenderPerBatch={10} // Also the default
        initialNumToRender={10} // Also the default
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={listEmptyComponent}  
      />
    );
  };

  const loadScheduleFromDatastore = async () => {
    try {
      const allSchedule = await DataStore.query(Schedule);
      setRawScheduleData(allSchedule);
    } catch (err) {
      console.log('-- Error Loading Schedule From Datastore --', err);
    }
  }

  const loadSchedule = async () => {
    try {
      const allSchedule = await API.graphql({ query: listSchedules, variables: { limit: 999999999 } });

      const unfilteredItems = allSchedule?.data?.listSchedules?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        setRawScheduleData(items);
      }
    } catch (err) {
      console.log('-- Error Loading Schedule, Will Try Datastore --', err);
      loadScheduleFromDatastore();
    }
  }

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
    const createSub = API.graphql(
      graphqlOperation(onCreateSchedule)
    ).subscribe({
      next: ({ value }) => loadSchedule(),
    });
    
    const updateSub = API.graphql(
      graphqlOperation(onUpdateSchedule)
    ).subscribe({
      next: ({ value }) => loadSchedule()
    });
    
    const deleteSub = API.graphql(
      graphqlOperation(onDeleteSchedule)
    ).subscribe({
      next: ({ value }) => loadSchedule()
    });

    loadSchedule();

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    }
  }, []);
  
  return (
    <>
      <ScheduleModal showModal={showModal} closeModal={closeModal} modalType='Create' />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: dimensions.width }}
        renderTabBar={props => (
          <TabBar
            {...props} 
            contentContainerStyle={{backgroundColor: theme.colors.background}} 
            tabStyle={{backgroundColor: theme.colors.primary, borderTopLeftRadius: 20, borderTopRightRadius: 20}} 
            renderTabBarItem={({ route, ...otherProps }) => {
              const isFocused = otherProps?.navigationState.routes[otherProps.navigationState.index].key === route.key;
              return (
                <Pressable onPress={otherProps.onPress} style={[ss.tabItem, {backgroundColor: isFocused ? theme.colors.primary : theme.colors.background, width: dimensions.width / routes.length }]} key={route.key}>
                  <View>
                    <Text color={isFocused? theme.colors.onPrimary : undefined} bold>
                      {route.title.toUpperCase()}
                    </Text>
                  </View>
                </Pressable>
              )
            }}
          />
        )}
      />
    </>
  );
};

export default ScheduleScreen;