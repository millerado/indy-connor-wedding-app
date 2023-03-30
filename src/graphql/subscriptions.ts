/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const onCreateStandings = /* GraphQL */ `
  subscription OnCreateStandings(
    $filter: ModelSubscriptionStandingsFilterInput
  ) {
    onCreateStandings(filter: $filter) {
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
export const onUpdateStandings = /* GraphQL */ `
  subscription OnUpdateStandings(
    $filter: ModelSubscriptionStandingsFilterInput
  ) {
    onUpdateStandings(filter: $filter) {
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
export const onDeleteStandings = /* GraphQL */ `
  subscription OnDeleteStandings(
    $filter: ModelSubscriptionStandingsFilterInput
  ) {
    onDeleteStandings(filter: $filter) {
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
      colorCode
      Users {
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
export const onUpdateTeams = /* GraphQL */ `
  subscription OnUpdateTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onUpdateTeams(filter: $filter) {
      id
      name
      colorCode
      Users {
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
export const onDeleteTeams = /* GraphQL */ `
  subscription OnDeleteTeams($filter: ModelSubscriptionTeamsFilterInput) {
    onDeleteTeams(filter: $filter) {
      id
      name
      colorCode
      Users {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
      id
      name
      image
      about
      admin
      teamsID
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
      admin
      teamsID
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
      admin
      teamsID
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
