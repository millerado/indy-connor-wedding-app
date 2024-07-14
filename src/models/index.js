// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { ScheduledNotifications, Notifications, Games, StandingsPeople, AdminFavorites, StandingsTeams, Posts, Teams, Users, ExpoTokens, Reactions, Comments, FAQ, Schedule } = initSchema(schema);

export {
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