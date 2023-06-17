/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createScheduledNotifications = /* GraphQL */ `
  mutation CreateScheduledNotifications(
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
    }
  }
`;
export const updateScheduledNotifications = /* GraphQL */ `
  mutation UpdateScheduledNotifications(
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
    }
  }
`;
export const deleteScheduledNotifications = /* GraphQL */ `
  mutation DeleteScheduledNotifications(
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
    }
  }
`;
export const createNotifications = /* GraphQL */ `
  mutation CreateNotifications(
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
    }
  }
`;
export const updateNotifications = /* GraphQL */ `
  mutation UpdateNotifications(
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
    }
  }
`;
export const deleteNotifications = /* GraphQL */ `
  mutation DeleteNotifications(
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
    }
  }
`;
export const createGames = /* GraphQL */ `
  mutation CreateGames(
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
    }
  }
`;
export const updateGames = /* GraphQL */ `
  mutation UpdateGames(
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
    }
  }
`;
export const deleteGames = /* GraphQL */ `
  mutation DeleteGames(
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
    }
  }
`;
export const createStandingsPeople = /* GraphQL */ `
  mutation CreateStandingsPeople(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateStandingsPeople = /* GraphQL */ `
  mutation UpdateStandingsPeople(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteStandingsPeople = /* GraphQL */ `
  mutation DeleteStandingsPeople(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createAdminFavorites = /* GraphQL */ `
  mutation CreateAdminFavorites(
    $input: CreateAdminFavoritesInput!
    $condition: ModelAdminFavoritesConditionInput
  ) {
    createAdminFavorites(input: $input, condition: $condition) {
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
export const updateAdminFavorites = /* GraphQL */ `
  mutation UpdateAdminFavorites(
    $input: UpdateAdminFavoritesInput!
    $condition: ModelAdminFavoritesConditionInput
  ) {
    updateAdminFavorites(input: $input, condition: $condition) {
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
export const deleteAdminFavorites = /* GraphQL */ `
  mutation DeleteAdminFavorites(
    $input: DeleteAdminFavoritesInput!
    $condition: ModelAdminFavoritesConditionInput
  ) {
    deleteAdminFavorites(input: $input, condition: $condition) {
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
export const createStandingsTeams = /* GraphQL */ `
  mutation CreateStandingsTeams(
    $input: CreateStandingsTeamsInput!
    $condition: ModelStandingsTeamsConditionInput
  ) {
    createStandingsTeams(input: $input, condition: $condition) {
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
    }
  }
`;
export const updateStandingsTeams = /* GraphQL */ `
  mutation UpdateStandingsTeams(
    $input: UpdateStandingsTeamsInput!
    $condition: ModelStandingsTeamsConditionInput
  ) {
    updateStandingsTeams(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteStandingsTeams = /* GraphQL */ `
  mutation DeleteStandingsTeams(
    $input: DeleteStandingsTeamsInput!
    $condition: ModelStandingsTeamsConditionInput
  ) {
    deleteStandingsTeams(input: $input, condition: $condition) {
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
    }
  }
`;
export const createPosts = /* GraphQL */ `
  mutation CreatePosts(
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
      }
      Reactions {
        nextToken
        startedAt
      }
      usersInPost
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePosts = /* GraphQL */ `
  mutation UpdatePosts(
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
      }
      Reactions {
        nextToken
        startedAt
      }
      usersInPost
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePosts = /* GraphQL */ `
  mutation DeletePosts(
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
      }
      Reactions {
        nextToken
        startedAt
      }
      usersInPost
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTeams = /* GraphQL */ `
  mutation CreateTeams(
    $input: CreateTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    createTeams(input: $input, condition: $condition) {
      id
      name
      Users {
        nextToken
        startedAt
      }
      iconName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTeams = /* GraphQL */ `
  mutation UpdateTeams(
    $input: UpdateTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    updateTeams(input: $input, condition: $condition) {
      id
      name
      Users {
        nextToken
        startedAt
      }
      iconName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTeams = /* GraphQL */ `
  mutation DeleteTeams(
    $input: DeleteTeamsInput!
    $condition: ModelTeamsConditionInput
  ) {
    deleteTeams(input: $input, condition: $condition) {
      id
      name
      Users {
        nextToken
        startedAt
      }
      iconName
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createExpoTokens = /* GraphQL */ `
  mutation CreateExpoTokens(
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
    }
  }
`;
export const updateExpoTokens = /* GraphQL */ `
  mutation UpdateExpoTokens(
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
    }
  }
`;
export const deleteExpoTokens = /* GraphQL */ `
  mutation DeleteExpoTokens(
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
    }
  }
`;
export const createReactions = /* GraphQL */ `
  mutation CreateReactions(
    $input: CreateReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    createReactions(input: $input, condition: $condition) {
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
export const updateReactions = /* GraphQL */ `
  mutation UpdateReactions(
    $input: UpdateReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    updateReactions(input: $input, condition: $condition) {
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
export const deleteReactions = /* GraphQL */ `
  mutation DeleteReactions(
    $input: DeleteReactionsInput!
    $condition: ModelReactionsConditionInput
  ) {
    deleteReactions(input: $input, condition: $condition) {
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
export const createComments = /* GraphQL */ `
  mutation CreateComments(
    $input: CreateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    createComments(input: $input, condition: $condition) {
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
export const updateComments = /* GraphQL */ `
  mutation UpdateComments(
    $input: UpdateCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    updateComments(input: $input, condition: $condition) {
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
export const deleteComments = /* GraphQL */ `
  mutation DeleteComments(
    $input: DeleteCommentsInput!
    $condition: ModelCommentsConditionInput
  ) {
    deleteComments(input: $input, condition: $condition) {
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
export const createFAQ = /* GraphQL */ `
  mutation CreateFAQ(
    $input: CreateFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    createFAQ(input: $input, condition: $condition) {
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
export const updateFAQ = /* GraphQL */ `
  mutation UpdateFAQ(
    $input: UpdateFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    updateFAQ(input: $input, condition: $condition) {
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
export const deleteFAQ = /* GraphQL */ `
  mutation DeleteFAQ(
    $input: DeleteFAQInput!
    $condition: ModelFAQConditionInput
  ) {
    deleteFAQ(input: $input, condition: $condition) {
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
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
