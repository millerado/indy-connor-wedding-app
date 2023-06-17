import React, { useMemo, useEffect, useState, useContext, useCallback } from "react";
import { View, FlatList, Platform, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { SortDirection } from "aws-amplify";
import { Divider, ActivityIndicator, TextSizes, Icon, ConditionalWrapper } from "../../components";
import { FormatTextWithMentions } from "../../containers";
import { AuthContext } from "../../contexts";
import { Notifications } from "../../models";
import { DataStore } from '../../utils';
import styles from "./NotificationsScreenStyles";

const NotificationsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const navToLink = (targetType, id) => {
    // console.log('-- Notification Navigation --', targetType, id);
    if(targetType === 'post') {
      navigation.push("View Post", {
        postsID: id,
      });
    }
  }

  const renderItem = useCallback(
    ({ item }) => {
      // Need to add in Linking
      const linking = item.linking ? JSON.parse(item.linking) : null;
      const iconName = linking.icon?.iconDetails || 'alert';
      return (
        <ConditionalWrapper
          condition={linking.targetType}
          wrapper={(children) => (
            <Pressable onPress={() => navToLink(linking.targetType, linking.id)}>{children}</Pressable>
          )}
        >
          <View style={{padding: 10, flexDirection: 'row'}}>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10}}>
              <Icon name={iconName} size={30} />
            </View>
            <View style={{width: '100%', paddingRight: 10}}>
              <FormatTextWithMentions text={item.messageBody} size={TextSizes.L} />
            </View>
          </View>
        </ConditionalWrapper>
      )
    }
  , []);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback (
    () => {
      return (
        <Divider />
      )
    }
  , []);

  useEffect(() => {
    const notificationsSubscription = DataStore.observeQuery(Notifications, (n) => n.and(n => [
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
          style={{ width: '100%'}}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
          maxToRenderPerBatch={10} // Also the default
          initialNumToRender={10} // Also the default
        />
      )}
    </View>
  );
};

export default NotificationsScreen;
