import React, {
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { View, FlatList, Platform, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreateNotifications, onUpdateNotifications, onDeleteNotifications } from '../../graphql/subscriptions';
import { listNotifications } from '../../graphql/queries';
import {
  Divider,
  ActivityIndicator,
  TextSizes,
  Icon,
  ConditionalWrapper,
  Text,
} from "../../components";
import { FormatTextWithMentions } from "../../containers";
import { AuthContext } from "../../contexts";
import { Notifications } from "../../models";
import { typography, calcDimensions } from "../../styles";
import { DataStore } from "../../utils";
import styles from "./NotificationsScreenStyles";

const NotificationsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);

  const { width } = calcDimensions();

  const graphVariables = { filter: { userId: {eq: authStatus.userId} }, limit: 999999999 };

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        loadNotifications();
      }
      setPriorConnectionState(payload.data.connectionState);
    }
  });

  const loadNotifications = async () => {
    try {
      const allNotifications = await API.graphql({ query: listNotifications, variables: graphVariables });

      const unfilteredItems = allNotifications?.data?.listNotifications?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted && new Date(item.displayTime) <= new Date());
      if(items.length > 0) {
        items.sort((a, b) => new Date(b.displayTime) - new Date(a.displayTime));
        setNotifications(items);
        setLoading(false);
      }
    } catch (err) {
      console.log('-- Error Loading Notifications, No DataStore for these --', err);
    }
  }

  const navToLink = (targetType, id) => {
    // console.log('-- Notification Navigation --', targetType, id);
    if (targetType === "post") {
      navigation.push("View Post", {
        postsID: id,
      });
    }
  };

  const renderItem = useCallback(({ item }) => {
    const linking = item.linking ? JSON.parse(item.linking) : null;
    const iconName = linking.icon?.iconDetails || "alert";
    let centerWidth = width - (typography.fontSizeL * 2 + 20);
    if (!item.read) {
      centerWidth = centerWidth - (typography.fontSizeL * 2 + 15);
    }

    const renderRightActions = () => {
      return (
        <View style={{backgroundColor: theme.colors.error, flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10, flexDirection: 'row'}}>
          <Text color={theme.colors.onPrimary}>
            Delete Forever
          </Text>
          <Icon name="delete" size={typography.fontSizeL * 1.5} color={theme.colors.onPrimary} style={{paddingLeft: 10}} />
        </View>
      );
    };

    const onSwipeRight = () => {
      // console.log('Swiped Right');
      DataStore.delete(item);
    }

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={renderRightActions}
          onSwipeableRightOpen={onSwipeRight}
        >
          <ConditionalWrapper
            condition={linking.targetType}
            wrapper={(children) => (
              <Pressable onPress={() => navToLink(linking.targetType, linking.id)}>
                {children}
              </Pressable>
            )}
          >
            <View style={{ padding: 10, flexDirection: "row", flex: 0, justifyContent: 'space-between', alignItems: 'center', backgroundColor: theme.colors.background }}>
              <View style={{ paddingRight: 10, justifyContent: "center", width: (typography.fontSizeL * 2) + 10 }}>
                <Icon name={iconName} size={typography.fontSizeL * 2} />
              </View>
              <View style={{ justifyContent: "center", width: centerWidth }}>
                {item.subject !== 'Camp Conndigo' && (
                  <Text size={TextSizes.L} bold>
                    {item.subject}
                  </Text>
                )}
                <FormatTextWithMentions
                  text={item.messageBody}
                  size={TextSizes.L}
                  style={{ marginRight: 10 }}
                />
              </View>
              {!item.read && (
                <Pressable
                  onPress={async () => {
                    const originalItem = await DataStore.query(Notifications, item.id);
                    DataStore.save(
                      Notifications.copyOf(originalItem, (updated) => {
                        updated.read = true;
                      })
                    );
                  }}
                >
                  <View style={{ paddingLeft: 10, justifyContent: "center" }}>
                    <Icon name={"new"} size={typography.fontSizeL * 2} />
                  </View>
                </Pressable>
              )}
            </View>
          </ConditionalWrapper>
        </Swipeable>
      </GestureHandlerRootView>
    );
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider />;
  }, []);

  useEffect(() => {
    const createNotificationSub = API.graphql(
      graphqlOperation(onCreateNotifications, graphVariables)
    ).subscribe({
      next: ({ value }) => loadNotifications(),
    });
    
    const updateNotificationSub = API.graphql(
      graphqlOperation(onUpdateNotifications, graphVariables)
    ).subscribe({
      next: ({ value }) => loadNotifications()
    });
    
    const deleteNotificationSub = API.graphql(
      graphqlOperation(onDeleteNotifications, graphVariables)
    ).subscribe({
      next: ({ value }) => loadNotifications()
    });

    loadNotifications();

    return () => {
      createNotificationSub.unsubscribe();
      updateNotificationSub.unsubscribe();
      deleteNotificationSub.unsubscribe();
    }
  }, []);

  return (
    <View style={ss.pageWrapper}>
      {loading || notifications.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={listItemSeparator}
          style={{ width: "100%" }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
        />
      )}
    </View>
  );
};

export default NotificationsScreen;
