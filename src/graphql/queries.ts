/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getEvents = /* GraphQL */ `query GetEvents($id: ID!) {
  getEvents(id: $id) {
    id
    eventName
    eventPassword
    startDate
    endDate
    displayStartDate
    displayEndDate
    allowNewActivity
    eventFunctionality
    adminPassword
    users
    StandingsPeople {
      nextToken
      startedAt
      __typename
    }
    AdminFavorites {
      nextToken
      startedAt
      __typename
    }
    StandingsTeams {
      nextToken
      startedAt
      __typename
    }
    Posts {
      nextToken
      startedAt
      __typename
    }
    Reactions {
      nextToken
      startedAt
      __typename
    }
    Comments {
      nextToken
      startedAt
      __typename
    }
    FAQS {
      nextToken
      startedAt
      __typename
    }
    Schedules {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetEventsQueryVariables, APITypes.GetEventsQuery>;
export const listEvents = /* GraphQL */ `query ListEvents(
  $filter: ModelEventsFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      eventName
      eventPassword
      startDate
      endDate
      displayStartDate
      displayEndDate
      allowNewActivity
      eventFunctionality
      adminPassword
      users
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListEventsQueryVariables,
  APITypes.ListEventsQuery
>;
export const syncEvents = /* GraphQL */ `query SyncEvents(
  $filter: ModelEventsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncEvents(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      eventName
      eventPassword
      startDate
      endDate
      displayStartDate
      displayEndDate
      allowNewActivity
      eventFunctionality
      adminPassword
      users
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncEventsQueryVariables,
  APITypes.SyncEventsQuery
>;
export const getScheduledNotifications = /* GraphQL */ `query GetScheduledNotifications($id: ID!) {
  getScheduledNotifications(id: $id) {
    id
    userId
    subject
    linking
    messageBody
    scheduleTrigger
    displayTime
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetScheduledNotificationsQueryVariables,
  APITypes.GetScheduledNotificationsQuery
>;
export const listScheduledNotifications = /* GraphQL */ `query ListScheduledNotifications(
  $filter: ModelScheduledNotificationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listScheduledNotifications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      subject
      linking
      messageBody
      scheduleTrigger
      displayTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScheduledNotificationsQueryVariables,
  APITypes.ListScheduledNotificationsQuery
>;
export const syncScheduledNotifications = /* GraphQL */ `query SyncScheduledNotifications(
  $filter: ModelScheduledNotificationsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncScheduledNotifications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      subject
      linking
      messageBody
      scheduleTrigger
      displayTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncScheduledNotificationsQueryVariables,
  APITypes.SyncScheduledNotificationsQuery
>;
export const getNotifications = /* GraphQL */ `query GetNotifications($id: ID!) {
  getNotifications(id: $id) {
    id
    userId
    read
    messageBody
    linking
    subject
    displayTime
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNotificationsQueryVariables,
  APITypes.GetNotificationsQuery
>;
export const listNotifications = /* GraphQL */ `query ListNotifications(
  $filter: ModelNotificationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      read
      messageBody
      linking
      subject
      displayTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNotificationsQueryVariables,
  APITypes.ListNotificationsQuery
>;
export const syncNotifications = /* GraphQL */ `query SyncNotifications(
  $filter: ModelNotificationsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncNotifications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      read
      messageBody
      linking
      subject
      displayTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncNotificationsQueryVariables,
  APITypes.SyncNotificationsQuery
>;
export const getGames = /* GraphQL */ `query GetGames($id: ID!) {
  getGames(id: $id) {
    id
    name
    iconName
    minNumberOfTeams
    maxNumberOfTeams
    minNumberOfPlayersPerTeam
    maxNumberOfPlayersPerTeam
    points
    rules
    canHaveMultipleWinners
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGamesQueryVariables, APITypes.GetGamesQuery>;
export const listGames = /* GraphQL */ `query ListGames(
  $filter: ModelGamesFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      iconName
      minNumberOfTeams
      maxNumberOfTeams
      minNumberOfPlayersPerTeam
      maxNumberOfPlayersPerTeam
      points
      rules
      canHaveMultipleWinners
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListGamesQueryVariables, APITypes.ListGamesQuery>;
export const syncGames = /* GraphQL */ `query SyncGames(
  $filter: ModelGamesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncGames(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      iconName
      minNumberOfTeams
      maxNumberOfTeams
      minNumberOfPlayersPerTeam
      maxNumberOfPlayersPerTeam
      points
      rules
      canHaveMultipleWinners
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncGamesQueryVariables, APITypes.SyncGamesQuery>;
export const getStandingsPeople = /* GraphQL */ `query GetStandingsPeople($id: ID!) {
  getStandingsPeople(id: $id) {
    id
    userId
    rank
    points
    gamesPlayed
    lastCalculationTime
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetStandingsPeopleQueryVariables,
  APITypes.GetStandingsPeopleQuery
>;
export const listStandingsPeople = /* GraphQL */ `query ListStandingsPeople(
  $filter: ModelStandingsPeopleFilterInput
  $limit: Int
  $nextToken: String
) {
  listStandingsPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      rank
      points
      gamesPlayed
      lastCalculationTime
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStandingsPeopleQueryVariables,
  APITypes.ListStandingsPeopleQuery
>;
export const syncStandingsPeople = /* GraphQL */ `query SyncStandingsPeople(
  $filter: ModelStandingsPeopleFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncStandingsPeople(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      rank
      points
      gamesPlayed
      lastCalculationTime
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncStandingsPeopleQueryVariables,
  APITypes.SyncStandingsPeopleQuery
>;
export const standingsPeopleByEventsID = /* GraphQL */ `query StandingsPeopleByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelStandingsPeopleFilterInput
  $limit: Int
  $nextToken: String
) {
  standingsPeopleByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      rank
      points
      gamesPlayed
      lastCalculationTime
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.StandingsPeopleByEventsIDQueryVariables,
  APITypes.StandingsPeopleByEventsIDQuery
>;
export const getAdminFavorites = /* GraphQL */ `query GetAdminFavorites($id: ID!) {
  getAdminFavorites(id: $id) {
    id
    image
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAdminFavoritesQueryVariables,
  APITypes.GetAdminFavoritesQuery
>;
export const listAdminFavorites = /* GraphQL */ `query ListAdminFavorites(
  $filter: ModelAdminFavoritesFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdminFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      image
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminFavoritesQueryVariables,
  APITypes.ListAdminFavoritesQuery
>;
export const syncAdminFavorites = /* GraphQL */ `query SyncAdminFavorites(
  $filter: ModelAdminFavoritesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAdminFavorites(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      image
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncAdminFavoritesQueryVariables,
  APITypes.SyncAdminFavoritesQuery
>;
export const adminFavoritesByEventsID = /* GraphQL */ `query AdminFavoritesByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAdminFavoritesFilterInput
  $limit: Int
  $nextToken: String
) {
  adminFavoritesByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      image
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AdminFavoritesByEventsIDQueryVariables,
  APITypes.AdminFavoritesByEventsIDQuery
>;
export const getStandingsTeams = /* GraphQL */ `query GetStandingsTeams($id: ID!) {
  getStandingsTeams(id: $id) {
    id
    teamId
    rank
    points
    lastCalculationTime
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetStandingsTeamsQueryVariables,
  APITypes.GetStandingsTeamsQuery
>;
export const listStandingsTeams = /* GraphQL */ `query ListStandingsTeams(
  $filter: ModelStandingsTeamsFilterInput
  $limit: Int
  $nextToken: String
) {
  listStandingsTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      teamId
      rank
      points
      lastCalculationTime
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStandingsTeamsQueryVariables,
  APITypes.ListStandingsTeamsQuery
>;
export const syncStandingsTeams = /* GraphQL */ `query SyncStandingsTeams(
  $filter: ModelStandingsTeamsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncStandingsTeams(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      teamId
      rank
      points
      lastCalculationTime
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncStandingsTeamsQueryVariables,
  APITypes.SyncStandingsTeamsQuery
>;
export const standingsTeamsByEventsID = /* GraphQL */ `query StandingsTeamsByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelStandingsTeamsFilterInput
  $limit: Int
  $nextToken: String
) {
  standingsTeamsByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      teamId
      rank
      points
      lastCalculationTime
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.StandingsTeamsByEventsIDQueryVariables,
  APITypes.StandingsTeamsByEventsIDQuery
>;
export const getPosts = /* GraphQL */ `query GetPosts($id: ID!) {
  getPosts(id: $id) {
    id
    userId
    messageBody
    images
    olympicEvent
    eventDetails
    Comments {
      nextToken
      startedAt
      __typename
    }
    Reactions {
      nextToken
      startedAt
      __typename
    }
    usersInPost
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostsQueryVariables, APITypes.GetPostsQuery>;
export const listPosts = /* GraphQL */ `query ListPosts(
  $filter: ModelPostsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      messageBody
      images
      olympicEvent
      eventDetails
      usersInPost
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const syncPosts = /* GraphQL */ `query SyncPosts(
  $filter: ModelPostsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPosts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      messageBody
      images
      olympicEvent
      eventDetails
      usersInPost
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncPostsQueryVariables, APITypes.SyncPostsQuery>;
export const postsByEventsID = /* GraphQL */ `query PostsByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPostsFilterInput
  $limit: Int
  $nextToken: String
) {
  postsByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      messageBody
      images
      olympicEvent
      eventDetails
      usersInPost
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PostsByEventsIDQueryVariables,
  APITypes.PostsByEventsIDQuery
>;
export const getTeams = /* GraphQL */ `query GetTeams($id: ID!) {
  getTeams(id: $id) {
    id
    name
    Users {
      nextToken
      startedAt
      __typename
    }
    iconName
    description
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTeamsQueryVariables, APITypes.GetTeamsQuery>;
export const listTeams = /* GraphQL */ `query ListTeams(
  $filter: ModelTeamsFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      iconName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTeamsQueryVariables, APITypes.ListTeamsQuery>;
export const syncTeams = /* GraphQL */ `query SyncTeams(
  $filter: ModelTeamsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncTeams(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      iconName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncTeamsQueryVariables, APITypes.SyncTeamsQuery>;
export const getUsers = /* GraphQL */ `query GetUsers($id: ID!) {
  getUsers(id: $id) {
    id
    name
    image
    about
    whereAreYouStaying
    teamsID
    admin
    unreadNotifications
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUsersQueryVariables, APITypes.GetUsersQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      image
      about
      whereAreYouStaying
      teamsID
      admin
      unreadNotifications
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const syncUsers = /* GraphQL */ `query SyncUsers(
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      image
      about
      whereAreYouStaying
      teamsID
      admin
      unreadNotifications
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncUsersQueryVariables, APITypes.SyncUsersQuery>;
export const usersByTeamsID = /* GraphQL */ `query UsersByTeamsID(
  $teamsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelUsersFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByTeamsID(
    teamsID: $teamsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      image
      about
      whereAreYouStaying
      teamsID
      admin
      unreadNotifications
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByTeamsIDQueryVariables,
  APITypes.UsersByTeamsIDQuery
>;
export const getExpoTokens = /* GraphQL */ `query GetExpoTokens($id: ID!) {
  getExpoTokens(id: $id) {
    id
    token
    userId
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExpoTokensQueryVariables,
  APITypes.GetExpoTokensQuery
>;
export const listExpoTokens = /* GraphQL */ `query ListExpoTokens(
  $filter: ModelExpoTokensFilterInput
  $limit: Int
  $nextToken: String
) {
  listExpoTokens(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      token
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExpoTokensQueryVariables,
  APITypes.ListExpoTokensQuery
>;
export const syncExpoTokens = /* GraphQL */ `query SyncExpoTokens(
  $filter: ModelExpoTokensFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncExpoTokens(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      token
      userId
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncExpoTokensQueryVariables,
  APITypes.SyncExpoTokensQuery
>;
export const getReactions = /* GraphQL */ `query GetReactions($id: ID!) {
  getReactions(id: $id) {
    id
    userId
    reactionType
    postsID
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetReactionsQueryVariables,
  APITypes.GetReactionsQuery
>;
export const listReactions = /* GraphQL */ `query ListReactions(
  $filter: ModelReactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  listReactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      reactionType
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReactionsQueryVariables,
  APITypes.ListReactionsQuery
>;
export const syncReactions = /* GraphQL */ `query SyncReactions(
  $filter: ModelReactionsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncReactions(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      reactionType
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncReactionsQueryVariables,
  APITypes.SyncReactionsQuery
>;
export const reactionsByPostsID = /* GraphQL */ `query ReactionsByPostsID(
  $postsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  reactionsByPostsID(
    postsID: $postsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      reactionType
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ReactionsByPostsIDQueryVariables,
  APITypes.ReactionsByPostsIDQuery
>;
export const reactionsByEventsID = /* GraphQL */ `query ReactionsByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReactionsFilterInput
  $limit: Int
  $nextToken: String
) {
  reactionsByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      reactionType
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ReactionsByEventsIDQueryVariables,
  APITypes.ReactionsByEventsIDQuery
>;
export const getComments = /* GraphQL */ `query GetComments($id: ID!) {
  getComments(id: $id) {
    id
    userId
    comment
    postsID
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentsQueryVariables,
  APITypes.GetCommentsQuery
>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      comment
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const syncComments = /* GraphQL */ `query SyncComments(
  $filter: ModelCommentsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncComments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      userId
      comment
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncCommentsQueryVariables,
  APITypes.SyncCommentsQuery
>;
export const commentsByPostsID = /* GraphQL */ `query CommentsByPostsID(
  $postsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCommentsFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByPostsID(
    postsID: $postsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      comment
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByPostsIDQueryVariables,
  APITypes.CommentsByPostsIDQuery
>;
export const commentsByEventsID = /* GraphQL */ `query CommentsByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelCommentsFilterInput
  $limit: Int
  $nextToken: String
) {
  commentsByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userId
      comment
      postsID
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CommentsByEventsIDQueryVariables,
  APITypes.CommentsByEventsIDQuery
>;
export const getFAQ = /* GraphQL */ `query GetFAQ($id: ID!) {
  getFAQ(id: $id) {
    id
    question
    answer
    sortOrder
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetFAQQueryVariables, APITypes.GetFAQQuery>;
export const listFAQS = /* GraphQL */ `query ListFAQS($filter: ModelFAQFilterInput, $limit: Int, $nextToken: String) {
  listFAQS(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      question
      answer
      sortOrder
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.ListFAQSQueryVariables, APITypes.ListFAQSQuery>;
export const syncFAQS = /* GraphQL */ `query SyncFAQS(
  $filter: ModelFAQFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncFAQS(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      question
      answer
      sortOrder
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.SyncFAQSQueryVariables, APITypes.SyncFAQSQuery>;
export const fAQSByEventsID = /* GraphQL */ `query FAQSByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelFAQFilterInput
  $limit: Int
  $nextToken: String
) {
  fAQSByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      question
      answer
      sortOrder
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.FAQSByEventsIDQueryVariables,
  APITypes.FAQSByEventsIDQuery
>;
export const getSchedule = /* GraphQL */ `query GetSchedule($id: ID!) {
  getSchedule(id: $id) {
    id
    name
    time
    day
    description
    location
    sortOrder
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetScheduleQueryVariables,
  APITypes.GetScheduleQuery
>;
export const listSchedules = /* GraphQL */ `query ListSchedules(
  $filter: ModelScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      time
      day
      description
      location
      sortOrder
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSchedulesQueryVariables,
  APITypes.ListSchedulesQuery
>;
export const syncSchedules = /* GraphQL */ `query SyncSchedules(
  $filter: ModelScheduleFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncSchedules(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      name
      time
      day
      description
      location
      sortOrder
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncSchedulesQueryVariables,
  APITypes.SyncSchedulesQuery
>;
export const schedulesByEventsID = /* GraphQL */ `query SchedulesByEventsID(
  $eventsID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelScheduleFilterInput
  $limit: Int
  $nextToken: String
) {
  schedulesByEventsID(
    eventsID: $eventsID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      time
      day
      description
      location
      sortOrder
      eventsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SchedulesByEventsIDQueryVariables,
  APITypes.SchedulesByEventsIDQuery
>;
