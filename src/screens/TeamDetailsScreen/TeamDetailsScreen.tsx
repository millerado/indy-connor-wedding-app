import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { API, graphqlOperation, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { onCreatePosts, onUpdatePosts, onDeletePosts} from '../../graphql/subscriptions';
import { listPosts } from '../../graphql/queries'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Text, Divider, TextSizes } from '../../components';
import { StandingsPersonRow, PostPreview } from '../../containers';
import { Posts } from "../../models";
import { calcDimensions, typography } from "../../styles";
import { DataStore } from "../../utils";
import styles from './TeamDetailsScreenStyles';
const diamondDogs = require("../../assets/images/diamondDogsFullSize.png");
const fellowshipOfTheRing = require("../../assets/images/fellowshipOfTheRingFullSize.png");
const reproductiveJusticeLeague = require("../../assets/images/reproductiveJusticeLeagueFullSize.png");
const orderOfThePhoenix = require("../../assets/images/orderOfThePhoenixFullSize.png");

const TeamDetailsScreen = ({ route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [teamUserIds, setTeamUserIds] = useState([]);
  const [standingsPeople, setStandingsPeople] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [priorConnectionState, setPriorConnectionState] = useState(undefined);
  const { teamId, teamName, iconName, description, allUsers, allTeams, allStandingsTeams, allStandingsPeople } = route.params;
  const { width, height } = calcDimensions();

  Hub.listen("api", (data: any) => {
    const { payload } = data;
    if ( payload.event === CONNECTION_STATE_CHANGE ) {
      if (priorConnectionState === ConnectionState.Connecting && payload.data.connectionState === ConnectionState.Connected) {
        loadPosts();
      }
      setPriorConnectionState(payload.data.connectionState);
    }
  });

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyles = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [height * .5, (width / 6) + 20], Extrapolation.CLAMP),
      width: width,
      marginBottom: 0,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.onPrimary
    };
  });

  const imageStyles = useAnimatedStyle(() => {
    return {
      width: interpolate(scrollY.value, [0, 200], [width / 2, width / 6], Extrapolation.CLAMP),
      height: interpolate(scrollY.value, [0, 200], [width / 2, width / 6], Extrapolation.CLAMP),
      alignSelf: 'center',
    };
  });

  const textStyles = useAnimatedStyle(() => {
    return {
      fontSize: interpolate(scrollY.value, [0, 100], [typography.fontSizeM, 0], Extrapolation.CLAMP),
      display: scrollY.value >= 90 ? 'none' : 'flex',
      marginLeft: 0,
      textAlign: 'center',
    };
  });

  const renderItem = useCallback(({ item }) => {
    return (
      <PostPreview
        post={item}
        previewMode
      />
    );
  }, []);

  const listHeader = useCallback(() => {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {standingsPeople.map((s, index) => {
          const user = allUsers.find((u) => u.id === s.userId);
          if (!user) {
            return null;
          }
          const team = allTeams.find((t) => t.id === user.teamId);
          if (!team) {
            return null;
          }
          return (
            <StandingsPersonRow
              index={index}
              key={index}
              user={user}
              points={s.points}
              gamesPlayed={s.gamesPlayed}
              teamIcon={team.iconName}
              showTeamIcon={true}
            />
          );
        })}
        <View style={{ paddingLeft: 10}}>
          <Text size={TextSizes.XL} bold>
            Team Activities:
          </Text>
        </View>
      </View>
    )
  }, [standingsPeople]);

  const renderListEmpty = useCallback(() => {
    return (
      <View style={{ flex: 1, width: "100%", justifyContent: 'center', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 40 }}>
        <Text size={TextSizes.XXL}>
          Nobody has played any games yet!
        </Text>
      </View>
    )
  }, []);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider height={5} margin={0} />;
  }, []);

  const formatPostItems = (items) => {
    if(items.length > 0) {
      const formattedPosts = items.map((post) => {
        const obj = Object.assign({}, post);
        const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
          return JSON.parse(image);
        }) : undefined;
        obj.images = images;
        return obj;
      });
      formattedPosts.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      const events = formattedPosts.filter((p) => p.olympicEvent);
      return events;
    }
    return [];
  }

  const loadPostsFromDataStore = async () => {
    const allPostsData = await DataStore.query(
      Posts,
      (p) => p.or(p => {
        const filter = [];
        for(let i = 0; i < teamUserIds.length; i++) {
          filter.push(p.usersInPost.contains(teamUserIds[i]));
        }
        return filter;
      }),
    );
    const formattedPosts = formatPostItems(allPostsData);
    setAllPosts(formattedPosts);
  }

  const loadPosts = async () => {
    try {
      const allPosts = await API.graphql({ query: listPosts, variables: { limit: 999999999, filter: { 
        or: (p => {
          const filter = [];
          for(let i = 0; i < teamUserIds.length; i++) {
            filter.push(p.usersInPost.contains(teamUserIds[i]));
          }
          return filter;
        })
      } } });
      // console.log('-- FAQ Loaded --', allFaq.data.listFAQS.items.length)

      const unfilteredItems = allPosts?.data?.listPosts?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        const formattedPosts = formatPostItems(items);
        setAllPosts(formattedPosts);
      }
    } catch (err) {
      console.log('-- Error Loading Posts, Will Try Datastore --', err);
      loadPostsFromDataStore();
    }
  }

  const onRefresh = () => {
    loadPosts();
  }

  useEffect(() => {
    if(allUsers) {
      const userIds = allUsers.filter((u) => u.teamId === teamId).map((u) => u.id);
      setTeamUserIds(userIds);
      const oneTeamStandings = allStandingsPeople.filter((s) => userIds.includes(s.userId));
      setStandingsPeople(oneTeamStandings);
    }
  }, [allUsers, allStandingsPeople]);

  useEffect(() => {
    if(teamUserIds.length > 0) {
      const createSub = API.graphql(
        graphqlOperation(onCreatePosts)
      ).subscribe({
        next: ({ value }) => loadPosts(),
      });
      
      const updateSub = API.graphql(
        graphqlOperation(onUpdatePosts)
      ).subscribe({
        next: ({ value }) => loadPosts()
      });
      
      const deleteSub = API.graphql(
        graphqlOperation(onDeletePosts)
      ).subscribe({
        next: ({ value }) => loadPosts()
      });

      loadPosts();

      return () => {
        createSub.unsubscribe();
        updateSub.unsubscribe();
        deleteSub.unsubscribe();
      }
    }
  }, [teamUserIds]);

  return (
    <View style={ss.pageWrapper}>
      <Animated.View style={headerStyles}>
        <Animated.Image source={iconName === 'diamondDogs' ? diamondDogs : iconName === 'fellowshipOfTheRing' ? fellowshipOfTheRing : iconName === 'orderOfThePhoenix' ? orderOfThePhoenix : reproductiveJusticeLeague} resizeMethod={'scale'} resizeMode={'contain'} style={imageStyles} />
        <Animated.Text style={textStyles}>{description}</Animated.Text>
      </Animated.View>
      <View style={{ width: "100%" }}>
        <Divider />
      </View>
      <Animated.FlatList
        data={allPosts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={listItemSeparator}
        ListHeaderComponent={listHeader}
        removeClippedSubviews={Platform.OS === "android"} // Saves memory, has issues on iOS
        maxToRenderPerBatch={10} // Also the default
        initialNumToRender={10} // Also the default
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{ width: '100%' }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        overScrollMode="never"
        ListEmptyComponent={renderListEmpty}
        onRefresh={onRefresh}
        refreshing={false}
      />
    </View>
  );
};

export default TeamDetailsScreen;
