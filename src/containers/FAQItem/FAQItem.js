import React, { useState, useContext, memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { List, useTheme, Dialog, Portal, Menu } from 'react-native-paper';
import { AuthContext } from '../../contexts';
import { FAQ } from '../../models';
import FAQModal from '../FAQModal/FAQModal';
import {
  Divider,
  Text,
  TextSizes,
  Button,
  ConditionalWrapper,
  Icon,
} from "../../components";
import FormatTextWithMentions from '../FormatTextWithMentions/FormatTextWithMentions';
import { DataStore } from "../../utils";
import { typography } from '../../styles';
import styles from './FAQItemStyles';

const FAQItem = (props) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const authStatus = useContext(AuthContext).authStatus;
  const { question, answer, id } = props.item;


  const deleteFAQItem = async () => {
    if (authStatus?.isAuthed) {
      try {
        await DataStore.delete(FAQ, id);
        setDeleteDialogVisible(false);
      } catch (error) {
        console.log("Error deleting FAQ item", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowMenu(false);
    if (authStatus?.isAdmin) {
      setShowModal(true);
    }
  }

  const toggleExpanded = () => {
    setExpanded(!expanded);
  }

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const showDeleteDialog = () => {
    setShowMenu(false);
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  return (
    <>
      <FAQModal 
        showModal={showModal} 
        closeModal={closeModal} 
        modalType={'update'} 
        item={props.item} 
      />
      <Portal>
        <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Title>Delete FAQ Item</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this FAQ Item?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <View style={{paddingRight: 10}}>
              <Button onPress={hideDeleteDialog} text="Cancel">Cancel</Button>
            </View>
            <View>
              <Button onPress={deleteFAQItem} text="Delete">Delete</Button>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Menu
        visible={showMenu}
        onDismiss={closeMenu}
        anchor={
          <List.Section style={ss.sectionWrapper}>
            <List.Accordion
              expanded={expanded}
              onPress={toggleExpanded}
              style={ss.accordionWrapper}
              title={question}
              titleStyle={ss.questionStyle}
              titleNumberOfLines={3}
              right={() => (
                <Icon name={expanded ? 'expanded' : 'collapsed'} size={typography.fontSizeL} color={theme.colors.onPrimary} />
              )}
            >
              <ConditionalWrapper
                condition={authStatus.isAdmin}
                wrapper={(children) => (
                  <Pressable onPress={openMenu}>{children}</Pressable>
                )}
              >
                <View style={{padding: 10, paddingLeft: 15}}>
                  <FormatTextWithMentions text={answer} size={TextSizes.L} />
                </View>
              </ConditionalWrapper>
            </List.Accordion>
          </List.Section>
        }
      >
        <Menu.Item
          onPress={openModal}
          title="Edit FAQ Item"
          icon={({ size, color }) => (
            <Icon name="edit" size={size} color={theme.colors.onPrimary} />
          )}
        />
        <Divider/>
        <Menu.Item
          onPress={showDeleteDialog}
          title="Delete FAQ Item"
          icon={({ size, color }) => (
            <Icon name="trash" size={size} color={theme.colors.onPrimary} />
          )}
        />
      </Menu>
    </>
  )
};

export default memo(FAQItem);