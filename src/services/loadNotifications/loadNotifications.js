import { API } from "aws-amplify";
import { listNotifications } from '../../graphql/queries';
import { setBadgeCount } from '../../utils';

const loadNotifications = async (setNotificationDetails, oldNotificationsData, userId) => {
  if (userId) {
    try {
      const graphVariables = { filter: { userId: {eq: userId} }, limit: 999999999 };
      const allNotifications = await API.graphql({ query: listNotifications, variables: graphVariables });
      // console.log('-- FAQ Loaded --', allFaq.data.listFAQS.items.length)

      const unfilteredItems = allNotifications?.data?.listNotifications?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        const pastOnly = items.filter((n) => n.displayTime <= new Date().toISOString());
        const numberUnread = pastOnly.filter((item) => !item.read).length;
        if(pastOnly.length > 0) {
          pastOnly.sort((a, b) => new Date(b.displayTime) - new Date(a.displayTime));
        }

        const newData = {
          totalNotifications: pastOnly.length,
          unreadNotifications: numberUnread,
          allNotifications: pastOnly,
        }
        if(JSON.stringify(newData) !== JSON.stringify(oldNotificationsData)) {
          setNotificationDetails(newData);
        }

        // console.log('-- Number Unread/Total --', numberUnread, pastOnly.length);
        setBadgeCount(numberUnread, userId, userId);
      }
    } catch (err) {
      console.log('-- Error Loading Notifications, No Datastore --', err);
    }
  } else {
    setNotificationDetails({
      totalNotifications: 0,
      unreadNotifications: 0,
      allNotifications: [],
    });
  }
}

export default loadNotifications;