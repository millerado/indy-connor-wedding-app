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
import {
  Divider,
  ActivityIndicator,
  TextSizes,
  Icon,
  ConditionalWrapper,
  Text,
} from "../../components";
import { FormatTextWithMentions } from "../../containers";
import { DataContext } from "../../contexts";
import { Notifications } from "../../models";
import { typography, calcDimensions } from "../../styles";
import { DataStore } from "../../utils";
import styles from "./NotificationsScreenStyles";

const NotificationsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { refreshData, selectedEventId, allNotifications } = useContext(DataContext);

  const navToLink = (targetType, id) => {
    // console.log('-- Notification Navigation --', targetType, id);
    if (targetType === "post") {
      navigation.push("View Post", {
        postsID: id,
      });
    }
  };

  const renderItem = useCallback(({ item }) => {
    return <RenderNotificationItem item={item} navToLink={navToLink} />;RenderNotificationItem
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider />;
  }, []);

  const onRefresh = async () => {
    refreshData(selectedEventId);
  }

  return (
    <View style={ss.pageWrapper}>
      {allNotifications?.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <FlatList
          data={allNotifications}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={listItemSeparator}
          style={{ width: "100%" }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default 
          onRefresh={onRefresh}
          refreshing={false}
        />
      )}
    </View>
  );
};

export default NotificationsScreen;

const RenderNotificationItem = (props) => {
  const { item, navToLink } = props;
  const { width } = calcDimensions();
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [read, setRead] = useState(item.read);

  const linking = item.linking ? JSON.parse(item.linking) : null;
  const iconName = linking.icon?.iconDetails || "alert";
  let centerWidth = width - (typography.fontSizeL * 2 + 20);
  if (!read) {
    centerWidth = centerWidth - (typography.fontSizeL * 2 + 15);
  }

  useEffect(() => {
    setRead(item.read);
  }, [item.read])

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
    DataStore.delete(Notifications, item.id);
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
            {!read && (
              <Pressable
                onPress={async () => {
                  setRead(true);
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
};