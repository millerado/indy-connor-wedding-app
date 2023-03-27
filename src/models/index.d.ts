import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





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

type EagerStandings = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Standings, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamId?: string | null;
  readonly rank?: string | null;
  readonly points?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStandings = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Standings, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly teamId?: string | null;
  readonly rank?: string | null;
  readonly points?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Standings = LazyLoading extends LazyLoadingDisabled ? EagerStandings : LazyStandings

export declare const Standings: (new (init: ModelInit<Standings>) => Standings) & {
  copyOf(source: Standings, mutator: (draft: MutableModel<Standings>) => MutableModel<Standings> | void): Standings;
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
  readonly colorCode: string;
  readonly Users?: (Users | null)[] | null;
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
  readonly colorCode: string;
  readonly Users: AsyncCollection<Users>;
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
  readonly admin: boolean;
  readonly teamsID: string;
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
  readonly admin: boolean;
  readonly teamsID: string;
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