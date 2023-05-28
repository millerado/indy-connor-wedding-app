import React, { memo, useMemo } from "react";
import { View , Image } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextSizes,
  Button,
} from "../../components";
import { calcDimensions } from "../../styles";
import styles from "./StandingsTeamRowStyles";
const diamondDogs = require("../../assets/images/diamondDogsFullSize.png");
const fellowshipOfTheRing = require("../../assets/images/fellowshipOfTheRingFullSize.png");
const reproductiveJusticeLeague = require("../../assets/images/reproductiveJusticeLeagueFullSize.png");
const orderOfThePhoenix = require("../../assets/images/orderOfThePhoenixFullSize.png");

const StandingsTeamRow = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const dimensions = calcDimensions();
  const navigation = useNavigation();

  const { index, teamId, teamName, iconName, description, points, allUsers, allTeams, allStandingsTeams, allStandingsPeople } = props;

  if (!teamId || !teamName || !iconName || !points) {
    return null;
  }

  const goToTeamScreen = () => {
    navigation.push("Team Details", { teamId, teamName, iconName, description, allUsers, allTeams, allStandingsPeople, allStandingsTeams });
  }

  return (
    <View key={index}>
      <View style={ss.teamWrapper}>
        <View style={ss.iconWrapper}>
          <Image source={iconName === 'diamondDogs' ? diamondDogs : iconName === 'fellowshipOfTheRing' ? fellowshipOfTheRing : iconName === 'orderOfThePhoenix' ? orderOfThePhoenix : reproductiveJusticeLeague} resizeMethod={'scale'} resizeMode={'contain'} style={{width: (dimensions.width * 1/3) - 5, height: (dimensions.width * 1/3) - 5}} />
        </View>
        <View style={ss.nameWrapper}>
          <Text size={TextSizes.L} bold >
            {teamName}
          </Text>
          <View style={ss.pointsWrapper}>
            <Text size={TextSizes.M}>
              {points} point{points !== 1 ? 's' : ''}
            </Text>
            <Button onPress={goToTeamScreen} short>
              View Team
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(StandingsTeamRow);
