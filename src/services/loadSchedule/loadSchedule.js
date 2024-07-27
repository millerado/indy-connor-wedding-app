import { API } from "aws-amplify";
import { listSchedules } from '../../graphql/queries';

const loadSchedule = async (setScheduleData, oldScheduleData, eventId) => {
  try {
    const allSchedule = await API.graphql({ query: listSchedules, variables: { limit: 999999999, filter: {
      eventsID: { eq: eventId }
    }} });
    // const allSchedule = await API.graphql({ query: listSchedules, variables: { limit: 999999999} });

    const unfilteredItems = allSchedule?.data?.listSchedules?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(JSON.stringify(items) !== JSON.stringify(oldScheduleData)) {
      setScheduleData(items);
    }
  } catch (err) {
    console.log('-- Error Loading Schedule --', err);
    setScheduleData([]);
  }
}

export default loadSchedule;