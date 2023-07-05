import { API } from "aws-amplify";
import { listSchedules } from '../../graphql/queries';
import { Schedule } from "../../models";
import { DataStore } from "../../utils";

const loadScheduleFromDatastore = async (setScheduleData, oldScheduleData) => {
  try {
    const allSchedule = await DataStore.query(Schedule);
    if(JSON.stringify(allSchedule) !== JSON.stringify(oldScheduleData)) {
      setScheduleData(allSchedule);
    }
  } catch (err) {
    console.log('-- Error Loading Schedule From Datastore --', err);
  }
}

const loadSchedule = async (setScheduleData, oldScheduleData) => {
  try {
    const allSchedule = await API.graphql({ query: listSchedules, variables: { limit: 999999999 } });

    const unfilteredItems = allSchedule?.data?.listSchedules?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(JSON.stringify(items) !== JSON.stringify(oldScheduleData)) {
      setScheduleData(items);
    }
  } catch (err) {
    console.log('-- Error Loading Schedule, Will Try Datastore --', err);
    loadScheduleFromDatastore(setScheduleData, oldScheduleData);
  }
}

export default loadSchedule;