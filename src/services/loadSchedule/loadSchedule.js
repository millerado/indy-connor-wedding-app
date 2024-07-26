import { API, Predicates } from "aws-amplify";
import { listSchedules } from '../../graphql/queries';
import { Schedule } from "../../models";
import { DataStore } from "../../utils";

const loadScheduleFromDatastore = async (setScheduleData, oldScheduleData, eventId) => {
  try {
    const allSchedule = await DataStore.query(Schedule, Predicates.ALL, {
      filter: (f) => f.scheduleEventsId("eq", eventId)
    });
    if(JSON.stringify(allSchedule) !== JSON.stringify(oldScheduleData)) {
      setScheduleData(allSchedule);
    }
  } catch (err) {
    console.log('-- Error Loading Schedule From Datastore --', err);
  }
}

const loadSchedule = async (setScheduleData, oldScheduleData, eventId) => {
  try {
    const allSchedule = await API.graphql({ query: listSchedules, variables: { limit: 999999999, filter: {
      scheduleEventsId: { eq: eventId }
    }} });

    const unfilteredItems = allSchedule?.data?.listSchedules?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(JSON.stringify(items) !== JSON.stringify(oldScheduleData)) {
      setScheduleData(items);
    }
  } catch (err) {
    console.log('-- Error Loading Schedule, Will Try Datastore --', err);
    loadScheduleFromDatastore(setScheduleData, oldScheduleData, eventId);
  }
}

export default loadSchedule;