import React, { useMemo, useEffect, useState, useCallback, useContext } from 'react';
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Text, Divider, TextSizes } from '../../components';
import { StandingsPersonRow, PostPreview } from '../../containers';
import { DataContext } from '../../contexts';
import { calcDimensions, typography } from "../../styles";
import styles from './TeamDetailsScreenStyles';
const diamondDogs = require("../../assets/images/diamondDogsFullSize.png");
const fellowshipOfTheRing = require("../../assets/images/fellowshipOfTheRingFullSize.png");
const reproductiveJusticeLeague = require("../../assets/images/reproductiveJusticeLeagueFullSize.png");
const orderOfThePhoenix = require("../../assets/images/orderOfThePhoenixFullSize.png");

const TeamDetailsScreen = ({ route }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { teamId, iconName, description } = route.params;
  const [teamUserIds, setTeamUserIds] = useState([]);
  const [standingsPeople, setStandingsPeople] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const { width, height } = calcDimensions();
  const { refreshData, allPosts, allTeams, allUsers, allAdminFavorites, allComments, allReactions, allStandingsPeople } = useContext(DataContext);

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
    const postComments = allComments.filter((comment) => comment.postsID === item.id);
    const postReactions = allReactions.filter((reaction) => reaction.postsID === item.id);

    return (
      <PostPreview
        post={item}
        previewMode
        allUsers={allUsers}
        allAdminFavorites={allAdminFavorites}
        comments={postComments}
        reactions={postReactions}
      />
    );
  }, [allUsers, allAdminFavorites, allComments, allReactions]);

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
  }, [standingsPeople, allUsers]);

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

  const onRefresh = async () => {
    refreshData();
  }

  useEffect(() => {
    if(allUsers && standingsPeople.length === 0 && teamId) {
      const userIds = allUsers.filter((u) => u.teamId === teamId).map((u) => u.id);
      if(JSON.stringify(userIds) !== JSON.stringify(teamUserIds)) {
        setTeamUserIds(userIds);
      }
      const oneTeamStandings = allStandingsPeople.filter((s) => userIds.includes(s.userId));

      const allStandingsPeopleWithNames = oneTeamStandings.map((s) => {
        const user = allUsers.find((u) => u.id === s.userId);
        if (!user) {
          return null;
        }
        return {
          ...s,
          name: user.name,
        };
      });
      // If a user was deleted they still exist in standings, this removes them
      const activeUsers = allStandingsPeopleWithNames.filter((s) => s?.name);
      
      // sort by: points (desc), gamesPlayed (desc), name (asc)
      const sortedStandingsPeople = activeUsers.sort((a, b) => {
        if (a.points === b.points) {
          if (a.gamesPlayed === b.gamesPlayed) {
            return a.name > b.name ? 1 : -1;
          }
          return b.gamesPlayed - a.gamesPlayed;
        }
        return b.points - a.points;
      });

      if(JSON.stringify(sortedStandingsPeople) !== JSON.stringify(standingsPeople)) {
        setStandingsPeople(sortedStandingsPeople);
      }
    }
  }, [allUsers, allStandingsPeople]);

  useEffect(() => {
    if(allPosts.length > 0 && teamUserIds.length > 0) {
      // filter allPosts to items where any of usersInPost are in teamUserIds
      const postsWithUsersInTeam = allPosts.filter((p) => {
        const usersInPost = p.usersInPost;
        if(usersInPost && usersInPost.length > 0) {
          return usersInPost.some((u) => teamUserIds.includes(u)); 
        }
        return false;
      });

      if(JSON.stringify(displayPosts) !== JSON.stringify(postsWithUsersInTeam)) {
        setDisplayPosts(postsWithUsersInTeam);
      }
    }
  }, [teamUserIds, allPosts])

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
        data={displayPosts.length > 0 && allUsers.length > 0 ? displayPosts : []}
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
