import * as React from "react";

export const DefaultNotification = {
  totalNotifications: 0,
  unreadNotifications: 0,
}

export const NotificationContext = React.createContext({
  DefaultNotification
});
