import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { View, FlatList, Platform, Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FAQ } from '../../models';
import { Divider, ActivityIndicator, TextInput, Icon } from '../../components';
import { FAQModal, FAQItem } from '../../containers';
import { DataStore } from '../../utils';
import { AuthContext } from '../../contexts';
import styles from './FAQScreenStyles';

const FAQScreen = ({ navigation, route }) => {
  const [FAQData, setFAQData] = useState([]);
  const [allFAQData, setAllFAQData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const authStatus = useContext(AuthContext).authStatus;

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
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const listItemSeparator = useCallback (
    () => {
      return (
        <Divider />
      )
    }
  );

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
        setAllFAQData(items);
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
      {dataLoading || allFAQData.length === 0 ? (
        <View style={ss.pageActivityIndicatorWrapper}>
          <ActivityIndicator size={60} />
        </View>
      ) : (
        <>
          <View style={ss.searchWrapper}>
            <TextInput
              label="Search FAQs"
              dense
              returnKeyType="default"
              value={searchTerm}
              enablesReturnKeyAutomatically={true}
              style={[
                ss.textInput,
                ss.textInputWrapper,
                ss.fullWidthTextInput,
              ]}
              onChangeText={(text) => setSearchTerm(text)}
              color={theme.colors.onSecondary}
            />
          </View>
            <FlatList
              data={FAQData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ItemSeparatorComponent={listItemSeparator}
              style={{ width: '100%'}}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              removeClippedSubviews={Platform.OS === 'android'} // Saves memory, has issues on iOS
              maxToRenderPerBatch={10} // Also the default
              initialNumToRender={10} // Also the default
            />
        </>
      )}
    </View>
  );
}

export default FAQScreen