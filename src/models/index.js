// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { AdminFavorites, Standings, Posts, Comments, Reactions, Teams, Users, ExpoTokens, FAQ, Schedule } = initSchema(schema);

export {
  AdminFavorites,
  Standings,
  Posts,
  Comments,
  Reactions,
  Teams,
  Users,
  ExpoTokens,
  FAQ,
  Schedule
};