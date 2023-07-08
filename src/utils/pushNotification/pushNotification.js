import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import DataStore from '../DataStore/DataStore';
import { ExpoTokens, Notifications as NotificationModel, ScheduledNotifications, Users } from "../../models";

export const getBadgeCount = () => {
  return Notifications.getBadgeCountAsync();
}

export const setBadgeCount = async (count, userId, sendingUserId) => {
  if ( userId === sendingUserId ) {
    Notifications.setBadgeCountAsync(count);
  }
  
  const oldUser = await DataStore.query(Users, userId);
  // await DataStore.stop();
  await DataStore.save(
    Users.copyOf(oldUser, (updatedUser) => {
      updatedUser.unreadNotifications = count;
    })
  );
}

const cleanMessageBody = (body) => {
  // console.log('-- Send Notification --', token, title, body, data);
  let messageBody = body;

  // Regex matches on [username](userId), then replaces with username
  const regex = /@\[(.*?)\]\((.*?)\)/g;
  messageBody = messageBody.replace(regex, '$1');
  // console.log('-- Message Body After User Replace --', messageBody);

  // Regex matches on *bold text*
  const regexBold = /\*(.*?)\*/g;
  messageBody = messageBody.replace(regexBold, '$1');
  // console.log('-- Message Body After Bold Replace --', messageBody);

  // Regex matches on _italic text_
  const regexItalic = /_(.*?)_/g;
  messageBody = messageBody.replace(regexItalic, '$1');
  // console.log('-- Message Body After Italic Replace --', messageBody);
  return messageBody;
}

