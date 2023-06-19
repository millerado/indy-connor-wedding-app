import { DataStore, syncExpression } from 'aws-amplify';
// import awsExports from '../../aws-exports';
import { Notifications, ScheduledNotifications } from '../../models';
// DataStore.configure(awsExports);

export default DataStore;

export const configureDataStore = async (userId, changedUser) => {
  console.log('-- configureDataStore  --', userId, changedUser);
  await DataStore.configure({
    syncExpressions: [
      syncExpression(Notifications, () => {
        return n => n.userId.eq(userId);
      }),
      syncExpression(ScheduledNotifications, () => {
        return n => n.userId.eq(userId);
      }),
    ]
  });
  if(changedUser) {
    await DataStore.clear();
    await DataStore.start();
  }
  return true;
};