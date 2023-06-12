/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateScheduledNotificationsInput = {
  id?: string | null,
  userId: string,
  subject: string,
  linking?: string | null,
  messageBody: string,
  scheduleTrigger: string,
  displayTime: string,
  _version?: number | null,
};

export type ModelScheduledNotificationsConditionInput = {
  userId?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  linking?: ModelStringInput | null,
  messageBody?: ModelStringInput | null,
  scheduleTrigger?: ModelStringInput | null,
  displayTime?: ModelStringInput | null,
  and?: Array< ModelScheduledNotificationsConditionInput | null > | null,
  or?: Array< ModelScheduledNotificationsConditionInput | null > | null,
  not?: ModelScheduledNotificationsConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ScheduledNotifications = {
  __typename: "ScheduledNotifications",
  id: string,
  userId: string,
  subject: string,
  linking?: string | null,
  messageBody: string,
  scheduleTrigger: string,
  displayTime: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateScheduledNotificationsInput = {
  id: string,
  userId?: string | null,
  subject?: string | null,
  linking?: string | null,
  messageBody?: string | null,
  scheduleTrigger?: string | null,
  displayTime?: string | null,
  _version?: number | null,
};

export type DeleteScheduledNotificationsInput = {
  id: string,
  _version?: number | null,
};

export type CreateNotificationsInput = {
  id?: string | null,
  userId: string,
  read: boolean,
  messageBody: string,
  linking?: string | null,
  subject: string,
  displayTime: string,
  _version?: number | null,
};

export type ModelNotificationsConditionInput = {
  userId?: ModelStringInput | null,
  read?: ModelBooleanInput | null,
  messageBody?: ModelStringInput | null,
  linking?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  displayTime?: ModelStringInput | null,
  and?: Array< ModelNotificationsConditionInput | null > | null,
  or?: Array< ModelNotificationsConditionInput | null > | null,
  not?: ModelNotificationsConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Notifications = {
  __typename: "Notifications",
  id: string,
  userId: string,
  read: boolean,
  messageBody: string,
  linking?: string | null,
  subject: string,
  displayTime: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateNotificationsInput = {
  id: string,
  userId?: string | null,
  read?: boolean | null,
  messageBody?: string | null,
  linking?: string | null,
  subject?: string | null,
  displayTime?: string | null,
  _version?: number | null,
};

export type DeleteNotificationsInput = {
  id: string,
  _version?: number | null,
};

export type CreateGamesInput = {
  id?: string | null,
  name: string,
  iconName: string,
  minNumberOfTeams: number,
  maxNumberOfTeams?: number | null,
  minNumberOfPlayersPerTeam: number,
  maxNumberOfPlayersPerTeam?: number | null,
  points?: Array< number > | null,
  rules?: string | null,
  canHaveMultipleWinners: boolean,
  _version?: number | null,
};

export type ModelGamesConditionInput = {
  name?: ModelStringInput | null,
  iconName?: ModelStringInput | null,
  minNumberOfTeams?: ModelIntInput | null,
  maxNumberOfTeams?: ModelIntInput | null,
  minNumberOfPlayersPerTeam?: ModelIntInput | null,
  maxNumberOfPlayersPerTeam?: ModelIntInput | null,
  points?: ModelIntInput | null,
  rules?: ModelStringInput | null,
  canHaveMultipleWinners?: ModelBooleanInput | null,
  and?: Array< ModelGamesConditionInput | null > | null,
  or?: Array< ModelGamesConditionInput | null > | null,
  not?: ModelGamesConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Games = {
  __typename: "Games",
  id: string,
  name: string,
  iconName: string,
  minNumberOfTeams: number,
  maxNumberOfTeams?: number | null,
  minNumberOfPlayersPerTeam: number,
  maxNumberOfPlayersPerTeam?: number | null,
  points?: Array< number > | null,
  rules?: string | null,
  canHaveMultipleWinners: boolean,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateGamesInput = {
  id: string,
  name?: string | null,
  iconName?: string | null,
  minNumberOfTeams?: number | null,
  maxNumberOfTeams?: number | null,
  minNumberOfPlayersPerTeam?: number | null,
  maxNumberOfPlayersPerTeam?: number | null,
  points?: Array< number > | null,
  rules?: string | null,
  canHaveMultipleWinners?: boolean | null,
  _version?: number | null,
};

export type DeleteGamesInput = {
  id: string,
  _version?: number | null,
};

export type CreateStandingsPeopleInput = {
  id?: string | null,
  userId?: string | null,
  rank?: number | null,
  points?: number | null,
  _version?: number | null,
};

export type ModelStandingsPeopleConditionInput = {
  userId?: ModelStringInput | null,
  rank?: ModelIntInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelStandingsPeopleConditionInput | null > | null,
  or?: Array< ModelStandingsPeopleConditionInput | null > | null,
  not?: ModelStandingsPeopleConditionInput | null,
};

export type StandingsPeople = {
  __typename: "StandingsPeople",
  id: string,
  userId?: string | null,
  rank?: number | null,
  points?: number | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateStandingsPeopleInput = {
  id: string,
  userId?: string | null,
  rank?: number | null,
  points?: number | null,
  _version?: number | null,
};

export type DeleteStandingsPeopleInput = {
  id: string,
  _version?: number | null,
};

export type CreateAdminFavoritesInput = {
  id?: string | null,
  image: string,
  _version?: number | null,
};

export type ModelAdminFavoritesConditionInput = {
  image?: ModelStringInput | null,
  and?: Array< ModelAdminFavoritesConditionInput | null > | null,
  or?: Array< ModelAdminFavoritesConditionInput | null > | null,
  not?: ModelAdminFavoritesConditionInput | null,
};

export type AdminFavorites = {
  __typename: "AdminFavorites",
  id: string,
  image: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateAdminFavoritesInput = {
  id: string,
  image?: string | null,
  _version?: number | null,
};

export type DeleteAdminFavoritesInput = {
  id: string,
  _version?: number | null,
};

export type CreateStandingsTeamsInput = {
  id?: string | null,
  teamId?: string | null,
  rank?: number | null,
  points?: number | null,
  _version?: number | null,
};

export type ModelStandingsTeamsConditionInput = {
  teamId?: ModelStringInput | null,
  rank?: ModelIntInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelStandingsTeamsConditionInput | null > | null,
  or?: Array< ModelStandingsTeamsConditionInput | null > | null,
  not?: ModelStandingsTeamsConditionInput | null,
};

export type StandingsTeams = {
  __typename: "StandingsTeams",
  id: string,
  teamId?: string | null,
  rank?: number | null,
  points?: number | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateStandingsTeamsInput = {
  id: string,
  teamId?: string | null,
  rank?: number | null,
  points?: number | null,
  _version?: number | null,
};

export type DeleteStandingsTeamsInput = {
  id: string,
  _version?: number | null,
};

export type CreatePostsInput = {
  id?: string | null,
  userId: string,
  messageBody?: string | null,
  images?: Array< string | null > | null,
  olympicEvent: boolean,
  eventDetails?: string | null,
  usersInPost?: Array< string | null > | null,
  _version?: number | null,
};

export type ModelPostsConditionInput = {
  userId?: ModelStringInput | null,
  messageBody?: ModelStringInput | null,
  images?: ModelStringInput | null,
  olympicEvent?: ModelBooleanInput | null,
  eventDetails?: ModelStringInput | null,
  usersInPost?: ModelStringInput | null,
  and?: Array< ModelPostsConditionInput | null > | null,
  or?: Array< ModelPostsConditionInput | null > | null,
  not?: ModelPostsConditionInput | null,
};

export type Posts = {
  __typename: "Posts",
  id: string,
  userId: string,
  messageBody?: string | null,
  images?: Array< string | null > | null,
  olympicEvent: boolean,
  eventDetails?: string | null,
  Comments?: ModelCommentsConnection | null,
  Reactions?: ModelReactionsConnection | null,
  usersInPost?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelCommentsConnection = {
  __typename: "ModelCommentsConnection",
  items:  Array<Comments | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Comments = {
  __typename: "Comments",
  id: string,
  userId: string,
  comment: string,
  postsID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelReactionsConnection = {
  __typename: "ModelReactionsConnection",
  items:  Array<Reactions | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Reactions = {
  __typename: "Reactions",
  id: string,
  userId: string,
  reactionType: string,
  postsID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdatePostsInput = {
  id: string,
  userId?: string | null,
  messageBody?: string | null,
  images?: Array< string | null > | null,
  olympicEvent?: boolean | null,
  eventDetails?: string | null,
  usersInPost?: Array< string | null > | null,
  _version?: number | null,
};

export type DeletePostsInput = {
  id: string,
  _version?: number | null,
};

export type CreateTeamsInput = {
  id?: string | null,
  name: string,
  iconName?: string | null,
  description?: string | null,
  _version?: number | null,
};

export type ModelTeamsConditionInput = {
  name?: ModelStringInput | null,
  iconName?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTeamsConditionInput | null > | null,
  or?: Array< ModelTeamsConditionInput | null > | null,
  not?: ModelTeamsConditionInput | null,
};

export type Teams = {
  __typename: "Teams",
  id: string,
  name: string,
  Users?: ModelUsersConnection | null,
  iconName?: string | null,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelUsersConnection = {
  __typename: "ModelUsersConnection",
  items:  Array<Users | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Users = {
  __typename: "Users",
  id: string,
  name: string,
  image?: string | null,
  about?: string | null,
  whereAreYouStaying?: string | null,
  teamsID: string,
  admin: boolean,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateTeamsInput = {
  id: string,
  name?: string | null,
  iconName?: string | null,
  description?: string | null,
  _version?: number | null,
};

export type DeleteTeamsInput = {
  id: string,
  _version?: number | null,
};

export type CreateUsersInput = {
  id?: string | null,
  name: string,
  image?: string | null,
  about?: string | null,
  whereAreYouStaying?: string | null,
  teamsID: string,
  admin: boolean,
  _version?: number | null,
};

export type ModelUsersConditionInput = {
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  about?: ModelStringInput | null,
  whereAreYouStaying?: ModelStringInput | null,
  teamsID?: ModelIDInput | null,
  admin?: ModelBooleanInput | null,
  and?: Array< ModelUsersConditionInput | null > | null,
  or?: Array< ModelUsersConditionInput | null > | null,
  not?: ModelUsersConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateUsersInput = {
  id: string,
  name?: string | null,
  image?: string | null,
  about?: string | null,
  whereAreYouStaying?: string | null,
  teamsID?: string | null,
  admin?: boolean | null,
  _version?: number | null,
};

export type DeleteUsersInput = {
  id: string,
  _version?: number | null,
};

export type CreateExpoTokensInput = {
  id?: string | null,
  token: string,
  userId?: string | null,
  _version?: number | null,
};

export type ModelExpoTokensConditionInput = {
  token?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  and?: Array< ModelExpoTokensConditionInput | null > | null,
  or?: Array< ModelExpoTokensConditionInput | null > | null,
  not?: ModelExpoTokensConditionInput | null,
};

export type ExpoTokens = {
  __typename: "ExpoTokens",
  id: string,
  token: string,
  userId?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateExpoTokensInput = {
  id: string,
  token?: string | null,
  userId?: string | null,
  _version?: number | null,
};

export type DeleteExpoTokensInput = {
  id: string,
  _version?: number | null,
};

export type CreateReactionsInput = {
  id?: string | null,
  userId: string,
  reactionType: string,
  postsID: string,
  _version?: number | null,
};

export type ModelReactionsConditionInput = {
  userId?: ModelStringInput | null,
  reactionType?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelReactionsConditionInput | null > | null,
  or?: Array< ModelReactionsConditionInput | null > | null,
  not?: ModelReactionsConditionInput | null,
};

export type UpdateReactionsInput = {
  id: string,
  userId?: string | null,
  reactionType?: string | null,
  postsID?: string | null,
  _version?: number | null,
};

export type DeleteReactionsInput = {
  id: string,
  _version?: number | null,
};

export type CreateCommentsInput = {
  id?: string | null,
  userId: string,
  comment: string,
  postsID: string,
  _version?: number | null,
};

export type ModelCommentsConditionInput = {
  userId?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelCommentsConditionInput | null > | null,
  or?: Array< ModelCommentsConditionInput | null > | null,
  not?: ModelCommentsConditionInput | null,
};

export type UpdateCommentsInput = {
  id: string,
  userId?: string | null,
  comment?: string | null,
  postsID?: string | null,
  _version?: number | null,
};

export type DeleteCommentsInput = {
  id: string,
  _version?: number | null,
};

export type CreateFAQInput = {
  id?: string | null,
  question: string,
  answer: string,
  sortOrder: number,
  _version?: number | null,
};

export type ModelFAQConditionInput = {
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  and?: Array< ModelFAQConditionInput | null > | null,
  or?: Array< ModelFAQConditionInput | null > | null,
  not?: ModelFAQConditionInput | null,
};

export type FAQ = {
  __typename: "FAQ",
  id: string,
  question: string,
  answer: string,
  sortOrder: number,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateFAQInput = {
  id: string,
  question?: string | null,
  answer?: string | null,
  sortOrder?: number | null,
  _version?: number | null,
};

export type DeleteFAQInput = {
  id: string,
  _version?: number | null,
};

export type CreateScheduleInput = {
  id?: string | null,
  name: string,
  time: string,
  day: string,
  description: string,
  location: string,
  sortOrder: number,
  _version?: number | null,
};

export type ModelScheduleConditionInput = {
  name?: ModelStringInput | null,
  time?: ModelStringInput | null,
  day?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  and?: Array< ModelScheduleConditionInput | null > | null,
  or?: Array< ModelScheduleConditionInput | null > | null,
  not?: ModelScheduleConditionInput | null,
};

export type Schedule = {
  __typename: "Schedule",
  id: string,
  name: string,
  time: string,
  day: string,
  description: string,
  location: string,
  sortOrder: number,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateScheduleInput = {
  id: string,
  name?: string | null,
  time?: string | null,
  day?: string | null,
  description?: string | null,
  location?: string | null,
  sortOrder?: number | null,
  _version?: number | null,
};

export type DeleteScheduleInput = {
  id: string,
  _version?: number | null,
};

export type ModelScheduledNotificationsFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  linking?: ModelStringInput | null,
  messageBody?: ModelStringInput | null,
  scheduleTrigger?: ModelStringInput | null,
  displayTime?: ModelStringInput | null,
  and?: Array< ModelScheduledNotificationsFilterInput | null > | null,
  or?: Array< ModelScheduledNotificationsFilterInput | null > | null,
  not?: ModelScheduledNotificationsFilterInput | null,
};

export type ModelScheduledNotificationsConnection = {
  __typename: "ModelScheduledNotificationsConnection",
  items:  Array<ScheduledNotifications | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelNotificationsFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  read?: ModelBooleanInput | null,
  messageBody?: ModelStringInput | null,
  linking?: ModelStringInput | null,
  subject?: ModelStringInput | null,
  displayTime?: ModelStringInput | null,
  and?: Array< ModelNotificationsFilterInput | null > | null,
  or?: Array< ModelNotificationsFilterInput | null > | null,
  not?: ModelNotificationsFilterInput | null,
};

export type ModelNotificationsConnection = {
  __typename: "ModelNotificationsConnection",
  items:  Array<Notifications | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelGamesFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  iconName?: ModelStringInput | null,
  minNumberOfTeams?: ModelIntInput | null,
  maxNumberOfTeams?: ModelIntInput | null,
  minNumberOfPlayersPerTeam?: ModelIntInput | null,
  maxNumberOfPlayersPerTeam?: ModelIntInput | null,
  points?: ModelIntInput | null,
  rules?: ModelStringInput | null,
  canHaveMultipleWinners?: ModelBooleanInput | null,
  and?: Array< ModelGamesFilterInput | null > | null,
  or?: Array< ModelGamesFilterInput | null > | null,
  not?: ModelGamesFilterInput | null,
};

export type ModelGamesConnection = {
  __typename: "ModelGamesConnection",
  items:  Array<Games | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStandingsPeopleFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  rank?: ModelIntInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelStandingsPeopleFilterInput | null > | null,
  or?: Array< ModelStandingsPeopleFilterInput | null > | null,
  not?: ModelStandingsPeopleFilterInput | null,
};

export type ModelStandingsPeopleConnection = {
  __typename: "ModelStandingsPeopleConnection",
  items:  Array<StandingsPeople | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelAdminFavoritesFilterInput = {
  id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelAdminFavoritesFilterInput | null > | null,
  or?: Array< ModelAdminFavoritesFilterInput | null > | null,
  not?: ModelAdminFavoritesFilterInput | null,
};

export type ModelAdminFavoritesConnection = {
  __typename: "ModelAdminFavoritesConnection",
  items:  Array<AdminFavorites | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStandingsTeamsFilterInput = {
  id?: ModelIDInput | null,
  teamId?: ModelStringInput | null,
  rank?: ModelIntInput | null,
  points?: ModelIntInput | null,
  and?: Array< ModelStandingsTeamsFilterInput | null > | null,
  or?: Array< ModelStandingsTeamsFilterInput | null > | null,
  not?: ModelStandingsTeamsFilterInput | null,
};

export type ModelStandingsTeamsConnection = {
  __typename: "ModelStandingsTeamsConnection",
  items:  Array<StandingsTeams | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelPostsFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  messageBody?: ModelStringInput | null,
  images?: ModelStringInput | null,
  olympicEvent?: ModelBooleanInput | null,
  eventDetails?: ModelStringInput | null,
  usersInPost?: ModelStringInput | null,
  and?: Array< ModelPostsFilterInput | null > | null,
  or?: Array< ModelPostsFilterInput | null > | null,
  not?: ModelPostsFilterInput | null,
};

export type ModelPostsConnection = {
  __typename: "ModelPostsConnection",
  items:  Array<Posts | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelTeamsFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  iconName?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTeamsFilterInput | null > | null,
  or?: Array< ModelTeamsFilterInput | null > | null,
  not?: ModelTeamsFilterInput | null,
};

export type ModelTeamsConnection = {
  __typename: "ModelTeamsConnection",
  items:  Array<Teams | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelUsersFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  image?: ModelStringInput | null,
  about?: ModelStringInput | null,
  whereAreYouStaying?: ModelStringInput | null,
  teamsID?: ModelIDInput | null,
  admin?: ModelBooleanInput | null,
  and?: Array< ModelUsersFilterInput | null > | null,
  or?: Array< ModelUsersFilterInput | null > | null,
  not?: ModelUsersFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelExpoTokensFilterInput = {
  id?: ModelIDInput | null,
  token?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  and?: Array< ModelExpoTokensFilterInput | null > | null,
  or?: Array< ModelExpoTokensFilterInput | null > | null,
  not?: ModelExpoTokensFilterInput | null,
};

export type ModelExpoTokensConnection = {
  __typename: "ModelExpoTokensConnection",
  items:  Array<ExpoTokens | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelReactionsFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  reactionType?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelReactionsFilterInput | null > | null,
  or?: Array< ModelReactionsFilterInput | null > | null,
  not?: ModelReactionsFilterInput | null,
};

export type ModelCommentsFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  postsID?: ModelIDInput | null,
  and?: Array< ModelCommentsFilterInput | null > | null,
  or?: Array< ModelCommentsFilterInput | null > | null,
  not?: ModelCommentsFilterInput | null,
};

export type ModelFAQFilterInput = {
  id?: ModelIDInput | null,
  question?: ModelStringInput | null,
  answer?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  and?: Array< ModelFAQFilterInput | null > | null,
  or?: Array< ModelFAQFilterInput | null > | null,
  not?: ModelFAQFilterInput | null,
};

export type ModelFAQConnection = {
  __typename: "ModelFAQConnection",
  items:  Array<FAQ | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelScheduleFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  time?: ModelStringInput | null,
  day?: ModelStringInput | null,
  description?: ModelStringInput | null,
  location?: ModelStringInput | null,
  sortOrder?: ModelIntInput | null,
  and?: Array< ModelScheduleFilterInput | null > | null,
  or?: Array< ModelScheduleFilterInput | null > | null,
  not?: ModelScheduleFilterInput | null,
};

export type ModelScheduleConnection = {
  __typename: "ModelScheduleConnection",
  items:  Array<Schedule | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionScheduledNotificationsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  linking?: ModelSubscriptionStringInput | null,
  messageBody?: ModelSubscriptionStringInput | null,
  scheduleTrigger?: ModelSubscriptionStringInput | null,
  displayTime?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionScheduledNotificationsFilterInput | null > | null,
  or?: Array< ModelSubscriptionScheduledNotificationsFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionNotificationsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  read?: ModelSubscriptionBooleanInput | null,
  messageBody?: ModelSubscriptionStringInput | null,
  linking?: ModelSubscriptionStringInput | null,
  subject?: ModelSubscriptionStringInput | null,
  displayTime?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationsFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationsFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionGamesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  iconName?: ModelSubscriptionStringInput | null,
  minNumberOfTeams?: ModelSubscriptionIntInput | null,
  maxNumberOfTeams?: ModelSubscriptionIntInput | null,
  minNumberOfPlayersPerTeam?: ModelSubscriptionIntInput | null,
  maxNumberOfPlayersPerTeam?: ModelSubscriptionIntInput | null,
  points?: ModelSubscriptionIntInput | null,
  rules?: ModelSubscriptionStringInput | null,
  canHaveMultipleWinners?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionGamesFilterInput | null > | null,
  or?: Array< ModelSubscriptionGamesFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionStandingsPeopleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  rank?: ModelSubscriptionIntInput | null,
  points?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionStandingsPeopleFilterInput | null > | null,
  or?: Array< ModelSubscriptionStandingsPeopleFilterInput | null > | null,
};

export type ModelSubscriptionAdminFavoritesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdminFavoritesFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdminFavoritesFilterInput | null > | null,
};

export type ModelSubscriptionStandingsTeamsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  teamId?: ModelSubscriptionStringInput | null,
  rank?: ModelSubscriptionIntInput | null,
  points?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionStandingsTeamsFilterInput | null > | null,
  or?: Array< ModelSubscriptionStandingsTeamsFilterInput | null > | null,
};

export type ModelSubscriptionPostsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  messageBody?: ModelSubscriptionStringInput | null,
  images?: ModelSubscriptionStringInput | null,
  olympicEvent?: ModelSubscriptionBooleanInput | null,
  eventDetails?: ModelSubscriptionStringInput | null,
  usersInPost?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPostsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostsFilterInput | null > | null,
};

export type ModelSubscriptionTeamsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  iconName?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTeamsFilterInput | null > | null,
  or?: Array< ModelSubscriptionTeamsFilterInput | null > | null,
};

export type ModelSubscriptionUsersFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  about?: ModelSubscriptionStringInput | null,
  whereAreYouStaying?: ModelSubscriptionStringInput | null,
  teamsID?: ModelSubscriptionIDInput | null,
  admin?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUsersFilterInput | null > | null,
  or?: Array< ModelSubscriptionUsersFilterInput | null > | null,
};

export type ModelSubscriptionExpoTokensFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  token?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExpoTokensFilterInput | null > | null,
  or?: Array< ModelSubscriptionExpoTokensFilterInput | null > | null,
};

export type ModelSubscriptionReactionsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  reactionType?: ModelSubscriptionStringInput | null,
  postsID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionReactionsFilterInput | null > | null,
  or?: Array< ModelSubscriptionReactionsFilterInput | null > | null,
};

export type ModelSubscriptionCommentsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionStringInput | null,
  comment?: ModelSubscriptionStringInput | null,
  postsID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionCommentsFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentsFilterInput | null > | null,
};

export type ModelSubscriptionFAQFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  question?: ModelSubscriptionStringInput | null,
  answer?: ModelSubscriptionStringInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionFAQFilterInput | null > | null,
  or?: Array< ModelSubscriptionFAQFilterInput | null > | null,
};

export type ModelSubscriptionScheduleFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  time?: ModelSubscriptionStringInput | null,
  day?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionScheduleFilterInput | null > | null,
  or?: Array< ModelSubscriptionScheduleFilterInput | null > | null,
};

export type CreateScheduledNotificationsMutationVariables = {
  input: CreateScheduledNotificationsInput,
  condition?: ModelScheduledNotificationsConditionInput | null,
};

export type CreateScheduledNotificationsMutation = {
  createScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateScheduledNotificationsMutationVariables = {
  input: UpdateScheduledNotificationsInput,
  condition?: ModelScheduledNotificationsConditionInput | null,
};

export type UpdateScheduledNotificationsMutation = {
  updateScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteScheduledNotificationsMutationVariables = {
  input: DeleteScheduledNotificationsInput,
  condition?: ModelScheduledNotificationsConditionInput | null,
};

export type DeleteScheduledNotificationsMutation = {
  deleteScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateNotificationsMutationVariables = {
  input: CreateNotificationsInput,
  condition?: ModelNotificationsConditionInput | null,
};

export type CreateNotificationsMutation = {
  createNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateNotificationsMutationVariables = {
  input: UpdateNotificationsInput,
  condition?: ModelNotificationsConditionInput | null,
};

export type UpdateNotificationsMutation = {
  updateNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteNotificationsMutationVariables = {
  input: DeleteNotificationsInput,
  condition?: ModelNotificationsConditionInput | null,
};

export type DeleteNotificationsMutation = {
  deleteNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateGamesMutationVariables = {
  input: CreateGamesInput,
  condition?: ModelGamesConditionInput | null,
};

export type CreateGamesMutation = {
  createGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateGamesMutationVariables = {
  input: UpdateGamesInput,
  condition?: ModelGamesConditionInput | null,
};

export type UpdateGamesMutation = {
  updateGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteGamesMutationVariables = {
  input: DeleteGamesInput,
  condition?: ModelGamesConditionInput | null,
};

export type DeleteGamesMutation = {
  deleteGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateStandingsPeopleMutationVariables = {
  input: CreateStandingsPeopleInput,
  condition?: ModelStandingsPeopleConditionInput | null,
};

export type CreateStandingsPeopleMutation = {
  createStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateStandingsPeopleMutationVariables = {
  input: UpdateStandingsPeopleInput,
  condition?: ModelStandingsPeopleConditionInput | null,
};

export type UpdateStandingsPeopleMutation = {
  updateStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteStandingsPeopleMutationVariables = {
  input: DeleteStandingsPeopleInput,
  condition?: ModelStandingsPeopleConditionInput | null,
};

export type DeleteStandingsPeopleMutation = {
  deleteStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateAdminFavoritesMutationVariables = {
  input: CreateAdminFavoritesInput,
  condition?: ModelAdminFavoritesConditionInput | null,
};

export type CreateAdminFavoritesMutation = {
  createAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateAdminFavoritesMutationVariables = {
  input: UpdateAdminFavoritesInput,
  condition?: ModelAdminFavoritesConditionInput | null,
};

export type UpdateAdminFavoritesMutation = {
  updateAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteAdminFavoritesMutationVariables = {
  input: DeleteAdminFavoritesInput,
  condition?: ModelAdminFavoritesConditionInput | null,
};

export type DeleteAdminFavoritesMutation = {
  deleteAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateStandingsTeamsMutationVariables = {
  input: CreateStandingsTeamsInput,
  condition?: ModelStandingsTeamsConditionInput | null,
};

export type CreateStandingsTeamsMutation = {
  createStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateStandingsTeamsMutationVariables = {
  input: UpdateStandingsTeamsInput,
  condition?: ModelStandingsTeamsConditionInput | null,
};

export type UpdateStandingsTeamsMutation = {
  updateStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteStandingsTeamsMutationVariables = {
  input: DeleteStandingsTeamsInput,
  condition?: ModelStandingsTeamsConditionInput | null,
};

export type DeleteStandingsTeamsMutation = {
  deleteStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreatePostsMutationVariables = {
  input: CreatePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type CreatePostsMutation = {
  createPosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdatePostsMutationVariables = {
  input: UpdatePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type UpdatePostsMutation = {
  updatePosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeletePostsMutationVariables = {
  input: DeletePostsInput,
  condition?: ModelPostsConditionInput | null,
};

export type DeletePostsMutation = {
  deletePosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateTeamsMutationVariables = {
  input: CreateTeamsInput,
  condition?: ModelTeamsConditionInput | null,
};

export type CreateTeamsMutation = {
  createTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateTeamsMutationVariables = {
  input: UpdateTeamsInput,
  condition?: ModelTeamsConditionInput | null,
};

export type UpdateTeamsMutation = {
  updateTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteTeamsMutationVariables = {
  input: DeleteTeamsInput,
  condition?: ModelTeamsConditionInput | null,
};

export type DeleteTeamsMutation = {
  deleteTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUsersMutationVariables = {
  input: CreateUsersInput,
  condition?: ModelUsersConditionInput | null,
};

export type CreateUsersMutation = {
  createUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUsersMutationVariables = {
  input: UpdateUsersInput,
  condition?: ModelUsersConditionInput | null,
};

export type UpdateUsersMutation = {
  updateUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUsersMutationVariables = {
  input: DeleteUsersInput,
  condition?: ModelUsersConditionInput | null,
};

export type DeleteUsersMutation = {
  deleteUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateExpoTokensMutationVariables = {
  input: CreateExpoTokensInput,
  condition?: ModelExpoTokensConditionInput | null,
};

export type CreateExpoTokensMutation = {
  createExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateExpoTokensMutationVariables = {
  input: UpdateExpoTokensInput,
  condition?: ModelExpoTokensConditionInput | null,
};

export type UpdateExpoTokensMutation = {
  updateExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteExpoTokensMutationVariables = {
  input: DeleteExpoTokensInput,
  condition?: ModelExpoTokensConditionInput | null,
};

export type DeleteExpoTokensMutation = {
  deleteExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateReactionsMutationVariables = {
  input: CreateReactionsInput,
  condition?: ModelReactionsConditionInput | null,
};

export type CreateReactionsMutation = {
  createReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateReactionsMutationVariables = {
  input: UpdateReactionsInput,
  condition?: ModelReactionsConditionInput | null,
};

export type UpdateReactionsMutation = {
  updateReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteReactionsMutationVariables = {
  input: DeleteReactionsInput,
  condition?: ModelReactionsConditionInput | null,
};

export type DeleteReactionsMutation = {
  deleteReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateCommentsMutationVariables = {
  input: CreateCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type CreateCommentsMutation = {
  createComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateCommentsMutationVariables = {
  input: UpdateCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type UpdateCommentsMutation = {
  updateComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteCommentsMutationVariables = {
  input: DeleteCommentsInput,
  condition?: ModelCommentsConditionInput | null,
};

export type DeleteCommentsMutation = {
  deleteComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateFAQMutationVariables = {
  input: CreateFAQInput,
  condition?: ModelFAQConditionInput | null,
};

export type CreateFAQMutation = {
  createFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateFAQMutationVariables = {
  input: UpdateFAQInput,
  condition?: ModelFAQConditionInput | null,
};

export type UpdateFAQMutation = {
  updateFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteFAQMutationVariables = {
  input: DeleteFAQInput,
  condition?: ModelFAQConditionInput | null,
};

export type DeleteFAQMutation = {
  deleteFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateScheduleMutationVariables = {
  input: CreateScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type CreateScheduleMutation = {
  createSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateScheduleMutationVariables = {
  input: UpdateScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type UpdateScheduleMutation = {
  updateSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteScheduleMutationVariables = {
  input: DeleteScheduleInput,
  condition?: ModelScheduleConditionInput | null,
};

export type DeleteScheduleMutation = {
  deleteSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetScheduledNotificationsQueryVariables = {
  id: string,
};

export type GetScheduledNotificationsQuery = {
  getScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListScheduledNotificationsQueryVariables = {
  filter?: ModelScheduledNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScheduledNotificationsQuery = {
  listScheduledNotifications?:  {
    __typename: "ModelScheduledNotificationsConnection",
    items:  Array< {
      __typename: "ScheduledNotifications",
      id: string,
      userId: string,
      subject: string,
      linking?: string | null,
      messageBody: string,
      scheduleTrigger: string,
      displayTime: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncScheduledNotificationsQueryVariables = {
  filter?: ModelScheduledNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncScheduledNotificationsQuery = {
  syncScheduledNotifications?:  {
    __typename: "ModelScheduledNotificationsConnection",
    items:  Array< {
      __typename: "ScheduledNotifications",
      id: string,
      userId: string,
      subject: string,
      linking?: string | null,
      messageBody: string,
      scheduleTrigger: string,
      displayTime: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetNotificationsQueryVariables = {
  id: string,
};

export type GetNotificationsQuery = {
  getNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationsConnection",
    items:  Array< {
      __typename: "Notifications",
      id: string,
      userId: string,
      read: boolean,
      messageBody: string,
      linking?: string | null,
      subject: string,
      displayTime: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncNotificationsQueryVariables = {
  filter?: ModelNotificationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncNotificationsQuery = {
  syncNotifications?:  {
    __typename: "ModelNotificationsConnection",
    items:  Array< {
      __typename: "Notifications",
      id: string,
      userId: string,
      read: boolean,
      messageBody: string,
      linking?: string | null,
      subject: string,
      displayTime: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetGamesQueryVariables = {
  id: string,
};

export type GetGamesQuery = {
  getGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListGamesQueryVariables = {
  filter?: ModelGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGamesQuery = {
  listGames?:  {
    __typename: "ModelGamesConnection",
    items:  Array< {
      __typename: "Games",
      id: string,
      name: string,
      iconName: string,
      minNumberOfTeams: number,
      maxNumberOfTeams?: number | null,
      minNumberOfPlayersPerTeam: number,
      maxNumberOfPlayersPerTeam?: number | null,
      points?: Array< number > | null,
      rules?: string | null,
      canHaveMultipleWinners: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncGamesQueryVariables = {
  filter?: ModelGamesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncGamesQuery = {
  syncGames?:  {
    __typename: "ModelGamesConnection",
    items:  Array< {
      __typename: "Games",
      id: string,
      name: string,
      iconName: string,
      minNumberOfTeams: number,
      maxNumberOfTeams?: number | null,
      minNumberOfPlayersPerTeam: number,
      maxNumberOfPlayersPerTeam?: number | null,
      points?: Array< number > | null,
      rules?: string | null,
      canHaveMultipleWinners: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetStandingsPeopleQueryVariables = {
  id: string,
};

export type GetStandingsPeopleQuery = {
  getStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListStandingsPeopleQueryVariables = {
  filter?: ModelStandingsPeopleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStandingsPeopleQuery = {
  listStandingsPeople?:  {
    __typename: "ModelStandingsPeopleConnection",
    items:  Array< {
      __typename: "StandingsPeople",
      id: string,
      userId?: string | null,
      rank?: number | null,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncStandingsPeopleQueryVariables = {
  filter?: ModelStandingsPeopleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncStandingsPeopleQuery = {
  syncStandingsPeople?:  {
    __typename: "ModelStandingsPeopleConnection",
    items:  Array< {
      __typename: "StandingsPeople",
      id: string,
      userId?: string | null,
      rank?: number | null,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetAdminFavoritesQueryVariables = {
  id: string,
};

export type GetAdminFavoritesQuery = {
  getAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListAdminFavoritesQueryVariables = {
  filter?: ModelAdminFavoritesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdminFavoritesQuery = {
  listAdminFavorites?:  {
    __typename: "ModelAdminFavoritesConnection",
    items:  Array< {
      __typename: "AdminFavorites",
      id: string,
      image: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAdminFavoritesQueryVariables = {
  filter?: ModelAdminFavoritesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAdminFavoritesQuery = {
  syncAdminFavorites?:  {
    __typename: "ModelAdminFavoritesConnection",
    items:  Array< {
      __typename: "AdminFavorites",
      id: string,
      image: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetStandingsTeamsQueryVariables = {
  id: string,
};

export type GetStandingsTeamsQuery = {
  getStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListStandingsTeamsQueryVariables = {
  filter?: ModelStandingsTeamsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStandingsTeamsQuery = {
  listStandingsTeams?:  {
    __typename: "ModelStandingsTeamsConnection",
    items:  Array< {
      __typename: "StandingsTeams",
      id: string,
      teamId?: string | null,
      rank?: number | null,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncStandingsTeamsQueryVariables = {
  filter?: ModelStandingsTeamsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncStandingsTeamsQuery = {
  syncStandingsTeams?:  {
    __typename: "ModelStandingsTeamsConnection",
    items:  Array< {
      __typename: "StandingsTeams",
      id: string,
      teamId?: string | null,
      rank?: number | null,
      points?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetPostsQueryVariables = {
  id: string,
};

export type GetPostsQuery = {
  getPosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      userId: string,
      messageBody?: string | null,
      images?: Array< string | null > | null,
      olympicEvent: boolean,
      eventDetails?: string | null,
      usersInPost?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncPostsQueryVariables = {
  filter?: ModelPostsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncPostsQuery = {
  syncPosts?:  {
    __typename: "ModelPostsConnection",
    items:  Array< {
      __typename: "Posts",
      id: string,
      userId: string,
      messageBody?: string | null,
      images?: Array< string | null > | null,
      olympicEvent: boolean,
      eventDetails?: string | null,
      usersInPost?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetTeamsQueryVariables = {
  id: string,
};

export type GetTeamsQuery = {
  getTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListTeamsQueryVariables = {
  filter?: ModelTeamsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTeamsQuery = {
  listTeams?:  {
    __typename: "ModelTeamsConnection",
    items:  Array< {
      __typename: "Teams",
      id: string,
      name: string,
      iconName?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncTeamsQueryVariables = {
  filter?: ModelTeamsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncTeamsQuery = {
  syncTeams?:  {
    __typename: "ModelTeamsConnection",
    items:  Array< {
      __typename: "Teams",
      id: string,
      name: string,
      iconName?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUsersQueryVariables = {
  id: string,
};

export type GetUsersQuery = {
  getUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      name: string,
      image?: string | null,
      about?: string | null,
      whereAreYouStaying?: string | null,
      teamsID: string,
      admin: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      name: string,
      image?: string | null,
      about?: string | null,
      whereAreYouStaying?: string | null,
      teamsID: string,
      admin: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UsersByTeamsIDQueryVariables = {
  teamsID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUsersFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByTeamsIDQuery = {
  usersByTeamsID?:  {
    __typename: "ModelUsersConnection",
    items:  Array< {
      __typename: "Users",
      id: string,
      name: string,
      image?: string | null,
      about?: string | null,
      whereAreYouStaying?: string | null,
      teamsID: string,
      admin: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetExpoTokensQueryVariables = {
  id: string,
};

export type GetExpoTokensQuery = {
  getExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListExpoTokensQueryVariables = {
  filter?: ModelExpoTokensFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExpoTokensQuery = {
  listExpoTokens?:  {
    __typename: "ModelExpoTokensConnection",
    items:  Array< {
      __typename: "ExpoTokens",
      id: string,
      token: string,
      userId?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncExpoTokensQueryVariables = {
  filter?: ModelExpoTokensFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncExpoTokensQuery = {
  syncExpoTokens?:  {
    __typename: "ModelExpoTokensConnection",
    items:  Array< {
      __typename: "ExpoTokens",
      id: string,
      token: string,
      userId?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetReactionsQueryVariables = {
  id: string,
};

export type GetReactionsQuery = {
  getReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListReactionsQueryVariables = {
  filter?: ModelReactionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReactionsQuery = {
  listReactions?:  {
    __typename: "ModelReactionsConnection",
    items:  Array< {
      __typename: "Reactions",
      id: string,
      userId: string,
      reactionType: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncReactionsQueryVariables = {
  filter?: ModelReactionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncReactionsQuery = {
  syncReactions?:  {
    __typename: "ModelReactionsConnection",
    items:  Array< {
      __typename: "Reactions",
      id: string,
      userId: string,
      reactionType: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ReactionsByPostsIDQueryVariables = {
  postsID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReactionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReactionsByPostsIDQuery = {
  reactionsByPostsID?:  {
    __typename: "ModelReactionsConnection",
    items:  Array< {
      __typename: "Reactions",
      id: string,
      userId: string,
      reactionType: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetCommentsQueryVariables = {
  id: string,
};

export type GetCommentsQuery = {
  getComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      userId: string,
      comment: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncCommentsQueryVariables = {
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncCommentsQuery = {
  syncComments?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      userId: string,
      comment: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type CommentsByPostsIDQueryVariables = {
  postsID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCommentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CommentsByPostsIDQuery = {
  commentsByPostsID?:  {
    __typename: "ModelCommentsConnection",
    items:  Array< {
      __typename: "Comments",
      id: string,
      userId: string,
      comment: string,
      postsID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetFAQQueryVariables = {
  id: string,
};

export type GetFAQQuery = {
  getFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListFAQSQueryVariables = {
  filter?: ModelFAQFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFAQSQuery = {
  listFAQS?:  {
    __typename: "ModelFAQConnection",
    items:  Array< {
      __typename: "FAQ",
      id: string,
      question: string,
      answer: string,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncFAQSQueryVariables = {
  filter?: ModelFAQFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncFAQSQuery = {
  syncFAQS?:  {
    __typename: "ModelFAQConnection",
    items:  Array< {
      __typename: "FAQ",
      id: string,
      question: string,
      answer: string,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetScheduleQueryVariables = {
  id: string,
};

export type GetScheduleQuery = {
  getSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListSchedulesQueryVariables = {
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSchedulesQuery = {
  listSchedules?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      name: string,
      time: string,
      day: string,
      description: string,
      location: string,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncSchedulesQueryVariables = {
  filter?: ModelScheduleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncSchedulesQuery = {
  syncSchedules?:  {
    __typename: "ModelScheduleConnection",
    items:  Array< {
      __typename: "Schedule",
      id: string,
      name: string,
      time: string,
      day: string,
      description: string,
      location: string,
      sortOrder: number,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateScheduledNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionScheduledNotificationsFilterInput | null,
};

export type OnCreateScheduledNotificationsSubscription = {
  onCreateScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateScheduledNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionScheduledNotificationsFilterInput | null,
};

export type OnUpdateScheduledNotificationsSubscription = {
  onUpdateScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteScheduledNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionScheduledNotificationsFilterInput | null,
};

export type OnDeleteScheduledNotificationsSubscription = {
  onDeleteScheduledNotifications?:  {
    __typename: "ScheduledNotifications",
    id: string,
    userId: string,
    subject: string,
    linking?: string | null,
    messageBody: string,
    scheduleTrigger: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationsFilterInput | null,
};

export type OnCreateNotificationsSubscription = {
  onCreateNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationsFilterInput | null,
};

export type OnUpdateNotificationsSubscription = {
  onUpdateNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteNotificationsSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationsFilterInput | null,
};

export type OnDeleteNotificationsSubscription = {
  onDeleteNotifications?:  {
    __typename: "Notifications",
    id: string,
    userId: string,
    read: boolean,
    messageBody: string,
    linking?: string | null,
    subject: string,
    displayTime: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateGamesSubscriptionVariables = {
  filter?: ModelSubscriptionGamesFilterInput | null,
};

export type OnCreateGamesSubscription = {
  onCreateGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateGamesSubscriptionVariables = {
  filter?: ModelSubscriptionGamesFilterInput | null,
};

export type OnUpdateGamesSubscription = {
  onUpdateGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteGamesSubscriptionVariables = {
  filter?: ModelSubscriptionGamesFilterInput | null,
};

export type OnDeleteGamesSubscription = {
  onDeleteGames?:  {
    __typename: "Games",
    id: string,
    name: string,
    iconName: string,
    minNumberOfTeams: number,
    maxNumberOfTeams?: number | null,
    minNumberOfPlayersPerTeam: number,
    maxNumberOfPlayersPerTeam?: number | null,
    points?: Array< number > | null,
    rules?: string | null,
    canHaveMultipleWinners: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateStandingsPeopleSubscriptionVariables = {
  filter?: ModelSubscriptionStandingsPeopleFilterInput | null,
};

export type OnCreateStandingsPeopleSubscription = {
  onCreateStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateStandingsPeopleSubscriptionVariables = {
  filter?: ModelSubscriptionStandingsPeopleFilterInput | null,
};

export type OnUpdateStandingsPeopleSubscription = {
  onUpdateStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteStandingsPeopleSubscriptionVariables = {
  filter?: ModelSubscriptionStandingsPeopleFilterInput | null,
};

export type OnDeleteStandingsPeopleSubscription = {
  onDeleteStandingsPeople?:  {
    __typename: "StandingsPeople",
    id: string,
    userId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateAdminFavoritesSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFavoritesFilterInput | null,
};

export type OnCreateAdminFavoritesSubscription = {
  onCreateAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateAdminFavoritesSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFavoritesFilterInput | null,
};

export type OnUpdateAdminFavoritesSubscription = {
  onUpdateAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteAdminFavoritesSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFavoritesFilterInput | null,
};

export type OnDeleteAdminFavoritesSubscription = {
  onDeleteAdminFavorites?:  {
    __typename: "AdminFavorites",
    id: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateStandingsTeamsSubscriptionVariables = {
  filter?: ModelSubscriptionStandingsTeamsFilterInput | null,
};

export type OnCreateStandingsTeamsSubscription = {
  onCreateStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateStandingsTeamsSubscriptionVariables = {
  filter?: ModelSubscriptionStandingsTeamsFilterInput | null,
};

export type OnUpdateStandingsTeamsSubscription = {
  onUpdateStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteStandingsTeamsSubscriptionVariables = {
  filter?: ModelSubscriptionStandingsTeamsFilterInput | null,
};

export type OnDeleteStandingsTeamsSubscription = {
  onDeleteStandingsTeams?:  {
    __typename: "StandingsTeams",
    id: string,
    teamId?: string | null,
    rank?: number | null,
    points?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreatePostsSubscriptionVariables = {
  filter?: ModelSubscriptionPostsFilterInput | null,
};

export type OnCreatePostsSubscription = {
  onCreatePosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdatePostsSubscriptionVariables = {
  filter?: ModelSubscriptionPostsFilterInput | null,
};

export type OnUpdatePostsSubscription = {
  onUpdatePosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeletePostsSubscriptionVariables = {
  filter?: ModelSubscriptionPostsFilterInput | null,
};

export type OnDeletePostsSubscription = {
  onDeletePosts?:  {
    __typename: "Posts",
    id: string,
    userId: string,
    messageBody?: string | null,
    images?: Array< string | null > | null,
    olympicEvent: boolean,
    eventDetails?: string | null,
    Comments?:  {
      __typename: "ModelCommentsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    Reactions?:  {
      __typename: "ModelReactionsConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    usersInPost?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateTeamsSubscriptionVariables = {
  filter?: ModelSubscriptionTeamsFilterInput | null,
};

export type OnCreateTeamsSubscription = {
  onCreateTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateTeamsSubscriptionVariables = {
  filter?: ModelSubscriptionTeamsFilterInput | null,
};

export type OnUpdateTeamsSubscription = {
  onUpdateTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteTeamsSubscriptionVariables = {
  filter?: ModelSubscriptionTeamsFilterInput | null,
};

export type OnDeleteTeamsSubscription = {
  onDeleteTeams?:  {
    __typename: "Teams",
    id: string,
    name: string,
    Users?:  {
      __typename: "ModelUsersConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    iconName?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUsersSubscriptionVariables = {
  filter?: ModelSubscriptionUsersFilterInput | null,
};

export type OnCreateUsersSubscription = {
  onCreateUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUsersSubscriptionVariables = {
  filter?: ModelSubscriptionUsersFilterInput | null,
};

export type OnUpdateUsersSubscription = {
  onUpdateUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUsersSubscriptionVariables = {
  filter?: ModelSubscriptionUsersFilterInput | null,
};

export type OnDeleteUsersSubscription = {
  onDeleteUsers?:  {
    __typename: "Users",
    id: string,
    name: string,
    image?: string | null,
    about?: string | null,
    whereAreYouStaying?: string | null,
    teamsID: string,
    admin: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateExpoTokensSubscriptionVariables = {
  filter?: ModelSubscriptionExpoTokensFilterInput | null,
};

export type OnCreateExpoTokensSubscription = {
  onCreateExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateExpoTokensSubscriptionVariables = {
  filter?: ModelSubscriptionExpoTokensFilterInput | null,
};

export type OnUpdateExpoTokensSubscription = {
  onUpdateExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteExpoTokensSubscriptionVariables = {
  filter?: ModelSubscriptionExpoTokensFilterInput | null,
};

export type OnDeleteExpoTokensSubscription = {
  onDeleteExpoTokens?:  {
    __typename: "ExpoTokens",
    id: string,
    token: string,
    userId?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateReactionsSubscriptionVariables = {
  filter?: ModelSubscriptionReactionsFilterInput | null,
};

export type OnCreateReactionsSubscription = {
  onCreateReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateReactionsSubscriptionVariables = {
  filter?: ModelSubscriptionReactionsFilterInput | null,
};

export type OnUpdateReactionsSubscription = {
  onUpdateReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteReactionsSubscriptionVariables = {
  filter?: ModelSubscriptionReactionsFilterInput | null,
};

export type OnDeleteReactionsSubscription = {
  onDeleteReactions?:  {
    __typename: "Reactions",
    id: string,
    userId: string,
    reactionType: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateCommentsSubscriptionVariables = {
  filter?: ModelSubscriptionCommentsFilterInput | null,
};

export type OnCreateCommentsSubscription = {
  onCreateComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateCommentsSubscriptionVariables = {
  filter?: ModelSubscriptionCommentsFilterInput | null,
};

export type OnUpdateCommentsSubscription = {
  onUpdateComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteCommentsSubscriptionVariables = {
  filter?: ModelSubscriptionCommentsFilterInput | null,
};

export type OnDeleteCommentsSubscription = {
  onDeleteComments?:  {
    __typename: "Comments",
    id: string,
    userId: string,
    comment: string,
    postsID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateFAQSubscriptionVariables = {
  filter?: ModelSubscriptionFAQFilterInput | null,
};

export type OnCreateFAQSubscription = {
  onCreateFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateFAQSubscriptionVariables = {
  filter?: ModelSubscriptionFAQFilterInput | null,
};

export type OnUpdateFAQSubscription = {
  onUpdateFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteFAQSubscriptionVariables = {
  filter?: ModelSubscriptionFAQFilterInput | null,
};

export type OnDeleteFAQSubscription = {
  onDeleteFAQ?:  {
    __typename: "FAQ",
    id: string,
    question: string,
    answer: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateScheduleSubscriptionVariables = {
  filter?: ModelSubscriptionScheduleFilterInput | null,
};

export type OnCreateScheduleSubscription = {
  onCreateSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateScheduleSubscriptionVariables = {
  filter?: ModelSubscriptionScheduleFilterInput | null,
};

export type OnUpdateScheduleSubscription = {
  onUpdateSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteScheduleSubscriptionVariables = {
  filter?: ModelSubscriptionScheduleFilterInput | null,
};

export type OnDeleteScheduleSubscription = {
  onDeleteSchedule?:  {
    __typename: "Schedule",
    id: string,
    name: string,
    time: string,
    day: string,
    description: string,
    location: string,
    sortOrder: number,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
