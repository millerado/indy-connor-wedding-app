/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateScheduledNotifications = /* GraphQL */ `
  subscription OnCreateScheduledNotifications(
    $filter: ModelSubscriptionScheduledNotificationsFilterInput
  ) {
    onCreateScheduledNotifications(filter: $filter) {
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
`;
export const onUpdateScheduledNotifications = /* GraphQL */ `
  subscription OnUpdateScheduledNotifications(
    $filter: ModelSubscriptionScheduledNotificationsFilterInput
  ) {
    onUpdateScheduledNotifications(filter: $filter) {
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
`;
export const onDeleteScheduledNotifications = /* GraphQL */ `
  subscription OnDeleteScheduledNotifications(
    $filter: ModelSubscriptionScheduledNotificationsFilterInput
  ) {
    onDeleteScheduledNotifications(filter: $filter) {
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
`;
export const onCreateNotifications = /* GraphQL */ `
  subscription OnCreateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onCreateNotifications(filter: $filter) {
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
`;
export const onUpdateNotifications = /* GraphQL */ `
  subscription OnUpdateNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onUpdateNotifications(filter: $filter) {
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
`;
export const onDeleteNotifications = /* GraphQL */ `
  subscription OnDeleteNotifications(
    $filter: ModelSubscriptionNotificationsFilterInput
  ) {
    onDeleteNotifications(filter: $filter) {
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
`;
export const onCreateGames = /* GraphQL */ `
  subscription OnCreateGames($filter: ModelSubscriptionGamesFilterInput) {
    onCreateGames(filter: $filter) {
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
`;
export const onUpdateGames = /* GraphQL */ `
  subscription OnUpdateGames($filter: ModelSubscriptionGamesFilterInput) {
    onUpdateGames(filter: $filter) {
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
`;
export const onDeleteGames = /* GraphQL */ `
  subscription OnDeleteGames($filter: ModelSubscriptionGamesFilterInput) {
    onDeleteGames(filter: $filter) {
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
`;
export const onCreateStandingsPeople = /* GraphQL */ `
  subscription OnCreateStandingsPeople(
    $filter: ModelSubscriptionStandingsPeopleFilterInput
  ) {
    onCreateStandingsPeople(filter: $filter) {
      id
      userId
      rank
      points
      gamesPlayed
      lastCalculationTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateStandingsPeople = /* GraphQL */ `
  subscription OnUpdateStandingsPeople(
    $filter: ModelSubscriptionStandingsPeopleFilterInput
  ) {
    onUpdateStandingsPeople(filter: $filter) {
      id
      userId
      rank
      points
      gamesPlayed
      lastCalculationTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteStandingsPeople = /* GraphQL */ `
  subscription OnDeleteStandingsPeople(
    $filter: ModelSubscriptionStandingsPeopleFilterInput
  ) {
    onDeleteStandingsPeople(filter: $filter) {
      id
      userId
      rank
      points
      gamesPlayed
      lastCalculationTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateAdminFavorites = /* GraphQL */ `
  subscription OnCreateAdminFavorites(
    $filter: ModelSubscriptionAdminFavoritesFilterInput
  ) {
    onCreateAdminFavorites(filter: $filter) {
      id
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateAdminFavorites = /* GraphQL */ `
  subscription OnUpdateAdminFavorites(
    $filter: ModelSubscriptionAdminFavoritesFilterInput
  ) {
    onUpdateAdminFavorites(filter: $filter) {
      id
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteAdminFavorites = /* GraphQL */ `
  subscription OnDeleteAdminFavorites(
    $filter: ModelSubscriptionAdminFavoritesFilterInput
  ) {
    onDeleteAdminFavorites(filter: $filter) {
      id
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateStandingsTeams = /* GraphQL */ `
  subscription OnCreateStandingsTeams(
    $filter: ModelSubscriptionStandingsTeamsFilterInput
  ) {
    onCreateStandingsTeams(filter: $filter) {
      id
      teamId
      rank
      points
      lastCalculationTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateStandingsTeams = /* GraphQL */ `
  subscription OnUpdateStandingsTeams(
    $filter: ModelSubscriptionStandingsTeamsFilterInput
  ) {
    onUpdateStandingsTeams(filter: $filter) {
      id
      teamId
      rank
      points
      lastCalculationTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteStandingsTeams = /* GraphQL */ `
  subscription OnDeleteStandingsTeams(
    $filter: ModelSubscriptionStandingsTeamsFilterInput
  ) {
    onDeleteStandingsTeams(filter: $filter) {
      id
      teamId
      rank
      points
      lastCalculationTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreatePosts = /* GraphQL */ `
  subscription OnCreatePosts($filter: ModelSubscriptionPostsFilterInput) {
    onCreatePosts(filter: $filter) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdatePosts = /* GraphQL */ `
  subscription OnUpdatePosts($filter: ModelSubscriptionPostsFilterInput) {
    onUpdatePosts(filter: $filter) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeletePosts = /* GraphQL */ `
  subscription OnDeletePosts($filter: ModelSubscriptionPostsFilterInput) {
    onDeletePosts(filter: $filter) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateTeams = /* GraphQL */ `
  subscription OnCreateTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onCreateTeams(filter: $filter) {
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
`;
export const onUpdateTeams = /* GraphQL */ `
  subscription OnUpdateTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onUpdateTeams(filter: $filter) {
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
`;
export const onDeleteTeams = /* GraphQL */ `
  subscription OnDeleteTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onDeleteTeams(filter: $filter) {
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
`;
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
`;
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
`;
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
`;
export const onCreateExpoTokens = /* GraphQL */ `
  subscription OnCreateExpoTokens(
    $filter: ModelSubscriptionExpoTokensFilterInput
  ) {
    onCreateExpoTokens(filter: $filter) {
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
`;
export const onUpdateExpoTokens = /* GraphQL */ `
  subscription OnUpdateExpoTokens(
    $filter: ModelSubscriptionExpoTokensFilterInput
  ) {
    onUpdateExpoTokens(filter: $filter) {
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
`;
export const onDeleteExpoTokens = /* GraphQL */ `
  subscription OnDeleteExpoTokens(
    $filter: ModelSubscriptionExpoTokensFilterInput
  ) {
    onDeleteExpoTokens(filter: $filter) {
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
`;
export const onCreateReactions = /* GraphQL */ `
  subscription OnCreateReactions(
    $filter: ModelSubscriptionReactionsFilterInput
  ) {
    onCreateReactions(filter: $filter) {
      id
      userId
      reactionType
      postsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateReactions = /* GraphQL */ `
  subscription OnUpdateReactions(
    $filter: ModelSubscriptionReactionsFilterInput
  ) {
    onUpdateReactions(filter: $filter) {
      id
      userId
      reactionType
      postsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteReactions = /* GraphQL */ `
  subscription OnDeleteReactions(
    $filter: ModelSubscriptionReactionsFilterInput
  ) {
    onDeleteReactions(filter: $filter) {
      id
      userId
      reactionType
      postsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateComments = /* GraphQL */ `
  subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onCreateComments(filter: $filter) {
      id
      userId
      comment
      postsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateComments = /* GraphQL */ `
  subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
    onUpdateComments(filter: $filter) {
      id
      userId
      comment
      postsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteComments = /* GraphQL */ `
  subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
    onDeleteComments(filter: $filter) {
      id
      userId
      comment
      postsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateFAQ = /* GraphQL */ `
  subscription OnCreateFAQ($filter: ModelSubscriptionFAQFilterInput) {
    onCreateFAQ(filter: $filter) {
      id
      question
      answer
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateFAQ = /* GraphQL */ `
  subscription OnUpdateFAQ($filter: ModelSubscriptionFAQFilterInput) {
    onUpdateFAQ(filter: $filter) {
      id
      question
      answer
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteFAQ = /* GraphQL */ `
  subscription OnDeleteFAQ($filter: ModelSubscriptionFAQFilterInput) {
    onDeleteFAQ(filter: $filter) {
      id
      question
      answer
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onCreateSchedule(filter: $filter) {
      id
      name
      time
      day
      description
      location
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onUpdateSchedule(filter: $filter) {
      id
      name
      time
      day
      description
      location
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule($filter: ModelSubscriptionScheduleFilterInput) {
    onDeleteSchedule(filter: $filter) {
      id
      name
      time
      day
      description
      location
      sortOrder
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
