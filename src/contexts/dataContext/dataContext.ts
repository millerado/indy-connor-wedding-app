import * as React from "react";

export const DataContext = React.createContext({
  refreshData: () => {},
  setNotifications: (totalNotifications, unreadNotifications, allNotifications) => {},
  allUsers: [],
  allComments: [],
  allReactions: [],
  allPosts: [],
  allAdminFavorites: [],
  totalNotifications: 0,
  unreadNotifications: 0,
  allNotifications: [],
});
