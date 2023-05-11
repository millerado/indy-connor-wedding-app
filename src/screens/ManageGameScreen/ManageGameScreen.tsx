import React, { useMemo, useState, useEffect } from 'react';
import { View, ScrollView } from "react-native";
import { useTheme, Switch } from "react-native-paper";
import { Text, Icon, allIcons, TextSizes, DropdownInput, TextInput, NumberInput, Button } from '../../components';
import { typography } from '../../styles';
import { nth, DataStore } from '../../utils';
import { Games } from '../../models';
import styles from './ManageGameScreenStyles';

const ManageGameScreen = ({ navigation, route }) => {
  const { view, item } = route.params;
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [iconValue, setIconValue] = useState(null);
  const [gameName, setGameName] = useState('');
  const [rules, setRules] = useState('');
  const [minNumberOfTeams, setMinNumberOfTeams] = useState(2);
  const [hasMaxNumberOfTeams, setHasMaxNumberOfTeams] = useState(true);
  const [maxNumberOfTeams, setMaxNumberOfTeams] = useState(4);
  const [minNumberOfPlayersPerTeam, setMinNumberOfPlayersPerTeam] = useState(2);
  const [hasMaxNumberOfPlayersPerTeam, setHasMaxNumberOfPlayersPerTeam] = useState(true);
  const [maxNumberOfPlayersPerTeam, setMaxNumberOfPlayersPerTeam] = useState(2);
  const [playerPoints, setPlayerPoints] = useState([0, 1]);
  const [hasMultipleWinners, setHasMultipleWinners] = useState(false);
  const [hasTeams, setHasTeams] = useState(true);
  const [iconData, setIconData] = useState([]);

  const handlePlayerPointPress = (idx, fn) => {
    // Update the idx value of playerPoints array
    const newPlayerPoints = [...playerPoints];
    newPlayerPoints[idx] = fn === 'plus' ? newPlayerPoints[idx] + 1 : newPlayerPoints[idx] - 1;
    setPlayerPoints(newPlayerPoints);
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

  const handleSave = async() => {
    if(view === 'editGame') {
      try { 
        await DataStore.save(
          Games.copyOf(item, (i) => {
            i.name = gameName;
            i.iconName = iconValue;
            i.minNumberOfTeams = minNumberOfTeams;
            i.maxNumberOfTeams = hasMaxNumberOfTeams ? maxNumberOfTeams : null;
            i.minNumberOfPlayersPerTeam = hasTeams ? minNumberOfPlayersPerTeam : 1;
            i.maxNumberOfPlayersPerTeam = hasTeams ? hasMaxNumberOfPlayersPerTeam ? maxNumberOfPlayersPerTeam : null : 1;
            i.points = playerPoints;
            i.rules = rules;
            i.canHaveMultipleWinners = hasMultipleWinners;
          })
        );
        navigation.goBack();
      } catch (err) {
        console.log("error updating Game", err);
      }
    } else {
      try {
        // await DataStore.stop();
        await DataStore.save(
          new Games({
            name: gameName,
            iconName: iconValue,
            minNumberOfTeams,
            maxNumberOfTeams: hasMaxNumberOfTeams ? maxNumberOfTeams : null, 
            minNumberOfPlayersPerTeam: hasTeams ? minNumberOfPlayersPerTeam : 1,
            maxNumberOfPlayersPerTeam: hasTeams ? hasMaxNumberOfPlayersPerTeam ? maxNumberOfPlayersPerTeam : null : 1,
            points: playerPoints,
            rules,
            canHaveMultipleWinners: hasMultipleWinners,
          })
        );
        navigation.goBack();
      } catch (err) {
        console.log("error saving Game", err);
      }
    }
  }

  useEffect(() => {
    if (view === 'editGame') {
      setGameName(item.name);
      setIconValue(item.iconName);
      setRules(item.rules);
      setMinNumberOfTeams(item.minNumberOfTeams);
      setHasMaxNumberOfTeams(item.maxNumberOfTeams ? true : false);
      setMaxNumberOfTeams(item.maxNumberOfTeams);
      setMinNumberOfPlayersPerTeam(item.minNumberOfPlayersPerTeam); 
      setHasMaxNumberOfPlayersPerTeam(item.maxNumberOfPlayersPerTeam ? true : false);
      setMaxNumberOfPlayersPerTeam(item.maxNumberOfPlayersPerTeam);
      setPlayerPoints(item.points);
      setHasMultipleWinners(item.canHaveMultipleWinners);
      navigation.setOptions({title: 'Edit Game'});
    } else {
      navigation.setOptions({title: 'Create New Game'});
    }
  }, [view, item]);

  useEffect(() => {
    const newIcons = allIcons.map(i => {
      return {
        label: i.label,
        value: i.iconName,
        icon: i.iconName,
      }
    }).sort((a, b) => a.label.localeCompare(b.label));

    setIconData(newIcons);
  }, []);

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
              <Text size={TextSizes.M}>
                {item.label}
              </Text>
            </View>
          )}
        />
        <View style={{paddingHorizontal: 15, paddingTop: 10}}>
          <TextInput
            clearButtonMode="while-editing"
            returnKeyType="default"
            label="Rules"
            autoCapitalize='sentences'
            multiline
            value={rules}
            enablesReturnKeyAutomatically={true}
            keyboardType="default"
            style={[
              ss.fullWidthTextInput,
              ss.inputMultiLine,
            ]}
            onChangeText={(text) => setRules(text)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View style={{ alignItems: 'center', width: '40%'}}>
            <>
              <Text size={TextSizes.M} bold>
                Has Teams:
              </Text>
              <Text size={TextSizes.XS}>
                Disable this for games people play as individuals
              </Text>
              <View style={ss.numberButtonWrapper}>
                <Switch value={hasTeams} onValueChange={setHasTeams} />
              </View>
            </>
            <>
              <Text size={TextSizes.M} bold>
                {hasTeams ? 'Teams:' : 'Players:'}
              </Text>
              <Text size={TextSizes.XS}>
                How many {hasTeams ? 'teams' : 'players'} can play in the game?
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
            </>
            <>
              <Text size={TextSizes.M} bold>
                Multiple Winners:
              </Text>
              <Text size={TextSizes.XS}>
                Some Games (ex: Bingo) can have multiple winners that aren't on the same team
              </Text>
              <View style={ss.numberButtonWrapper}>
                <Switch value={hasMultipleWinners} onValueChange={setHasMultipleWinners} />
              </View>
            </>
          </View>
          <View style={{ alignItems: 'center', width: '40%'}}>
            {hasTeams && (
              <>
                <Text size={TextSizes.M} bold>
                  Team Sizes:
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
                      min={2}
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
                        min={2}
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
              </>
            )}
            <>
              <Text size={TextSizes.M} bold>
                Points:
              </Text>
              <Text size={TextSizes.XS}>
                Points earned for each player on the winning team, 2nd place team, etc...
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
                  <View key={index}>
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
                  </View>
                ))}
              </View>
            </>
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
