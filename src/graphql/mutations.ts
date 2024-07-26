/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEvents = /* GraphQL */ `mutation CreateEvents(
  $input: CreateEventsInput!
  $condition: ModelEventsConditionInput
) {
  createEvents(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.CreateEventsMutationVariables,
  APITypes.CreateEventsMutation
>;
export const updateEvents = /* GraphQL */ `mutation UpdateEvents(
  $input: UpdateEventsInput!
  $condition: ModelEventsConditionInput
) {
  updateEvents(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.UpdateEventsMutationVariables,
  APITypes.UpdateEventsMutation
>;
export const deleteEvents = /* GraphQL */ `mutation DeleteEvents(
  $input: DeleteEventsInput!
  $condition: ModelEventsConditionInput
) {
  deleteEvents(input: $input, condition: $condition) {
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
}
` as GeneratedMutation<
  APITypes.DeleteEventsMutationVariables,
  APITypes.DeleteEventsMutation
>;
export const createScheduledNotifications = /* GraphQL */ `mutation CreateScheduledNotifications(
  $input: CreateScheduledNotificationsInput!
  $condition: ModelScheduledNotificationsConditionInput
) {
  createScheduledNotifications(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateScheduledNotificationsMutationVariables,
  APITypes.CreateScheduledNotificationsMutation
>;
export const updateScheduledNotifications = /* GraphQL */ `mutation UpdateScheduledNotifications(
  $input: UpdateScheduledNotificationsInput!
  $condition: ModelScheduledNotificationsConditionInput
) {
  updateScheduledNotifications(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateScheduledNotificationsMutationVariables,
  APITypes.UpdateScheduledNotificationsMutation
>;
export const deleteScheduledNotifications = /* GraphQL */ `mutation DeleteScheduledNotifications(
  $input: DeleteScheduledNotificationsInput!
  $condition: ModelScheduledNotificationsConditionInput
) {
  deleteScheduledNotifications(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteScheduledNotificationsMutationVariables,
  APITypes.DeleteScheduledNotificationsMutation
>;
export const createNotifications = /* GraphQL */ `mutation CreateNotifications(
  $input: CreateNotificationsInput!
  $condition: ModelNotificationsConditionInput
) {
  createNotifications(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateNotificationsMutationVariables,
  APITypes.CreateNotificationsMutation
>;
export const updateNotifications = /* GraphQL */ `mutation UpdateNotifications(
  $input: UpdateNotificationsInput!
  $condition: ModelNotificationsConditionInput
) {
  updateNotifications(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateNotificationsMutationVariables,
  APITypes.UpdateNotificationsMutation
>;
export const deleteNotifications = /* GraphQL */ `mutation DeleteNotifications(
  $input: DeleteNotificationsInput!
  $condition: ModelNotificationsConditionInput
) {
  deleteNotifications(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteNotificationsMutationVariables,
  APITypes.DeleteNotificationsMutation
>;
export const createGames = /* GraphQL */ `mutation CreateGames(
  $input: CreateGamesInput!
  $condition: ModelGamesConditionInput
) {
  createGames(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateGamesMutationVariables,
  APITypes.CreateGamesMutation
>;
export const updateGames = /* GraphQL */ `mutation UpdateGames(
  $input: UpdateGamesInput!
  $condition: ModelGamesConditionInput
) {
  updateGames(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateGamesMutationVariables,
  APITypes.UpdateGamesMutation
>;
export const deleteGames = /* GraphQL */ `mutation DeleteGames(
  $input: DeleteGamesInput!
  $condition: ModelGamesConditionInput
) {
  deleteGames(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteGamesMutationVariables,
  APITypes.DeleteGamesMutation
>;
export const createStandingsPeople = /* GraphQL */ `mutation CreateStandingsPeople(
  $input: CreateStandingsPeopleInput!
  $condition: ModelStandingsPeopleConditionInput
) {
  createStandingsPeople(input: $input, condition: $condition) {
    id
    userId
    rank
    points
    gamesPlayed
    lastCalculationTime
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    standingsPeopleEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStandingsPeopleMutationVariables,
  APITypes.CreateStandingsPeopleMutation
>;
export const updateStandingsPeople = /* GraphQL */ `mutation UpdateStandingsPeople(
  $input: UpdateStandingsPeopleInput!
  $condition: ModelStandingsPeopleConditionInput
) {
  updateStandingsPeople(input: $input, condition: $condition) {
    id
    userId
    rank
    points
    gamesPlayed
    lastCalculationTime
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    standingsPeopleEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStandingsPeopleMutationVariables,
  APITypes.UpdateStandingsPeopleMutation
>;
export const deleteStandingsPeople = /* GraphQL */ `mutation DeleteStandingsPeople(
  $input: DeleteStandingsPeopleInput!
  $condition: ModelStandingsPeopleConditionInput
) {
  deleteStandingsPeople(input: $input, condition: $condition) {
    id
    userId
    rank
    points
    gamesPlayed
    lastCalculationTime
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    standingsPeopleEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStandingsPeopleMutationVariables,
  APITypes.DeleteStandingsPeopleMutation
>;
export const createAdminFavorites = /* GraphQL */ `mutation CreateAdminFavorites(
  $input: CreateAdminFavoritesInput!
  $condition: ModelAdminFavoritesConditionInput
) {
  createAdminFavorites(input: $input, condition: $condition) {
    id
    image
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    adminFavoritesEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAdminFavoritesMutationVariables,
  APITypes.CreateAdminFavoritesMutation
>;
export const updateAdminFavorites = /* GraphQL */ `mutation UpdateAdminFavorites(
  $input: UpdateAdminFavoritesInput!
  $condition: ModelAdminFavoritesConditionInput
) {
  updateAdminFavorites(input: $input, condition: $condition) {
    id
    image
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    adminFavoritesEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAdminFavoritesMutationVariables,
  APITypes.UpdateAdminFavoritesMutation
>;
export const deleteAdminFavorites = /* GraphQL */ `mutation DeleteAdminFavorites(
  $input: DeleteAdminFavoritesInput!
  $condition: ModelAdminFavoritesConditionInput
) {
  deleteAdminFavorites(input: $input, condition: $condition) {
    id
    image
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    adminFavoritesEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAdminFavoritesMutationVariables,
  APITypes.DeleteAdminFavoritesMutation
>;
export const createStandingsTeams = /* GraphQL */ `mutation CreateStandingsTeams(
  $input: CreateStandingsTeamsInput!
  $condition: ModelStandingsTeamsConditionInput
) {
  createStandingsTeams(input: $input, condition: $condition) {
    id
    teamId
    rank
    points
    lastCalculationTime
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    standingsTeamsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStandingsTeamsMutationVariables,
  APITypes.CreateStandingsTeamsMutation
>;
export const updateStandingsTeams = /* GraphQL */ `mutation UpdateStandingsTeams(
  $input: UpdateStandingsTeamsInput!
  $condition: ModelStandingsTeamsConditionInput
) {
  updateStandingsTeams(input: $input, condition: $condition) {
    id
    teamId
    rank
    points
    lastCalculationTime
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    standingsTeamsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStandingsTeamsMutationVariables,
  APITypes.UpdateStandingsTeamsMutation
>;
export const deleteStandingsTeams = /* GraphQL */ `mutation DeleteStandingsTeams(
  $input: DeleteStandingsTeamsInput!
  $condition: ModelStandingsTeamsConditionInput
) {
  deleteStandingsTeams(input: $input, condition: $condition) {
    id
    teamId
    rank
    points
    lastCalculationTime
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    standingsTeamsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStandingsTeamsMutationVariables,
  APITypes.DeleteStandingsTeamsMutation
>;
export const createPosts = /* GraphQL */ `mutation CreatePosts(
  $input: CreatePostsInput!
  $condition: ModelPostsConditionInput
) {
  createPosts(input: $input, condition: $condition) {
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
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    postsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePostsMutationVariables,
  APITypes.CreatePostsMutation
>;
export const updatePosts = /* GraphQL */ `mutation UpdatePosts(
  $input: UpdatePostsInput!
  $condition: ModelPostsConditionInput
) {
  updatePosts(input: $input, condition: $condition) {
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
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    postsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePostsMutationVariables,
  APITypes.UpdatePostsMutation
>;
export const deletePosts = /* GraphQL */ `mutation DeletePosts(
  $input: DeletePostsInput!
  $condition: ModelPostsConditionInput
) {
  deletePosts(input: $input, condition: $condition) {
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
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    postsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePostsMutationVariables,
  APITypes.DeletePostsMutation
>;
export const createTeams = /* GraphQL */ `mutation CreateTeams(
  $input: CreateTeamsInput!
  $condition: ModelTeamsConditionInput
) {
  createTeams(input: $input, condition: $condition) {
    id
    name
    Users {
      nextToken
      startedAt
      __typename
    }
    iconName
    description
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    teamsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTeamsMutationVariables,
  APITypes.CreateTeamsMutation
>;
export const updateTeams = /* GraphQL */ `mutation UpdateTeams(
  $input: UpdateTeamsInput!
  $condition: ModelTeamsConditionInput
) {
  updateTeams(input: $input, condition: $condition) {
    id
    name
    Users {
      nextToken
      startedAt
      __typename
    }
    iconName
    description
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    teamsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTeamsMutationVariables,
  APITypes.UpdateTeamsMutation
>;
export const deleteTeams = /* GraphQL */ `mutation DeleteTeams(
  $input: DeleteTeamsInput!
  $condition: ModelTeamsConditionInput
) {
  deleteTeams(input: $input, condition: $condition) {
    id
    name
    Users {
      nextToken
      startedAt
      __typename
    }
    iconName
    description
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    teamsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTeamsMutationVariables,
  APITypes.DeleteTeamsMutation
>;
export const createUsers = /* GraphQL */ `mutation CreateUsers(
  $input: CreateUsersInput!
  $condition: ModelUsersConditionInput
) {
  createUsers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUsersMutationVariables,
  APITypes.CreateUsersMutation
>;
export const updateUsers = /* GraphQL */ `mutation UpdateUsers(
  $input: UpdateUsersInput!
  $condition: ModelUsersConditionInput
) {
  updateUsers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUsersMutationVariables,
  APITypes.UpdateUsersMutation
>;
export const deleteUsers = /* GraphQL */ `mutation DeleteUsers(
  $input: DeleteUsersInput!
  $condition: ModelUsersConditionInput
) {
  deleteUsers(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUsersMutationVariables,
  APITypes.DeleteUsersMutation
>;
export const createExpoTokens = /* GraphQL */ `mutation CreateExpoTokens(
  $input: CreateExpoTokensInput!
  $condition: ModelExpoTokensConditionInput
) {
  createExpoTokens(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateExpoTokensMutationVariables,
  APITypes.CreateExpoTokensMutation
>;
export const updateExpoTokens = /* GraphQL */ `mutation UpdateExpoTokens(
  $input: UpdateExpoTokensInput!
  $condition: ModelExpoTokensConditionInput
) {
  updateExpoTokens(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateExpoTokensMutationVariables,
  APITypes.UpdateExpoTokensMutation
>;
export const deleteExpoTokens = /* GraphQL */ `mutation DeleteExpoTokens(
  $input: DeleteExpoTokensInput!
  $condition: ModelExpoTokensConditionInput
) {
  deleteExpoTokens(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteExpoTokensMutationVariables,
  APITypes.DeleteExpoTokensMutation
>;
export const createReactions = /* GraphQL */ `mutation CreateReactions(
  $input: CreateReactionsInput!
  $condition: ModelReactionsConditionInput
) {
  createReactions(input: $input, condition: $condition) {
    id
    userId
    reactionType
    postsID
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    reactionsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReactionsMutationVariables,
  APITypes.CreateReactionsMutation
>;
export const updateReactions = /* GraphQL */ `mutation UpdateReactions(
  $input: UpdateReactionsInput!
  $condition: ModelReactionsConditionInput
) {
  updateReactions(input: $input, condition: $condition) {
    id
    userId
    reactionType
    postsID
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    reactionsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReactionsMutationVariables,
  APITypes.UpdateReactionsMutation
>;
export const deleteReactions = /* GraphQL */ `mutation DeleteReactions(
  $input: DeleteReactionsInput!
  $condition: ModelReactionsConditionInput
) {
  deleteReactions(input: $input, condition: $condition) {
    id
    userId
    reactionType
    postsID
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    reactionsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReactionsMutationVariables,
  APITypes.DeleteReactionsMutation
>;
export const createComments = /* GraphQL */ `mutation CreateComments(
  $input: CreateCommentsInput!
  $condition: ModelCommentsConditionInput
) {
  createComments(input: $input, condition: $condition) {
    id
    userId
    comment
    postsID
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    commentsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommentsMutationVariables,
  APITypes.CreateCommentsMutation
>;
export const updateComments = /* GraphQL */ `mutation UpdateComments(
  $input: UpdateCommentsInput!
  $condition: ModelCommentsConditionInput
) {
  updateComments(input: $input, condition: $condition) {
    id
    userId
    comment
    postsID
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    commentsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommentsMutationVariables,
  APITypes.UpdateCommentsMutation
>;
export const deleteComments = /* GraphQL */ `mutation DeleteComments(
  $input: DeleteCommentsInput!
  $condition: ModelCommentsConditionInput
) {
  deleteComments(input: $input, condition: $condition) {
    id
    userId
    comment
    postsID
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    commentsEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommentsMutationVariables,
  APITypes.DeleteCommentsMutation
>;
export const createFAQ = /* GraphQL */ `mutation CreateFAQ(
  $input: CreateFAQInput!
  $condition: ModelFAQConditionInput
) {
  createFAQ(input: $input, condition: $condition) {
    id
    question
    answer
    sortOrder
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    fAQEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateFAQMutationVariables,
  APITypes.CreateFAQMutation
>;
export const updateFAQ = /* GraphQL */ `mutation UpdateFAQ(
  $input: UpdateFAQInput!
  $condition: ModelFAQConditionInput
) {
  updateFAQ(input: $input, condition: $condition) {
    id
    question
    answer
    sortOrder
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    fAQEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateFAQMutationVariables,
  APITypes.UpdateFAQMutation
>;
export const deleteFAQ = /* GraphQL */ `mutation DeleteFAQ(
  $input: DeleteFAQInput!
  $condition: ModelFAQConditionInput
) {
  deleteFAQ(input: $input, condition: $condition) {
    id
    question
    answer
    sortOrder
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    fAQEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteFAQMutationVariables,
  APITypes.DeleteFAQMutation
>;
export const createSchedule = /* GraphQL */ `mutation CreateSchedule(
  $input: CreateScheduleInput!
  $condition: ModelScheduleConditionInput
) {
  createSchedule(input: $input, condition: $condition) {
    id
    name
    time
    day
    description
    location
    sortOrder
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    scheduleEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateScheduleMutationVariables,
  APITypes.CreateScheduleMutation
>;
export const updateSchedule = /* GraphQL */ `mutation UpdateSchedule(
  $input: UpdateScheduleInput!
  $condition: ModelScheduleConditionInput
) {
  updateSchedule(input: $input, condition: $condition) {
    id
    name
    time
    day
    description
    location
    sortOrder
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    scheduleEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateScheduleMutationVariables,
  APITypes.UpdateScheduleMutation
>;
export const deleteSchedule = /* GraphQL */ `mutation DeleteSchedule(
  $input: DeleteScheduleInput!
  $condition: ModelScheduleConditionInput
) {
  deleteSchedule(input: $input, condition: $condition) {
    id
    name
    time
    day
    description
    location
    sortOrder
    Events {
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    scheduleEventsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteScheduleMutationVariables,
  APITypes.DeleteScheduleMutation
>;
