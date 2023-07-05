import { API } from "aws-amplify";
import { listFAQS } from '../../graphql/queries'
import { FAQ } from '../../models';
import { DataStore } from '../../utils';

// Backup function that gets called if you're offline
const loadFaqsFromDatastore = async (setFAQData, oldFAQData) => {
  try {
    const items = await DataStore.query(FAQ);
    items.sort((a, b) => a.sortOrder - b.sortOrder);
    if(JSON.stringify(items) !== JSON.stringify(oldFAQData)) {
      setFAQData(items);
    }
  } catch (err) {
    console.log('-- Error Loading FAQ Via Datastore --', err);
  }
}

const loadFaqs = async (setFAQData, oldFAQData) => {
  try {
    const allFaq = await API.graphql({ query: listFAQS, variables: { limit: 999999999 } });
    // console.log('-- FAQ Loaded --', allFaq.data.listFAQS.items.length)

    const unfilteredItems = allFaq?.data?.listFAQS?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => a.sortOrder - b.sortOrder);
      if(JSON.stringify(items) !== JSON.stringify(oldFAQData)) {
        setFAQData(items);
      }
    }
  } catch (err) {
    console.log('-- Error Loading FAQ, Will Try Datastore --', err);
    loadFaqsFromDatastore(setFAQData, oldFAQData);
  }
}

export default loadFaqs;