// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Games, StandingsPeople, AdminFavorites, StandingsTeams, Posts, Comments, Reactions, Users, Teams, ExpoTokens, FAQ, Schedule } = initSchema(schema);

export {
  Games,
  StandingsPeople,
  AdminFavorites,
  StandingsTeams,
  Posts,
  Comments,
  Reactions,
  Users,
  Teams,
  ExpoTokens,
  FAQ,
  Schedule
};