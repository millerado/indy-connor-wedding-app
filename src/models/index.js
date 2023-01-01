// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Standings, Posts, Comments, Reactions, Teams, Users, ExpoTokens, FAQ, Schedule } = initSchema(schema);

export {
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