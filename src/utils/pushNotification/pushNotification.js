import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import DataStore from '../DataStore/DataStore';
import { ExpoTokens } from "../../models";

// send push notification based on an expo token
const sendPushNotification = async (token, title, body, data) => {
  const message = {
    to: token,
    sound: 'default',
    title,
    body,
    data,
  };

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

// sends push notification to user, identified by userId
// if userId is mapped to multiple devices (tokens), sends notification to all of them
export const sendUserPushNotification = async (userId, title, body, data) => {
  if (userId === null || userId === '') {
    return;
  }

  const tokenRecords = await DataStore.query(ExpoTokens, t => t.userId("eq",  userId));
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

export const registerForPushNotificationsAsync = async (userId) => {
  // console.log(userId);
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
  userId = userId ? userId : "";
  const tokenRecords = await DataStore.query(ExpoTokens, expoToken => 
    expoToken
      .token("eq",  token)
      .userId("eq", userId)
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
  }
};