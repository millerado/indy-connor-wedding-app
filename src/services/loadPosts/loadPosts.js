import { API } from "aws-amplify";
import { listPosts } from '../../graphql/queries';

const formatPosts = (items, oldPosts, setPosts) => {
  if(items.length > 0) {
    const formattedPosts = items.map((post) => {
      const obj = Object.assign({}, post);
      const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
        return JSON.parse(image);
      }) : undefined;
      obj.images = images;
      return obj;
    });
    if(JSON.stringify(formattedPosts) !== JSON.stringify(oldPosts)) {
      setPosts(formattedPosts);
    }
  }
  return [];
};

const loadPosts = async (setPosts, oldPosts, eventId) => {
  try {
    const allPosts = await API.graphql({ query: listPosts, variables: { limit: 999999999, filter: {
      eventsID: { eq: eventId }
    } } });
    // const allPosts = await API.graphql({ query: listPosts, variables: { limit: 999999999 } });

    const unfilteredItems = allPosts?.data?.listPosts?.items;
    // Remove items where _deleted is true
    const items = unfilteredItems.filter(item => !item._deleted);
    if(items.length > 0) {
      items.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      formatPosts(items, oldPosts, setPosts);
    }
  } catch (err) {
    console.log('-- Error Loading Posts --', err);
    formatPosts([], oldPosts, setPosts);
  }
};

export default loadPosts