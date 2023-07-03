import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { View, FlatList, Platform, Pressable, ImageBackground } from 'react-native';
import { useTheme } from 'react-native-paper';
import { API, graphqlOperation } from "aws-amplify";
import { onCreateFAQ, onUpdateFAQ, onDeleteFAQ} from '../../graphql/subscriptions';
import { listFAQS } from '../../graphql/queries'
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

  const onRefresh = () => {
    loadFAQ();
  }

  // Backup function that gets called if you're offline
  const loadFaqFromDatastore = async () => {
    try {
      const items = await DataStore.query(FAQ);
      items.sort((a, b) => a.sortOrder - b.sortOrder);
      if (dataLoading || searchTerm === '') {
        setFAQData(items);
      }
      setAllFAQData(items);
      setDataLoading(false);
    } catch (err) {
      console.log('-- Error Loading FAQ Via Datastore --', err);
    }
  }

  const loadFAQ = async () => {
    try {
      const allFaq = await API.graphql({ query: listFAQS });
      // console.log('-- FAQ Loaded --', allFaq.data.listFAQS.items.length)

      const unfilteredItems = allFaq?.data?.listFAQS?.items;
      // Remove items where _deleted is true
      const items = unfilteredItems.filter(item => !item._deleted);
      if(items.length > 0) {
        items.sort((a, b) => a.sortOrder - b.sortOrder);
        if (dataLoading || searchTerm === '') {
          setFAQData(items);
        }
        setAllFAQData(items);
        setDataLoading(false);
      }
    } catch (err) {
      console.log('-- Error Loading FAQ, Will Try Datastore --', err);
      loadFaqFromDatastore();
    }
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
    const createSub = API.graphql(
      graphqlOperation(onCreateFAQ)
    ).subscribe({
      next: ({ value }) => loadFAQ(),
    });
    
    const updateSub = API.graphql(
      graphqlOperation(onUpdateFAQ)
    ).subscribe({
      next: ({ value }) => loadFAQ()
    });
    
    const deleteSub = API.graphql(
      graphqlOperation(onDeleteFAQ)
    ).subscribe({
      next: ({ value }) => loadFAQ()
    });

    loadFAQ();

    return () => {
      createSub.unsubscribe();
      updateSub.unsubscribe();
      deleteSub.unsubscribe();
    }
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
        onRefresh={onRefresh}
        refreshing={false}
      />
    </View>
  );
}

export default InfoScreen;