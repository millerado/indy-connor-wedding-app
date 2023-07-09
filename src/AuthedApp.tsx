import React, { useEffect, useContext, useRef } from "react";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { onCreateNotifications, onUpdateNotifications, onDeleteNotifications, onCreateScheduledNotifications, onUpdateScheduledNotifications, onDeleteScheduledNotifications} from './graphql/subscriptions';
import { listNotifications, listScheduledNotifications } from './graphql/queries';
import { Snackbar } from "./components";
import Navigation from "./navigation/navigation";
import { AuthContext, DataContext } from "./contexts";
import { ScheduledNotifications } from "./models";
import { DataStore, sendUserScheduledPushNotification, setBadgeCount, CalculateStandings } from "./utils";

const AuthedApp = (props) => {
  const { showSnackbar, onDismissSnackBar, snackbarDetails } = props;
  const authStatus = useContext(AuthContext).authStatus;
  const { setNotifications } = useContext(DataContext);

  const graphVariables = { filter: { userId: {eq: authStatus.userId} }, limit: 999999999 };

  const loadNotifications = async () => {
    try {
      const allNotifications = await API.graphql({ query: listNotifications, variables: graphVariables });

      const unfilteredItems = allNotifications?.data?.listNotifications?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        const pastOnly = items.filter((n) => n.displayTime <= new Date().toISOString());
        const numberUnread = pastOnly.filter((item) => !item.read).length;
        if(pastOnly.length > 0) {
          pastOnly.sort((a, b) => new Date(b.displayTime) - new Date(a.displayTime));
        }
        setNotifications(
          pastOnly.length, // totalNotifications
          numberUnread, // unreadNotifications
          pastOnly, // allNotifications
        );
        // console.log('-- Number Unread/Total --', numberUnread, pastOnly.length);
        setBadgeCount(numberUnread, authStatus.userId, authStatus.userId);
      }
    } catch (err) {
      console.log('-- Error Loading Notifications, No DataStore for these --', err);
    }
  }

  const loadScheduledNotifications = async () => {
    try {
      const allScheduledNotifications = await API.graphql({ query: listScheduledNotifications, variables: graphVariables });

      const unfilteredItems = allScheduledNotifications?.data?.listScheduledNotifications?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        // Changing this to only 1 item
        // Deleting one item should trigger the subscription to run and grab another
        const item = items[0];
        const date = new Date(item.displayTime);
        if(date.getTime() > Date.now()) {
          sendUserScheduledPushNotification(
            authStatus.userId,
            item.subject,
            item.messageBody,
            JSON.parse(item.linking),
            new Date(item.displayTime),
            JSON.parse(item.scheduleTrigger),
          );
        }
        DataStore.delete(ScheduledNotifications, item.id);
      }
    } catch (err) {
      console.log('-- Error Loading Scheduled Notifications, No DataStore for these --', err);
    }
  }

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

    const createScheduledNotificationSub = API.graphql(
      graphqlOperation(onCreateScheduledNotifications, graphVariables)
    ).subscribe({
      next: ({ value }) => loadScheduledNotifications(),
    });

    const updateScheduledNotificationSub = API.graphql(
      graphqlOperation(onUpdateScheduledNotifications, graphVariables)
    ).subscribe({
      next: ({ value }) => loadScheduledNotifications()
    });

    const deleteScheduledNotificationSub = API.graphql(
      graphqlOperation(onDeleteScheduledNotifications, graphVariables)
    ).subscribe({
      next: ({ value }) => loadScheduledNotifications()
    });

    loadNotifications();
    loadScheduledNotifications();

    return () => {
      createNotificationSub.unsubscribe();
      updateNotificationSub.unsubscribe();
      deleteNotificationSub.unsubscribe();
      createScheduledNotificationSub.unsubscribe();
      updateScheduledNotificationSub.unsubscribe();
      deleteScheduledNotificationSub.unsubscribe();
    }
  }, []);

  return (
    <>
      <Navigation />
      <Snackbar
        visible={showSnackbar}
        onDismiss={onDismissSnackBar}
        action={snackbarDetails.action}
        duration={snackbarDetails.duration}
        onIconPress={snackbarDetails.onIconPress}
      >
        {snackbarDetails.message}
      </Snackbar>
      <CalculateStandings />
    </>
  );
};

export default AuthedApp;
