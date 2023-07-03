import React, { useEffect, useContext } from "react";
import { Snackbar } from "./components";
import Navigation from "./navigation/navigation";
import { AuthContext, NotificationContext } from "./contexts";
import { ScheduledNotifications, Notifications as NotificationsModel } from "./models";
import { DataStore, sendUserScheduledPushNotification, setBadgeCount, CalculateStandings } from "./utils";

const AuthedApp = (props) => {
  const { showSnackbar, onDismissSnackBar, snackbarDetails } = props;
  const authStatus = useContext(AuthContext).authStatus;
  const { setNotificationDetails } = useContext(NotificationContext);

  useEffect(() => {
    if(!authStatus.isAuthed) {
      return;
    }

    const scheduledNotificationsSubscription = DataStore.observeQuery(
      ScheduledNotifications,
      (p) => p.userId.eq(authStatus.userId)
    ).subscribe(({ items }) => {
      // console.log('-- Scheduled Notifications --', items);
      items.forEach((item) => {
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
      });
    });

    const notificationsSubscription = DataStore.observeQuery(NotificationsModel, (n) => n.and(n => [
      n.userId.eq(authStatus.userId),
      // n.displayTime.le(new Date().toISOString()), // Dates seem to get defined when useEffect is created, so filtering on the fly
    ]),
    ).subscribe(({ items }) => {
      const pastOnly = items.filter((n) => n.displayTime <= new Date().toISOString());
      const numberUnread = pastOnly.filter((item) => !item.read).length;
      setNotificationDetails({
        totalNotifications: pastOnly.length,
        unreadNotifications: numberUnread,
      });
      // console.log('-- Number Unread/Total --', numberUnread, pastOnly.length);
      setBadgeCount(numberUnread, authStatus.userId, authStatus.userId);
    });

    // const testNotifications = DataStore.observeQuery(NotificationsModel).subscribe(({ items }) => {
    //   console.log('-- All Notifications --', items.length);
    // });

    return () => {
      scheduledNotificationsSubscription.unsubscribe();
      notificationsSubscription.unsubscribe();
      // testNotifications.unsubscribe();
    };
  }, [authStatus]);

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
