import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { View, FlatList, Platform, Pressable, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FAQ } from '../../models';
import { Divider, ActivityIndicator, TextInput, Icon } from '../../components';
import { FAQModal, FAQItem } from '../../containers';
import { calcDimensions } from '../../styles';
import { DataStore } from '../../utils';
import { AuthContext } from '../../contexts';
import styles from './InfoScreenStyles';
const resortMap = require('../../assets/images/rmmcMap.png');

const InfoScreen = ({ navigation, route }) => {
  const [FAQData, setFAQData] = useState([]);
  const [allFAQData, setAllFAQData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;
  const dimensions = calcDimensions();

  const closeModal = () => {
    setShowModal(false);
  };

  const addNewButton = () => {
    return (
      <Pressable onPress={() => setShowModal(true)}>
        <View>
          <Icon
            name={'addItem'}
            color={theme.colors.primary}
          />
        </View>
      </Pressable>
    );
  }

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <FAQItem item={item} />
      )
    }
  , []);

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback (
    () => {
      return (
        <Divider />
      )
    }
  , []);

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={ss.pageActivityIndicatorWrapper}>
        <ActivityIndicator size={60} />
      </View>
    );
  }, [ss]);

  function renderHeader() {
    return (
      <>
        <View>
          <ImageBackground
            resizeMode='contain'
            style={{width: dimensions.width, height: dimensions.width * (1317/2000)}}
            source={resortMap}
            onLoadEnd={() => setImageLoaded(true)}
          >
            {!imageLoaded ? (
              <View style={{alignItems: 'center', justifyContent: 'center', width: dimensions.width, height: dimensions.width * (1317/2000)}}>
                <ActivityIndicator size={dimensions.width * .3} color={theme.colors.primary} />
              </View>
            ) : (
              <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', height: '100%', padding: 5}}>
                <Pressable onPress={() => navigation.push('Map')}>
                  <View>
                    <Icon name='expand' color={theme.colors.white} size={40} />
                  </View>
                </Pressable>
              </View>
            )}
          </ImageBackground>
        </View>
        <View style={ss.searchWrapper}>
          <TextInput
            label="Search FAQs"
            dense
            returnKeyType="default"
            value={searchTerm}
            enablesReturnKeyAutomatically={true}
            clearButtonMode='always'
            style={[
              ss.textInput,
              ss.fullWidthTextInput,
            ]}
            onChangeText={(text) => setSearchTerm(text)}
            color={theme.colors.onSecondary}
          />
        </View>
      </>
    )
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => authStatus?.isAdmin ? addNewButton() : null,
    });
  }, [authStatus, theme]);

  useEffect(() => {
    if (allFAQData !== FAQData && searchTerm !== '') {
      setFAQData(allFAQData);
    } else if (searchTerm === '') {
      setFAQData(allFAQData);
    }
  }, [allFAQData, searchTerm]);

  useEffect(() => {
    // Search FAQ Question and Answer for search terms
    if (searchTerm !== '') {
      const searchResults = allFAQData.filter(item => {
        return item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      }
      );
      setFAQData(searchResults);
    }
  }, [searchTerm]);

  useEffect(() => {
    const subscription = DataStore.observeQuery(FAQ).subscribe(({ items }) => {
      try {
        items.sort((a, b) => a.sortOrder - b.sortOrder);
        if (dataLoading || searchTerm === '') {
          setFAQData(items);
        }
        // if(JSON.stringify(items) !== JSON.stringify(allFAQData)) {
          setAllFAQData(items);
        // }
        if (dataLoading) {
          setDataLoading(false);
        }
        // console.log('-- Fetched Data --', dt);
      } catch (err) { console.log('error fetching Data', err) }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={ss.pageWrapper}>
      <FAQModal showModal={showModal} closeModal={closeModal} modalType={'create'} />
      <FlatList
        data={FAQData}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader()}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={listItemSeparator}
        style={{ width: '100%'}}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
        maxToRenderPerBatch={10} // Also the default
        initialNumToRender={10} // Also the default
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={listEmptyComponent}  
      />
    </View>
  );
}

export default InfoScreen;