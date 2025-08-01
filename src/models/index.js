// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Events, ScheduledNotifications, Notifications, Games, StandingsPeople, AdminFavorites, StandingsTeams, Posts, Teams, Users, ExpoTokens, Reactions, Comments, FAQ, Schedule } = initSchema(schema);

export {
  Events,
  ScheduledNotifications,
  Notifications,
  Games,
  StandingsPeople,
  AdminFavorites,
  StandingsTeams,
  Posts,
  Teams,
  Users,
  ExpoTokens,
  Reactions,
  Comments,
  FAQ,
  Schedule
};