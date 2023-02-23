import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FAQ } from '../../models';
import { Text, Button, ActivityIndicator, Modal, TextInput } from '../../components';
import { DataStore } from '../../utils';
import styles from './FAQModalStyles';

const FAQModal = (props) => {
  // name, time, day, location, description, sortOrder = '';
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
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

  const handleSaveItem = async () => {
    setIsLoading(true);
    if (modalType === 'update') {
      // Update Item
      if (question && answer && sortOrder) {
        try {
          const updatedItem = {...item};
          updatedItem.question = question;
          updatedItem.answer = answer;
          updatedItem.sortOrder = parseInt(sortOrder);
        
          // await DataStore.stop();
          await DataStore.save(
            FAQ.copyOf(item, updatedItem => {
              updatedItem.question = question;
              updatedItem.answer = answer;
              updatedItem.sortOrder = parseInt(sortOrder);
            })
          );

          setIsLoading(false);
          setError('');
          handleCloseModal();
          // console.log('-- Created Data?!? --', create);
        } catch (err) {
          console.log('error posting FAQ Items', err)
          setIsLoading(false);
        }
      } else {
        setError('Please fill out all fields.');
        setIsLoading(false);
      }
    } else {
      // Create Item
      if (question && answer && sortOrder) {
        try {
          // await DataStore.stop();
          await DataStore.save(
            new FAQ({
              question,
              answer,
              sortOrder: parseInt(sortOrder),
            })
          );

          setIsLoading(false);
          setError('');
          handleCloseModal();
          // console.log('-- Created Data?!? --', create);
        } catch (err) {
          console.log('error posting FAQ Items', err)
          setIsLoading(false);
        }
      } else {
        setError('Please fill out all fields.');
        setIsLoading(false);
      }
    }
  }

  const ref_question = useRef();
  const ref_answer = useRef();
  const ref_sortOrder = useRef();

  const resetModal = () => {
    if (modalType === 'update') {
      setQuestion(item.question);
      setAnswer(item.answer);
      setSortOrder(item.sortOrder.toString());
    } else {
      setQuestion('');
      setAnswer('');
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
                variant='header'
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
                  variant='header'
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
              <TextInput
                clearButtonMode="while-editing"
                maxLength={3}
                returnKeyType="next"
                label="Sort Order"
                dense
                value={sortOrder}
                enablesReturnKeyAutomatically={true}
                keyboardType='numeric'
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputSingleLine]}
                onChangeText={(text) => setSortOrder(text)}
                onSubmitEditing={() => ref_question.current.focus()}
                ref={ref_sortOrder}
                disabled={isLoading}
              />
              <TextInput
                clearButtonMode="while-editing"
                returnKeyType="next"
                label="Question"
                dense
                value={question}
                enablesReturnKeyAutomatically={true}
                keyboardType='default'
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputSingleLine]}
                onChangeText={(text) => setQuestion(text)}
                onSubmitEditing={() => ref_answer.current.focus()}
                ref={ref_question}
                disabled={isLoading}
              />
              <TextInput
                clearButtonMode="while-editing"
                returnKeyType="default"
                label="Answer"
                value={answer}
                multiline={true}
                enablesReturnKeyAutomatically={true}
                style={[ss.textInput, ss.modalTextInput, ss.textInputWrapper, ss.inputMultiLine]}
                onChangeText={(text) => setAnswer(text)}
                ref={ref_answer}
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

export default FAQModal;