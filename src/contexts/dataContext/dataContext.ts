import * as React from "react";

export const DataContext = React.createContext({
  refreshData: () => {},
  allUsers: [],
  allComments: [],
  allReactions: [],
  allPosts: [],
  allAdminFavorites: [],
  allFaqs: [],
  allSchedule: [],
  allGames: [],
  allTeams: [],
  allStandingsPeople: [],
  allStandingsTeams: [],
  totalNotifications: 0,
  unreadNotifications: 0,
  allNotifications: [],
  allExpoTokens: [],
});