// send push notification based on an array of users
const sendGroupPushNotification = async (usersAndTokens, title, body, data) => {
  // console.log('-- Send Notification to Multiple Users --', usersAndTokens, title, body, data);
  const messageBody = cleanMessageBody(body);

  const payload = usersAndTokens.map((userAndToken) => {
    return {
      to: userAndToken.tokens,
      sound: 'default',
      title,
      body: messageBody,
      data,
      badge: userAndToken.badge,
    }
  });
  // console.log('-- Payload --', payload);

  fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// send a scheduled notification to the local device, no token needed
const scheduleLocalNotification = async (title, body, data, trigger) => {
  // console.log('-- Schedule Notification --', token, title, body, data, trigger);
  const messageBody = cleanMessageBody(body);
  
  const message = {
    sound: 'default',
    title,
    body: messageBody,
    data,
  };

  // console.log('-- Setting a notification for the future --', trigger);
  Notifications.scheduleNotificationAsync({
    content: message,
    trigger: {
      weekday: trigger.weekDay + 1,
      hour: trigger.hour,
      minute: trigger.minute,
      repeats: false,
    },
  });
}

// "Send" a local notification, won't be seen until the future
export const sendUserScheduledPushNotification = async (userId, title, body, data, displayDate = new Date(), trigger) => {
  if (userId === null || userId === '' || !trigger) {
    return;
  }
  // console.log('-- Send User Notification --', userId, title, body, data, displayDate, trigger);

  storeNotification(userId, title, body, data, displayDate.toISOString());

  scheduleLocalNotification(title, body, data, trigger);
}

// App-Facing function to send push notification to multiple users
export const sendUsersPushNotifications = async (userIds, title, body, data, sendingUserId) => {
  const tokenRecords = await DataStore.query(ExpoTokens);
  const allUsers = await DataStore.query(
    Users,
    (u) =>
      u.or(u => {
        const filter = [];
        for(let i = 0; i < userIds.length; i++) {
          filter.push(u.id.eq(userIds[i]));
        }
        return filter;
      })
  );

  const usersForBulkSend = [];
  userIds.forEach(userId => {
    if(userId !== sendingUserId) {
      storeNotification(userId, title, body, data, new Date().toISOString());
      // Build an array of userId, array of tokens
      const allUserTokens = tokenRecords.filter(t => t.userId === userId);
      const unreadNotifications = allUsers.find(u => u.id === userId)?.unreadNotifications;
      setBadgeCount(unreadNotifications + 1, userId, sendingUserId);
      if ( allUserTokens.length > 0 ) {
        const uniqueOneUserTokens = [ ...new Set(allUserTokens.map(t => t.token)) ];
        
        usersForBulkSend.push({
          userId,
          tokens: uniqueOneUserTokens.length === 1 ? uniqueOneUserTokens[0] : uniqueOneUserTokens,
          badge: unreadNotifications + 1,
        });
      }
    }
  });

  if(usersForBulkSend.length > 0) {
    // console.log('-- usersForBulkSend --', usersForBulkSend);
    // console.log('-- Sending Bulk Notification --', title, body, data);
    sendGroupPushNotification(usersForBulkSend, title, body, data);
  }
}

// sends push notification for all devices
// used for global messaging
export const sendGlobalPushNotification = async (title, body, data, sendingUserId) => {
  // console.log('-- Send Global Notification --', title, body, data);
  const tokenRecords = await DataStore.query(ExpoTokens);
  // const uniqueTokens = [ ...new Set(tokenRecords.map(t => t.token)) ]; // Don't need this for this app that doesn't have unauthed users, leaving here for T-Party next year
  const uniqueUsers = [ ...new Set(tokenRecords.map(t => t.userId)) ];
  // console.log('-- uniqueUsers --', uniqueUsers);

  const allUsers = await DataStore.query(
    Users,
    (u) =>
      u.or(u => {
        const filter = [];
        for(let i = 0; i < uniqueUsers.length; i++) {
          filter.push(u.id.eq(uniqueUsers[i]));
        }
        return filter;
      })
  );

  const usersForBulkSend = [];
  uniqueUsers.forEach(async (userId) => {
    storeNotification(userId, title, body, data, new Date().toISOString());
    // Build an array of userId, array of tokens
    const allUserTokens = tokenRecords.filter(t => t.userId === userId);
    const uniqueOneUserTokens = [ ...new Set(allUserTokens.map(t => t.token)) ];
    const unreadNotifications = allUsers.find(u => u.id === userId)?.unreadNotifications;
    setBadgeCount(unreadNotifications + 1, userId, sendingUserId);
    
    usersForBulkSend.push({
      userId,
      tokens: uniqueOneUserTokens.length === 1 ? uniqueOneUserTokens[0] : uniqueOneUserTokens,
      badge: unreadNotifications + 1,
    });
  });

  if(usersForBulkSend.length > 0) {
    // console.log('-- usersForBulkSend --', usersForBulkSend);
    sendGroupPushNotification(usersForBulkSend, title, body, data);
  }
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
  // console.log('-- Save Push Token --', token, userId);
  // Legacy code for an app with using the app anonymously. Leaving to make reusing this code later easier
  userId = userId ? userId : "";

  // Change this to GraphQL
  const tokenRecords = await DataStore.query(ExpoTokens, expoToken =>
    expoToken.token.eq(token)
  );

  // console.log('tokenRecords', tokenRecords.length);

  let needsToSaveNew = false;
  if (tokenRecords.length === 1) {
    if(tokenRecords[0].userId !== userId) {
      // This token is changing users, delete the old token
      // console.log('Deleting old token')
      await DataStore.delete(tokenRecords[0].id);
      needsToSaveNew = true;
    }
  } else if (tokenRecords.length > 1) {
    // Somehow this token is in the system more than once, delete them all
    // console.log('Deleting all tokens')
    await DataStore.delete(ExpoTokens, (t) => t.token.eq(token));
    needsToSaveNew = true;
  } else if (tokenRecords.length === 0) {
    // This token is not in the system, save it
    // console.log('Need to save new token')
    needsToSaveNew = true;
  }

  if (needsToSaveNew) {
    // console.log('Saving new token')
    await DataStore.save(
      new ExpoTokens({
        token,
        userId
      })
    );
  }
};