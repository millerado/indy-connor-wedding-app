import { API } from "aws-amplify";
import { listEvents } from '../../graphql/queries'

const formatEvents = async (items, setEvents, oldEvents) => {
  try {
    const newEvents = items.map((e) => {
      const users = [];
      for(let i = 0; i < e.users.length; i++) {
        const oneUser = JSON.parse(e.users[i]);
        users.push(oneUser);
      };
      return {
        id: e.id,
        name: e.eventName,
        password: e.eventPassword,
        adminPassword: e.adminPassword,
        startDate: e.startDate,
        endDate: e.endDate,
        displayStartDate: e.displayStartDate,
        displayEndDate: e.displayEndDate,
        allowNewActivity: e.allowNewActivity,
        eventFunctionality: e.eventFunctionality ? JSON.parse(e.eventFunctionality) : [],
        users,
      };
    });
    newEvents.sort((a, b) => a.name.localeCompare(b.name));
    if(JSON.stringify(newEvents) !== JSON.stringify(oldEvents)) {
      // console.log('-- And setting events in Context --');
      setEvents(newEvents);
    }
  } catch (err) {
    console.log('-- Error Formatting Events --', err);
    setEvents([]);
  }
};

const loadEvents = async (setEvents, oldEvents) => {
  try {
    let variables = { limit: 999999999 };
    const allEvents = await API.graphql({ query: listEvents, variables: variables });

    const unfilteredItems = allEvents?.data?.listEvents?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      formatEvents(items, setEvents, oldEvents);
    }
  } catch (err) {
    console.log('-- Error Loading Events --', err);
    formatEvents([], setEvents, oldEvents);
  }
};

export default loadEvents