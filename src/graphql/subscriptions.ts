/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      Reactions {
        nextToken
        startedAt
      }
      usersInPost {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      Reactions {
        nextToken
        startedAt
      }
      usersInPost {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      Reactions {
        nextToken
        startedAt
      }
      usersInPost {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      iconName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      iconName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      }
      iconName
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      postsID
      admin
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      postsID
      admin
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      postsID
      admin
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
    }
  }
`;
