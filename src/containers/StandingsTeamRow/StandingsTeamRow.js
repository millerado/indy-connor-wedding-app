import React, { memo, useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Text,
  TextSizes,
  Divider,
  Icon
} from "../../components";
import StandingsPersonRow from "../StandingsPersonRow/StandingsPersonRow";
import { typography } from "../../styles";
import styles from "./StandingsTeamRowStyles";

const StandingsTeamRow = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { index, teamId, teamName, iconName, points, topThreeScorers } = props;

  if (!teamId || !teamName || !iconName || !points) {
    return null;
  }

  return (
    <View key={index}>
      {/* {index > 0 && <Divider />} */}
      <>
        <View style={ss.teamWrapper}>
          <Icon name={iconName} size={typography.fontSizeM * 2} />
          <View style={ss.nameWrapper}>
            <Text size={TextSizes.L} bold>
              {teamName}<Text size={TextSizes.L}>: {points} point{points !== 1 ? 's' : ''}</Text>
            </Text>
          </View>
        </View>
        {topThreeScorers.map((scorer, idx) => (
          <StandingsPersonRow
            key={idx}
            index={idx}
            user={scorer.user}
            points={scorer.points}
            teamIcon={iconName}
            showTeamIcon={false}
          />
        ))}
      </>
    </View>
  );
};

export default memo(StandingsTeamRow);
