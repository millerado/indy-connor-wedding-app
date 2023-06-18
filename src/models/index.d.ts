import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerScheduledNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ScheduledNotifications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly subject: string;
  readonly linking?: string | null;
  readonly messageBody: string;
  readonly scheduleTrigger: string;
  readonly displayTime: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyScheduledNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ScheduledNotifications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly subject: string;
  readonly linking?: string | null;
  readonly messageBody: string;
  readonly scheduleTrigger: string;
  readonly displayTime: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ScheduledNotifications = LazyLoading extends LazyLoadingDisabled ? EagerScheduledNotifications : LazyScheduledNotifications

export declare const ScheduledNotifications: (new (init: ModelInit<ScheduledNotifications>) => ScheduledNotifications) & {
  copyOf(source: ScheduledNotifications, mutator: (draft: MutableModel<ScheduledNotifications>) => MutableModel<ScheduledNotifications> | void): ScheduledNotifications;
}

type EagerNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notifications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly read: boolean;
  readonly messageBody: string;
  readonly linking?: string | null;
  readonly subject: string;
  readonly displayTime: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotifications = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notifications, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly read: boolean;
  readonly messageBody: string;
  readonly linking?: string | null;
  readonly subject: string;
  readonly displayTime: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notifications = LazyLoading extends LazyLoadingDisabled ? EagerNotifications : LazyNotifications

export declare const Notifications: (new (init: ModelInit<Notifications>) => Notifications) & {
  copyOf(source: Notifications, mutator: (draft: MutableModel<Notifications>) => MutableModel<Notifications> | void): Notifications;
}

type EagerGames = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Games, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly iconName: string;
  readonly minNumberOfTeams: number;
  readonly maxNumberOfTeams?: number | null;
  readonly minNumberOfPlayersPerTeam: number;
  readonly maxNumberOfPlayersPerTeam?: number | null;
  readonly points?: number[] | null;
  readonly rules?: string | null;
  readonly canHaveMultipleWinners: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGames = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Games, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly iconName: string;
  readonly minNumberOfTeams: number;
  readonly maxNumberOfTeams?: number | null;
  readonly minNumberOfPlayersPerTeam: number;
  readonly maxNumberOfPlayersPerTeam?: number | null;
  readonly points?: number[] | null;
  readonly rules?: string | null;
  readonly canHaveMultipleWinners: boolean;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Games = LazyLoading extends LazyLoadingDisabled ? EagerGames : LazyGames

export declare const Games: (new (init: ModelInit<Games>) => Games) & {
  copyOf(source: Games, mutator: (draft: MutableModel<Games>) => MutableModel<Games> | void): Games;
}

type EagerStandingsPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StandingsPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly rank?: number | null;
  readonly points?: number | null;
  readonly gamesPlayed?: number | null;
  readonly lastCalculationTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStandingsPeople = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StandingsPeople, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly rank?: number | null;
  readonly points?: number | null;
  readonly gamesPlayed?: number | null;
  readonly lastCalculationTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StandingsPeople = LazyLoading extends LazyLoadingDisabled ? EagerStandingsPeople : LazyStandingsPeople

export declare const StandingsPeople: (new (init: ModelInit<StandingsPeople>) => StandingsPeople) & {
  copyOf(source: StandingsPeople, mutator: (draft: MutableModel<StandingsPeople>) => MutableModel<StandingsPeople> | void): StandingsPeople;
}

type EagerAdminFavorites = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AdminFavorites, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdminFavorites = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AdminFavorites, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly image: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AdminFavorites = LazyLoading extends LazyLoadingDisabled ? EagerAdminFavorites : LazyAdminFavorites

export declare const AdminFavorites: (new (init: ModelInit<AdminFavorites>) => AdminFavorites) & {
  copyOf(source: AdminFavorites, mutator: (draft: MutableModel<AdminFavorites>) => MutableModel<AdminFavorites> | void): AdminFavorites;
}

type EagerStandingsTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StandingsTeams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamId?: string | null;
  readonly rank?: number | null;
  readonly points?: number | null;
  readonly lastCalculationTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStandingsTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StandingsTeams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamId?: string | null;
  readonly rank?: number | null;
  readonly points?: number | null;
  readonly lastCalculationTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StandingsTeams = LazyLoading extends LazyLoadingDisabled ? EagerStandingsTeams : LazyStandingsTeams

