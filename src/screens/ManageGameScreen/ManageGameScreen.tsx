import React, { useMemo, useEffect, useState } from 'react';
import { View, ScrollView } from "react-native";
import { useTheme, Switch } from "react-native-paper";
import { Text, Icon, TextSizes, DropdownInput, TextInput, NumberInput, Button } from '../../components';
import { typography } from '../../styles';
import { nth } from '../../utils';
import styles from './ManageGameScreenStyles';

const iconData = [
  {label: 'Barbell', value: 'barbell', icon: 'barbell'},
  {label: 'Baseball', value: 'baseball', icon: 'baseball'},
  {label: 'Basketball', value: 'basketball', icon: 'basketball'},
  {label: 'Beer', value: 'beer', icon: 'beer'},
  {label: 'Bicycle', value: 'bicycle', icon: 'bicycle'},
  {label: 'Camera', value: 'camera', icon: 'camera'},
  {label: 'Comment', value: 'comment', icon: 'comment'},
  {label: 'Controller', value: 'controller', icon: 'controller'},
  {label: 'Disc', value: 'disc', icon: 'disc'},
  {label: 'Football', value: 'football', icon: 'football'},
  {label: 'Golf', value: 'golf', icon: 'golf'},
  {label: 'Heart', value: 'heart', icon: 'heart'},
  {label: 'Medal', value: 'medal', icon: 'medal'},
  {label: 'Picture', value: 'picture', icon: 'picture'},
  {label: 'Pint', value: 'pint', icon: 'pint'},
  {label: 'Ribbon', value: 'ribbon', icon: 'ribbon'},
  {label: 'School', value: 'school', icon: 'school'},
  {label: 'Soccer', value: 'soccer', icon: 'soccer'},
  {label: 'Speedometer', value: 'speedometer', icon: 'speedometer'},
  {label: 'Stopwatch', value: 'stopwatch', icon: 'stopwatch'},
  {label: 'Tennisball', value: 'tennisball', icon: 'tennisball'},
];

