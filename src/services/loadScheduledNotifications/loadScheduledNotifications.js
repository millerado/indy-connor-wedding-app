import { API } from "aws-amplify";
import { listScheduledNotifications } from '../../graphql/queries';
import { ScheduledNotifications } from '../../models';
import { DataStore, sendUserScheduledPushNotification } from "../../utils";

const loadScheduledNotifications = async (userId) => {
  if(userId) {
    try {
      const graphVariables = { filter: { userId: {eq: userId} }, limit: 999999999 };
      const allScheduledNotifications = await API.graphql({ query: listScheduledNotifications, variables: graphVariables });

      const unfilteredItems = allScheduledNotifications?.data?.listScheduledNotifications?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        // Changing this to only 1 item
        // Deleting one item should trigger the subscription to run and grab another
        const item = items[0];
        const date = new Date(item.displayTime);
        if(date.getTime() > Date.now()) {
          sendUserScheduledPushNotification(
            userId,
            item.subject,
            item.messageBody,
            JSON.parse(item.linking),
            new Date(item.displayTime),
            JSON.parse(item.scheduleTrigger),
          );
        }
        DataStore.delete(ScheduledNotifications, item.id);
      }
    } catch (err) {
      console.log('-- Error Loading Scheduled Notifications, No DataStore for these --', err);
    }
  }
}

export default loadScheduledNotifications;