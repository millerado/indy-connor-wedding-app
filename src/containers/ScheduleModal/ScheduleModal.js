import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Schedule } from '../../models';
import { Text, Button, ActivityIndicator, Modal, TextInput } from '../../components';
import { DataStore } from '../../utils';
import styles from './ScheduleModalStyles';

const ScheduleModal = (props) => {
  // name, time, day, location, description, sortOrder = '';
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);

  const { showModal, modalType, closeModal, item } = props;
  let title = 'Add Item';
  let buttonText = 'Submit';
  if (modalType === 'update') {
    title = 'Update Item';
    buttonText = 'Update';
  }

  const handleCloseModal = () => {
    closeModal();
    resetModal();
  };

  const handleChangeDay = (newDay) => {
    Keyboard.dismiss();
    setDay(newDay);
  }

  const handleSaveItem = async () => {
    setIsLoading(true);
    if (modalType === 'update') {
      // Update Item
      if (name && time && day && location && description && sortOrder) {
        try {
          const updatedItem = {...item};
          updatedItem.name = name;
          updatedItem.time = time;
          updatedItem.day = day;
          updatedItem.location = location;
          updatedItem.description = description;
          updatedItem.sortOrder = parseInt(sortOrder);
        
          // await DataStore.stop();
          await DataStore.save(
            Schedule.copyOf(item, updatedItem => {
              updatedItem.name = name;
              updatedItem.time = time;
              updatedItem.day = day;
              updatedItem.location = location;
              updatedItem.description = description;
              updatedItem.sortOrder = parseInt(sortOrder);
            })
          );

          setIsLoading(false);
          setError('');
          handleCloseModal();
          // console.log('-- Created Data?!? --', create);
        } catch (err) {
          console.log('error posting Schedule Items', err)
          setIsLoading(false);
        }
      } else {
        setError('Please fill out all fields.');
        setIsLoading(false);
      }
    } else {
      // Create Item
      if (name && time && day && location && description && sortOrder) {
        try {
          // await DataStore.stop();
          await DataStore.save(
            new Schedule({
              name,
              time,
              day,
              location,
              description,
              sortOrder: parseInt(sortOrder),
            })
          );

          setIsLoading(false);
          setError('');
          handleCloseModal();
          // console.log('-- Created Data?!? --', create);
        } catch (err) {
          console.log('error posting Schedule Items', err)
          setIsLoading(false);
        }
      } else {
        setError('Please fill out all fields.');
        setIsLoading(false);
      }
    }
  }

  const ref_title = useRef();
  const ref_time = useRef();
  const ref_location = useRef();
  const ref_description = useRef();
  const ref_sortOrder = useRef();

  const resetModal = () => {
    if (modalType === 'update') {
      setName(item.name);
      setTime(item.time);
      setDay(item.day);
      setLocation(item.location);
      setDescription(item.description);
      setSortOrder(item.sortOrder.toString());
    } else {
      setName('');
      setTime('');
      setDay('');
      setLocation('');
      setDescription('');
      setSortOrder('');
    }
  };

  useEffect(() => {
    resetModal();
  }, [modalType, item]);

  return (
    <Modal
      isVisible={showModal}
      onBackButtonPress={handleCloseModal}
      onBackdropPress={handleCloseModal}
      avoidKeyboard={true}
      style={{ padding: 0, margin: 0 }}
    >
      <View style={ss.modalBackground}>
        <View style={ss.modalBody}>
          <View style={ss.modalHeader}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Button
                variant='onModalHeader'
                onPress={() => handleCloseModal()}
                compact
                disabled={isLoading}
              >
                Cancel
              </Button>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text
                color={theme.colors.white}
                bold
                size="M">
                {title}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              {!isLoading ? (
                <Button
                  variant='onModalHeader'
                  onPress={() => handleSaveItem()}
                  compact
                >
                  {buttonText}
                </Button>
              ) : (
                <ActivityIndicator size={30} />
              )}
            </View>
          </View>
          <View style={ss.modalContentWrapper}>
            <ScrollView style={ss.modalScrollView} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Button
                  variant={day === 'Friday' ? 'secondary' : 'primary'}
                  onPress={() => handleChangeDay('Friday')}
                  compact
                  disabled={isLoading}
                >
                  Friday
                </Button>
                <Button
                  variant={day === 'Saturday' ? 'secondary' : 'primary'}
                  onPress={() => handleChangeDay('Saturday')}
                  compact
                  disabled={isLoading}
                >
                  Saturday
                </Button>
                <Button
                  variant={day === 'Sunday' ? 'secondary' : 'primary'}
                  onPress={() => handleChangeDay('Sunday')}
                  compact
                  disabled={isLoading}
                >
                  Sunday
                </Button>
              </View>
              <TextInput
                clearButtonMode="while-editing"
                maxLength={3}
                returnKeyType="next"
                label="Sort Order (Within Day)"
                value={sortOrder}
                enablesReturnKeyAutomatically={true}
                keyboardType='numeric'
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputSingleLine]}
                onChangeText={(text) => setSortOrder(text)}
                onSubmitEditing={() => ref_title.current.focus()}
                ref={ref_sortOrder}
                disabled={isLoading}
              />
              <TextInput
                clearButtonMode="while-editing"
                maxLength={50}
                returnKeyType="next"
                label="Title"
                dense
                value={name}
                enablesReturnKeyAutomatically={true}
                keyboardType='default'
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputSingleLine]}
                onChangeText={(text) => setName(text)}
                onSubmitEditing={() => ref_time.current.focus()}
                ref={ref_title}
                disabled={isLoading}
              />
              <TextInput
                clearButtonMode="while-editing"
                maxLength={50}
                returnKeyType="next"
                label="Time"
                dense
                value={time}
                enablesReturnKeyAutomatically={true}
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputSingleLine]}
                onChangeText={(text) => setTime(text)}
                onSubmitEditing={() => ref_location.current.focus()}
                ref={ref_time}
                disabled={isLoading}
              />
              <TextInput
                clearButtonMode="while-editing"
                maxLength={100}
                returnKeyType="next"
                label="Location"
                dense
                value={location}
                enablesReturnKeyAutomatically={true}
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputSingleLine]}
                onChangeText={(text) => setLocation(text)}
                onSubmitEditing={() => ref_description.current.focus()}
                ref={ref_location}
                disabled={isLoading}
              />
              <TextInput
                clearButtonMode="while-editing"
                multiline={true}
                returnKeyType='default'
                label="Description"
                value={description}
                enablesReturnKeyAutomatically={true}
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputMultiLine]}
                onChangeText={(text) => setDescription(text)}
                ref={ref_description}
                disabled={isLoading}
              />
              {error !== '' && (
                <Text style={{ marginTop: 10, marginBottom: 10 }} color={theme.colors.error}>
                  {error}
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ScheduleModal;