const ManageGameScreen = () => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [iconValue, setIconValue] = useState(null);
  const [gameName, setGameName] = useState('');
  const [minNumberOfTeams, setMinNumberOfTeams] = useState(2);
  const [hasMaxNumberOfTeams, setHasMaxNumberOfTeams] = useState(true);
  const [maxNumberOfTeams, setMaxNumberOfTeams] = useState(4);
  const [minNumberOfPlayersPerTeam, setMinNumberOfPlayersPerTeam] = useState(1);
  const [hasMaxNumberOfPlayersPerTeam, setHasMaxNumberOfPlayersPerTeam] = useState(true);
  const [maxNumberOfPlayersPerTeam, setMaxNumberOfPlayersPerTeam] = useState(1);
  const [teamPoints, setTeamPoints] = useState([0, 1]);
  const [playerPoints, setPlayerPoints] = useState([0, 1]);

  const handlePlayerPointPress = (idx, fn) => {
    // Update the idx value of playerPoints array
    const newPlayerPoints = [...playerPoints];
    newPlayerPoints[idx] = fn === 'plus' ? newPlayerPoints[idx] + 1 : newPlayerPoints[idx] - 1;
    setPlayerPoints(newPlayerPoints);
  }

  const handleTeamPointPress = (idx, fn) => {
    // Update the idx value of teamPoints array
    const newTeamPoints = [...teamPoints];
    newTeamPoints[idx] = fn === 'plus' ? newTeamPoints[idx] + 1 : newTeamPoints[idx] - 1;
    setTeamPoints(newTeamPoints);
  }

  const handleNumberPlayerPress = fn => {
    // Update the number of players
    const newPlayerPoints = [...playerPoints];
    if (fn === 'plus') {
      newPlayerPoints.push(0);
    } else {
      newPlayerPoints.pop();
    }
    setPlayerPoints(newPlayerPoints);
  }

  const handleNumberTeamPress = fn => {
    // Update the number of teams
    const newTeamPoints = [...teamPoints];
    if (fn === 'plus') {
      newTeamPoints.push(0);
    } else {
      newTeamPoints.pop();
    }
    setTeamPoints(newTeamPoints);
  }

  const handleSave = () => {
    // Save the game
  }

  return (
    <View style={ss.pageWrapper}>
      <ScrollView style={{flex: 1, width: '100%'}}>
        <View style={{paddingHorizontal: 15, paddingTop: 10}}>
          <TextInput
            clearButtonMode="while-editing"
            maxLength={50}
            returnKeyType="done"
            label="Game Name"
            autoCapitalize='words'
            // dense
            value={gameName}
            enablesReturnKeyAutomatically={true}
            keyboardType="default"
            style={[
              ss.fullWidthTextInput
            ]}
            onChangeText={(text) => setGameName(text)}
          />
        </View>
        <DropdownInput
          data={iconData}
          search
          placeholder='Select Icon'
          focusPlaceholder='...'
          searchPlaceholder="Search..."
          value={iconValue}
          setValue={setIconValue}
          renderLeftIcon={(item) => (
            <View style={{paddingRight: 10}}>
              <Icon
                size={20}
                name={iconValue}
              />
            </View>
          )}
          renderItem={(item) => (
            <View style={{flexDirection: 'row', padding: 5}}>
              <View style={{paddingRight: 10}}>
                <Icon
                  size={typography.fontSizeL}
                  name={item.icon}
                />
              </View>
              <Text size={TextSizes.L}>
                {item.label}
              </Text>
            </View>
          )}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{ alignItems: 'center', width: '40%'}}>
            <Text size={TextSizes.L} bold>
              Teams:
            </Text>
            <Text size={TextSizes.XS}>
              How many teams can play in the game?
            </Text>
            <View style={ss.numberButtonWrapper}>
              <View style={ss.oneButtonWrapper}>
                <Text>
                  Minimum:
                </Text>
                <NumberInput
                  value={minNumberOfTeams}
                  setValue={setMinNumberOfTeams}
                  min={2}
                  max={100}
                />
              </View>
              {hasMaxNumberOfTeams && (
                <View style={[ss.oneButtonWrapper, {paddingTop: 10}]}>
                  <Text>
                    Maximum:
                  </Text>
                  <NumberInput
                    value={maxNumberOfTeams}
                    setValue={setMaxNumberOfTeams}
                    min={2}
                    max={100}
                  />
                </View>
              )}
              <View style={[ss.oneButtonWrapper, {paddingTop: 10}]}>
                <Text>
                  Has Max?
                </Text>
                <Switch value={hasMaxNumberOfTeams} onValueChange={setHasMaxNumberOfTeams} />
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center', width: '40%'}}>
            <Text size={TextSizes.L} bold>
              Players:
            </Text>
            <Text size={TextSizes.XS}>
              How many players are on each team?
            </Text>
            <View style={ss.numberButtonWrapper}>
              <View style={ss.oneButtonWrapper}>
                <Text>
                  Minimum:
                </Text>
                <NumberInput
                  value={minNumberOfPlayersPerTeam}
                  setValue={setMinNumberOfPlayersPerTeam}
                  min={1}
                  max={100}
                />
              </View>
              {hasMaxNumberOfPlayersPerTeam && (
                <View style={[ss.oneButtonWrapper, {paddingTop: 10}]}>
                  <Text>
                    Maximum:
                  </Text>
                  <NumberInput
                    value={maxNumberOfPlayersPerTeam}
                    setValue={setMaxNumberOfPlayersPerTeam}
                    min={1}
                    max={100}
                  />
                </View>
              )}
              <View style={[ss.oneButtonWrapper, {paddingTop: 10}]}>
                <Text>
                  Has Max?
                </Text>
                <Switch value={hasMaxNumberOfPlayersPerTeam} onValueChange={setHasMaxNumberOfPlayersPerTeam} />
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 10}}>
          <View style={{ alignItems: 'center', width: '40%'}}>
            <Text size={TextSizes.M} bold>
              Team Points:
            </Text>
            <Text size={TextSizes.XS}>
              Points earned for the Team Standings per player on the winning team, 2nd place team, etc...
            </Text>
            <View style={ss.numberButtonWrapper}>
              <>
                <Text>
                  Scoring Teams:
                </Text>
                <NumberInput
                  value={teamPoints.length - 1}
                  minusPressHandler={() => handleNumberTeamPress('minus')}
                  plusPressHandler={() => handleNumberTeamPress('plus')}
                  min={0}
                  max={100}
                />
              </>
              {teamPoints.map((point, index) => (
                <>
                  <Text>
                    {index === 0 ? 'Participants' : nth(index)}:
                  </Text>
                  <NumberInput
                    value={point}
                    minusPressHandler={() => handleTeamPointPress(index, 'minus')}
                    plusPressHandler={() => handleTeamPointPress(index, 'plus')}
                    min={0}
                    max={100}
                  />
                </>
              ))}
            </View>
          </View>
          <View style={{ alignItems: 'center', width: '40%'}}>
            <Text size={TextSizes.M} bold>
              Player Points:
            </Text>
            <Text size={TextSizes.XS}>
              Points earned for Player Standings per player on the winning team, 2nd place team, etc...
            </Text>
            <View style={ss.numberButtonWrapper}>
              <>
                <Text>
                  Scoring Players:
                </Text>
                <NumberInput
                  value={playerPoints.length - 1}
                  minusPressHandler={() => handleNumberPlayerPress('minus')}
                  plusPressHandler={() => handleNumberPlayerPress('plus')}
                  min={0}
                  max={100}
                />
              </>
              {playerPoints.map((point, index) => (
                <>
                  <Text>
                    {index === 0 ? 'Participants' : nth(index)}:
                  </Text>
                  <NumberInput
                    value={point}
                    minusPressHandler={() => handlePlayerPointPress(index, 'minus')}
                    plusPressHandler={() => handlePlayerPointPress(index, 'plus')}
                    min={0}
                    max={100}
                  />
                </>
              ))}
            </View>
          </View>
        </View>
        <View style={{padding: 10}}>
          <Button onPress={handleSave} disabled={gameName.length === 0}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageGameScreen;
