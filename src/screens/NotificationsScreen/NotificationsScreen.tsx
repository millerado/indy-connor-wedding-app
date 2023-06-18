import React, {
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { View, FlatList, Platform, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { SortDirection } from "aws-amplify";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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

  const { width } = calcDimensions();

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

    // Removed swiping to mark as read for now
    // const renderLeftActions = () => {
    //   return (
    //     <View style={{backgroundColor: theme.colors.primary, flex: 1, alignItems: 'center', paddingLeft: 10, flexDirection: 'row'}}>
    //       <Icon name="markAsRead" size={typography.fontSizeL * 1.5} color={theme.colors.onPrimary} style={{paddingRight: 10}} />
    //       <Text color={theme.colors.onPrimary}>
    //         Mark as Read
    //       </Text>
    //     </View>
    //   );
    // };
    // const onSwipeLeft = () => {
    //   // console.log('Swiped Left');
    //   DataStore.save(
    //     Notifications.copyOf(item, (updated) => {
    //       updated.read = true;
    //     })
    //   );
    // }

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
      <Swipeable
        // renderLeftActions={renderLeftActions}
        // onSwipeableLeftOpen={onSwipeLeft}
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
          <View style={{ padding: 10, flexDirection: "row", flex: 0, justifyContent: 'space-between', backgroundColor: theme.colors.background }}>
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
                onPress={() => {
                  DataStore.save(
                    Notifications.copyOf(item, (updated) => {
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
    );
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider />;
  }, []);

  useEffect(() => {
    const notificationsSubscription = DataStore.observeQuery(
      Notifications,
      (n) =>
        n.and((n) => [
          n.userId.eq(authStatus.userId),
          n.displayTime.le(new Date().toISOString()),
        ]),
      { sort: (s) => s.displayTime(SortDirection.DESCENDING) }
    ).subscribe(({ items }) => {
      setNotifications(items);
      setLoading(false);
    });

    return () => {
      notificationsSubscription.unsubscribe();
    };
  }, [authStatus]);

  return (
    <View style={ss.pageWrapper}>
      {loading ? (
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
