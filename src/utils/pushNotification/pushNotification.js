import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import DataStore from '../DataStore/DataStore';
import { ExpoTokens, Notifications as NotificationModel, ScheduledNotifications } from "../../models";

// send push notification based on an expo token
const sendPushNotification = async (token, title, body, data, trigger) => {
  // console.log('-- Send Notification --', token, title, body, data);
  // TO-DO: We need Badge in here to uddate Badge # on iOS
  const message = {
    to: token,
    sound: 'default',
    title,
    body,
    data,
  };``

  if (trigger) {
    Notifications.scheduleNotificationAsync({
      content: message,
      trigger: {
        weekday: trigger.weekDay,
        hour: trigger.hour,
        minute: trigger.minute,
        repeats: false,
      },
    });
  } else {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }

  // Notifications.scheduleNotificationAsync({
  //   content: {
  //     to: token,
  //     sound: 'default',
  //     title,
  //     body,
  //     data,
  //   },
  //   trigger: {
  //     weekday: 1,
  //     hour: 17,
  //     minute: 46,
  //     repeats: false,
  //   },
  // });
}

// const scheduleNotification = async (token, title, body, data, scheduleTrigger, displayTime) => {
//   // console.log('-- Schedule Notification --', token, title, body, data, scheduleTrigger, displayTime);
//   // console.log('-- Formatted Message Body --', formattedMessageBody);
//   Notifications.scheduleNotificationAsync({
//     content: {
//       to: token,
//       sound: 'default',
//       title,
//       body,
//       data,
//     },
//     trigger: {
//       weekday: scheduleTrigger.weekDay,
//       hour: scheduleTrigger.hour,
//       minute: scheduleTrigger.minute,
//       repeats: false,
//     },
//   });

// }

// sends push notification to user, identified by userId
// if userId is mapped to multiple devices (tokens), sends notification to all of them
export const sendUserPushNotification = async (userId, title, body, data) => {
  if (userId === null || userId === '') {
    return;
  }

  storeNotification(userId, title, body, data, new Date().toISOString());

  const tokenRecords = await DataStore.query(ExpoTokens, t => t.userId.eq(userId));
  tokenRecords.forEach(expoToken => {
    sendPushNotification(expoToken.token, title, body, data);
  });
}

// sends push notification for all devices
// used for global messaging
export const sendGlobalPushNotification = async (title, body, data) => {
  const tokenRecords = await DataStore.query(ExpoTokens);
  const uniqueTokens = [ ...new Set(tokenRecords.map(t => t.token)) ];

  uniqueTokens.forEach(token => {
    sendPushNotification(token, title, body, data);
  });
}

export const scheduleNotificationForAnotherUser = async (userId, title, messageBody, data, scheduleTrigger, displayTime) => {
  // console.log('-- Schedule Notification --', userId, title, messageBody, data, scheduleTrigger, displayTime);
  // console.log('-- Formatted Message Body --', formattedMessageBody);
  await DataStore.save(
    new ScheduledNotifications({
      userId,
      subject: title,
      linking: JSON.stringify(data),
      messageBody: messageBody,
      displayTime,
      scheduleTrigger: JSON.stringify(scheduleTrigger),
    })
  );
}

const storeNotification = async (userId, title, body, data, displayTime) => {
  // console.log('-- Store Notification --', userId, title, body, data, displayTime);
  await DataStore.save(
    new NotificationModel({
      userId,
      read: false,
      subject: title,
      messageBody: body,
      linking: JSON.stringify(data),
      displayTime
    })
  );
}

export const handleScheduledNotification = async (notification) => {
  // console.log('-- Handle Scheduled Notification --', notification);
  // const { userId, subject, messageBody, linking, displayTime } = notification;
  // const data = JSON.parse(linking);
  // const scheduleTrigger = JSON.parse(notification.scheduleTrigger);
  // await scheduleNotificationForAnotherUser(userId, subject, messageBody, data, scheduleTrigger, displayTime);
  // await DataStore.delete(notification);
}

export const registerForPushNotificationsAsync = async (userId) => {
  // console.log('-- Register for Push --', userId);
  // console.log('-- My Push Token --', (await Notifications.getExpoPushTokenAsync()).data);
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    savePushTokenAsync(token, userId);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};

export const savePushTokenAsync = async (token, userId) => {
  // Legacy code for an app with using the app anonymously. Leaving to make reusing this code later easier
  userId = userId ? userId : "";

  const tokenRecords = await DataStore.query(ExpoTokens, expoToken =>
    expoToken.token.eq(token)
  );

  if (tokenRecords.length === 0) {
    // if no token record exists for the userId, insert it
    // this will work for auth'ed user with valid userId
    // or unauth'ed user with empty userId
    await DataStore.save(
      new ExpoTokens({
        token,
        userId
      })
    );
  } else if (tokenRecords[0].userId !== userId) {
    // if token record exists in the DB, but the userId is different
    // update the userId (aka only one user on this phone)
    await DataStore.save(
      ExpoTokens.copyOf(tokenRecords[0], updated => {
        updated.userId = userId;
      })
    );
  }
};