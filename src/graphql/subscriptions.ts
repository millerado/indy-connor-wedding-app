/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateEvents = /* GraphQL */ `subscription OnCreateEvents($filter: ModelSubscriptionEventsFilterInput) {
  onCreateEvents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateEventsSubscriptionVariables,
  APITypes.OnCreateEventsSubscription
>;
export const onUpdateEvents = /* GraphQL */ `subscription OnUpdateEvents($filter: ModelSubscriptionEventsFilterInput) {
  onUpdateEvents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateEventsSubscriptionVariables,
  APITypes.OnUpdateEventsSubscription
>;
export const onDeleteEvents = /* GraphQL */ `subscription OnDeleteEvents($filter: ModelSubscriptionEventsFilterInput) {
  onDeleteEvents(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteEventsSubscriptionVariables,
  APITypes.OnDeleteEventsSubscription
>;
export const onCreateScheduledNotifications = /* GraphQL */ `subscription OnCreateScheduledNotifications(
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
` as GeneratedSubscription<
  APITypes.OnCreateScheduledNotificationsSubscriptionVariables,
  APITypes.OnCreateScheduledNotificationsSubscription
>;
export const onUpdateScheduledNotifications = /* GraphQL */ `subscription OnUpdateScheduledNotifications(
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
` as GeneratedSubscription<
  APITypes.OnUpdateScheduledNotificationsSubscriptionVariables,
  APITypes.OnUpdateScheduledNotificationsSubscription
>;
export const onDeleteScheduledNotifications = /* GraphQL */ `subscription OnDeleteScheduledNotifications(
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
` as GeneratedSubscription<
  APITypes.OnDeleteScheduledNotificationsSubscriptionVariables,
  APITypes.OnDeleteScheduledNotificationsSubscription
>;
export const onCreateNotifications = /* GraphQL */ `subscription OnCreateNotifications(
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
` as GeneratedSubscription<
  APITypes.OnCreateNotificationsSubscriptionVariables,
  APITypes.OnCreateNotificationsSubscription
>;
export const onUpdateNotifications = /* GraphQL */ `subscription OnUpdateNotifications(
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
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationsSubscriptionVariables,
  APITypes.OnUpdateNotificationsSubscription
>;
export const onDeleteNotifications = /* GraphQL */ `subscription OnDeleteNotifications(
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
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationsSubscriptionVariables,
  APITypes.OnDeleteNotificationsSubscription
>;
export const onCreateGames = /* GraphQL */ `subscription OnCreateGames($filter: ModelSubscriptionGamesFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGamesSubscriptionVariables,
  APITypes.OnCreateGamesSubscription
>;
export const onUpdateGames = /* GraphQL */ `subscription OnUpdateGames($filter: ModelSubscriptionGamesFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGamesSubscriptionVariables,
  APITypes.OnUpdateGamesSubscription
>;
export const onDeleteGames = /* GraphQL */ `subscription OnDeleteGames($filter: ModelSubscriptionGamesFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGamesSubscriptionVariables,
  APITypes.OnDeleteGamesSubscription
>;
export const onCreateStandingsPeople = /* GraphQL */ `subscription OnCreateStandingsPeople(
  $filter: ModelSubscriptionStandingsPeopleFilterInput
) {
  onCreateStandingsPeople(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStandingsPeopleSubscriptionVariables,
  APITypes.OnCreateStandingsPeopleSubscription
>;
export const onUpdateStandingsPeople = /* GraphQL */ `subscription OnUpdateStandingsPeople(
  $filter: ModelSubscriptionStandingsPeopleFilterInput
) {
  onUpdateStandingsPeople(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStandingsPeopleSubscriptionVariables,
  APITypes.OnUpdateStandingsPeopleSubscription
>;
export const onDeleteStandingsPeople = /* GraphQL */ `subscription OnDeleteStandingsPeople(
  $filter: ModelSubscriptionStandingsPeopleFilterInput
) {
  onDeleteStandingsPeople(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStandingsPeopleSubscriptionVariables,
  APITypes.OnDeleteStandingsPeopleSubscription
>;
export const onCreateAdminFavorites = /* GraphQL */ `subscription OnCreateAdminFavorites(
  $filter: ModelSubscriptionAdminFavoritesFilterInput
) {
  onCreateAdminFavorites(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAdminFavoritesSubscriptionVariables,
  APITypes.OnCreateAdminFavoritesSubscription
>;
export const onUpdateAdminFavorites = /* GraphQL */ `subscription OnUpdateAdminFavorites(
  $filter: ModelSubscriptionAdminFavoritesFilterInput
) {
  onUpdateAdminFavorites(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAdminFavoritesSubscriptionVariables,
  APITypes.OnUpdateAdminFavoritesSubscription
>;
export const onDeleteAdminFavorites = /* GraphQL */ `subscription OnDeleteAdminFavorites(
  $filter: ModelSubscriptionAdminFavoritesFilterInput
) {
  onDeleteAdminFavorites(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAdminFavoritesSubscriptionVariables,
  APITypes.OnDeleteAdminFavoritesSubscription
>;
export const onCreateStandingsTeams = /* GraphQL */ `subscription OnCreateStandingsTeams(
  $filter: ModelSubscriptionStandingsTeamsFilterInput
) {
  onCreateStandingsTeams(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateStandingsTeamsSubscriptionVariables,
  APITypes.OnCreateStandingsTeamsSubscription
>;
export const onUpdateStandingsTeams = /* GraphQL */ `subscription OnUpdateStandingsTeams(
  $filter: ModelSubscriptionStandingsTeamsFilterInput
) {
  onUpdateStandingsTeams(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateStandingsTeamsSubscriptionVariables,
  APITypes.OnUpdateStandingsTeamsSubscription
>;
export const onDeleteStandingsTeams = /* GraphQL */ `subscription OnDeleteStandingsTeams(
  $filter: ModelSubscriptionStandingsTeamsFilterInput
) {
  onDeleteStandingsTeams(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteStandingsTeamsSubscriptionVariables,
  APITypes.OnDeleteStandingsTeamsSubscription
>;
export const onCreatePosts = /* GraphQL */ `subscription OnCreatePosts($filter: ModelSubscriptionPostsFilterInput) {
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
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePostsSubscriptionVariables,
  APITypes.OnCreatePostsSubscription
>;
export const onUpdatePosts = /* GraphQL */ `subscription OnUpdatePosts($filter: ModelSubscriptionPostsFilterInput) {
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
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePostsSubscriptionVariables,
  APITypes.OnUpdatePostsSubscription
>;
export const onDeletePosts = /* GraphQL */ `subscription OnDeletePosts($filter: ModelSubscriptionPostsFilterInput) {
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
    eventsID
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePostsSubscriptionVariables,
  APITypes.OnDeletePostsSubscription
>;
export const onCreateTeams = /* GraphQL */ `subscription OnCreateTeams($filter: ModelSubscriptionTeamsFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTeamsSubscriptionVariables,
  APITypes.OnCreateTeamsSubscription
>;
export const onUpdateTeams = /* GraphQL */ `subscription OnUpdateTeams($filter: ModelSubscriptionTeamsFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTeamsSubscriptionVariables,
  APITypes.OnUpdateTeamsSubscription
>;
export const onDeleteTeams = /* GraphQL */ `subscription OnDeleteTeams($filter: ModelSubscriptionTeamsFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTeamsSubscriptionVariables,
  APITypes.OnDeleteTeamsSubscription
>;
export const onCreateUsers = /* GraphQL */ `subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUsersSubscriptionVariables,
  APITypes.OnCreateUsersSubscription
>;
export const onUpdateUsers = /* GraphQL */ `subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUsersSubscriptionVariables,
  APITypes.OnUpdateUsersSubscription
>;
export const onDeleteUsers = /* GraphQL */ `subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUsersSubscriptionVariables,
  APITypes.OnDeleteUsersSubscription
>;
export const onCreateExpoTokens = /* GraphQL */ `subscription OnCreateExpoTokens(
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
` as GeneratedSubscription<
  APITypes.OnCreateExpoTokensSubscriptionVariables,
  APITypes.OnCreateExpoTokensSubscription
>;
export const onUpdateExpoTokens = /* GraphQL */ `subscription OnUpdateExpoTokens(
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
` as GeneratedSubscription<
  APITypes.OnUpdateExpoTokensSubscriptionVariables,
  APITypes.OnUpdateExpoTokensSubscription
>;
export const onDeleteExpoTokens = /* GraphQL */ `subscription OnDeleteExpoTokens(
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
` as GeneratedSubscription<
  APITypes.OnDeleteExpoTokensSubscriptionVariables,
  APITypes.OnDeleteExpoTokensSubscription
>;
export const onCreateReactions = /* GraphQL */ `subscription OnCreateReactions($filter: ModelSubscriptionReactionsFilterInput) {
  onCreateReactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateReactionsSubscriptionVariables,
  APITypes.OnCreateReactionsSubscription
>;
export const onUpdateReactions = /* GraphQL */ `subscription OnUpdateReactions($filter: ModelSubscriptionReactionsFilterInput) {
  onUpdateReactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateReactionsSubscriptionVariables,
  APITypes.OnUpdateReactionsSubscription
>;
export const onDeleteReactions = /* GraphQL */ `subscription OnDeleteReactions($filter: ModelSubscriptionReactionsFilterInput) {
  onDeleteReactions(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteReactionsSubscriptionVariables,
  APITypes.OnDeleteReactionsSubscription
>;
export const onCreateComments = /* GraphQL */ `subscription OnCreateComments($filter: ModelSubscriptionCommentsFilterInput) {
  onCreateComments(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCommentsSubscriptionVariables,
  APITypes.OnCreateCommentsSubscription
>;
export const onUpdateComments = /* GraphQL */ `subscription OnUpdateComments($filter: ModelSubscriptionCommentsFilterInput) {
  onUpdateComments(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCommentsSubscriptionVariables,
  APITypes.OnUpdateCommentsSubscription
>;
export const onDeleteComments = /* GraphQL */ `subscription OnDeleteComments($filter: ModelSubscriptionCommentsFilterInput) {
  onDeleteComments(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCommentsSubscriptionVariables,
  APITypes.OnDeleteCommentsSubscription
>;
export const onCreateFAQ = /* GraphQL */ `subscription OnCreateFAQ($filter: ModelSubscriptionFAQFilterInput) {
  onCreateFAQ(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateFAQSubscriptionVariables,
  APITypes.OnCreateFAQSubscription
>;
export const onUpdateFAQ = /* GraphQL */ `subscription OnUpdateFAQ($filter: ModelSubscriptionFAQFilterInput) {
  onUpdateFAQ(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateFAQSubscriptionVariables,
  APITypes.OnUpdateFAQSubscription
>;
export const onDeleteFAQ = /* GraphQL */ `subscription OnDeleteFAQ($filter: ModelSubscriptionFAQFilterInput) {
  onDeleteFAQ(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteFAQSubscriptionVariables,
  APITypes.OnDeleteFAQSubscription
>;
export const onCreateSchedule = /* GraphQL */ `subscription OnCreateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
  onCreateSchedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateScheduleSubscriptionVariables,
  APITypes.OnCreateScheduleSubscription
>;
export const onUpdateSchedule = /* GraphQL */ `subscription OnUpdateSchedule($filter: ModelSubscriptionScheduleFilterInput) {
  onUpdateSchedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateScheduleSubscriptionVariables,
  APITypes.OnUpdateScheduleSubscription
>;
export const onDeleteSchedule = /* GraphQL */ `subscription OnDeleteSchedule($filter: ModelSubscriptionScheduleFilterInput) {
  onDeleteSchedule(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteScheduleSubscriptionVariables,
  APITypes.OnDeleteScheduleSubscription
>;
