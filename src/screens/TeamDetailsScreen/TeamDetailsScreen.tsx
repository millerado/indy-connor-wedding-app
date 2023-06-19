import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { View, Image, FlatList } from "react-native";
import { useTheme } from "react-native-paper";
import { SortDirection } from "aws-amplify";
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

const TeamDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [teamUserIds, setTeamUserIds] = useState([]);
  const [standingsPeople, setStandingsPeople] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const { teamId, teamName, iconName, description, allUsers, allTeams, allStandingsTeams, allStandingsPeople } = route.params;
  const { width, height } = calcDimensions();

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

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback(() => {
    return <Divider height={5} margin={0} />;
  }, []);

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
      const postSubscription = DataStore.observeQuery(
        Posts,
        (p) => p.or(p => {
          const filter = [];
          for(let i = 0; i < teamUserIds.length; i++) {
            filter.push(p.usersInPost.contains(teamUserIds[i]));
          }
          return filter;
        }),
        { sort: (s) => s.createdAt(SortDirection.DESCENDING) }
      ).subscribe(({ items }) => {
        try {
          const formattedPosts = items.map((post) => {
            const obj = Object.assign({}, post);
            const images = post.images?.length > 0 && post.images[0] !== null ? post.images.map((image) => {
              return JSON.parse(image);
            }) : undefined;
            obj.images = images;
            return obj;
          });
          const events = formattedPosts.filter((p) => p.olympicEvent);
          // if (JSON.stringify(events) !== JSON.stringify(allPosts)) {
            setAllPosts(events);
          // }
        } catch (err) {
          console.log("error fetching Contents", err);
        }
      });

      return () => {
        postSubscription.unsubscribe();
      };
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
      />
    </View>
  );
};

export default TeamDetailsScreen;