export declare const StandingsTeams: (new (init: ModelInit<StandingsTeams>) => StandingsTeams) & {
  copyOf(source: StandingsTeams, mutator: (draft: MutableModel<StandingsTeams>) => MutableModel<StandingsTeams> | void): StandingsTeams;
}

type EagerPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Posts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly messageBody?: string | null;
  readonly images?: (string | null)[] | null;
  readonly olympicEvent: boolean;
  readonly eventDetails?: string | null;
  readonly Comments?: (Comments | null)[] | null;
  readonly Reactions?: (Reactions | null)[] | null;
  readonly usersInPost?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Posts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly messageBody?: string | null;
  readonly images?: (string | null)[] | null;
  readonly olympicEvent: boolean;
  readonly eventDetails?: string | null;
  readonly Comments: AsyncCollection<Comments>;
  readonly Reactions: AsyncCollection<Reactions>;
  readonly usersInPost?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Posts = LazyLoading extends LazyLoadingDisabled ? EagerPosts : LazyPosts

export declare const Posts: (new (init: ModelInit<Posts>) => Posts) & {
  copyOf(source: Posts, mutator: (draft: MutableModel<Posts>) => MutableModel<Posts> | void): Posts;
}

type EagerComments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly comment: string;
  readonly postsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyComments = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Comments, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly comment: string;
  readonly postsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Comments = LazyLoading extends LazyLoadingDisabled ? EagerComments : LazyComments

export declare const Comments: (new (init: ModelInit<Comments>) => Comments) & {
  copyOf(source: Comments, mutator: (draft: MutableModel<Comments>) => MutableModel<Comments> | void): Comments;
}

type EagerReactions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reactions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly reactionType: string;
  readonly postsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReactions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reactions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly reactionType: string;
  readonly postsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reactions = LazyLoading extends LazyLoadingDisabled ? EagerReactions : LazyReactions

export declare const Reactions: (new (init: ModelInit<Reactions>) => Reactions) & {
  copyOf(source: Reactions, mutator: (draft: MutableModel<Reactions>) => MutableModel<Reactions> | void): Reactions;
}

type EagerTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Users?: (Users | null)[] | null;
  readonly iconName?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTeams = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Teams, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Users: AsyncCollection<Users>;
  readonly iconName?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Teams = LazyLoading extends LazyLoadingDisabled ? EagerTeams : LazyTeams

export declare const Teams: (new (init: ModelInit<Teams>) => Teams) & {
  copyOf(source: Teams, mutator: (draft: MutableModel<Teams>) => MutableModel<Teams> | void): Teams;
}

type EagerUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly about?: string | null;
  readonly whereAreYouStaying?: string | null;
  readonly teamsID: string;
  readonly admin: boolean;
  readonly unreadNotifications?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly about?: string | null;
  readonly whereAreYouStaying?: string | null;
  readonly teamsID: string;
  readonly admin: boolean;
  readonly unreadNotifications?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}

type EagerExpoTokens = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ExpoTokens, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly token: string;
  readonly userId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyExpoTokens = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ExpoTokens, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly token: string;
  readonly userId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ExpoTokens = LazyLoading extends LazyLoadingDisabled ? EagerExpoTokens : LazyExpoTokens

export declare const ExpoTokens: (new (init: ModelInit<ExpoTokens>) => ExpoTokens) & {
  copyOf(source: ExpoTokens, mutator: (draft: MutableModel<ExpoTokens>) => MutableModel<ExpoTokens> | void): ExpoTokens;
}

type EagerFAQ = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FAQ, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly sortOrder: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFAQ = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<FAQ, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly sortOrder: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type FAQ = LazyLoading extends LazyLoadingDisabled ? EagerFAQ : LazyFAQ

export declare const FAQ: (new (init: ModelInit<FAQ>) => FAQ) & {
  copyOf(source: FAQ, mutator: (draft: MutableModel<FAQ>) => MutableModel<FAQ> | void): FAQ;
}

type EagerSchedule = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Schedule, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly time: string;
  readonly day: string;
  readonly description: string;
  readonly location: string;
  readonly sortOrder: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySchedule = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Schedule, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly time: string;
  readonly day: string;
  readonly description: string;
  readonly location: string;
  readonly sortOrder: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Schedule = LazyLoading extends LazyLoadingDisabled ? EagerSchedule : LazySchedule

export declare const Schedule: (new (init: ModelInit<Schedule>) => Schedule) & {
  copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule>) => MutableModel<Schedule> | void): Schedule;
}