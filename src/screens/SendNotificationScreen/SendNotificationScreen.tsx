import React, {
  useMemo,
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef
} from "react";
import { ScrollView, View, Keyboard, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import { Predicates, SortDirection } from "aws-amplify";
import { TimePickerModal } from "react-native-paper-dates";
import { Users } from "../../models";
import {
  Icon,
  Text,
  Button,
  TextInput,
  TextSizes,
  Switch,
  Divider,
  DropdownInput,
  MultiselectInput,
  Chip,
  ConditionalWrapper,
  Avatar,
} from "../../components";
import { SnackbarContext, AuthContext } from "../../contexts";
import { typography } from "../../styles";
import { sendGlobalPushNotification, sendUsersPushNotifications, scheduleNotificationForAnotherUser, DataStore } from "../../utils";
import styles from "./SendNotificationScreenStyles";

const days = [
  { label: "Sunday", value: "sunday", weekDay: 0 },
  { label: "Monday", value: "monday", weekDay: 1 },
  { label: "Tuesday", value: "tuesday", weekDay: 2 },
  { label: "Wednesday", value: "wednesday", weekDay: 3 },
  { label: "Thursday", value: "thursday", weekDay: 4 },
  { label: "Friday", value: "friday", weekDay: 5 },
  { label: "Saturday", value: "saturday", weekDay: 6 },
]

const SendNotificationScreen = ({ navigation }) => {
  const theme = useTheme();
  const ss = useMemo(() => styles(theme), [theme]);
  const { setSnackbar } = useContext(SnackbarContext);
  const authStatus = useContext(AuthContext).authStatus;
  const [notificationText, setNotificationText] = useState("");
  const [subject, setSubject] = useState("");
  const [notificationSending, setNotificationSending] = useState(false);
  const [scheduleForLater, setScheduleForLater] = useState(true);
  const [sendToEveryone, setSendToEveryone] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('friday');
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());
  const [isValid, setIsValid] = useState(false);
  const refSubject = useRef();
  const refNotificationText = useRef();

  const onDismissTimePicker = useCallback(() => {
    setTimePickerVisible(false);
  }, [timePickerVisible]);

  const onConfirmTimePicker = useCallback(
    ({ hours, minutes }) => {
      setSelectedHour(hours);
      setSelectedMinute(minutes);

      setTimePickerVisible(false);
      // console.log({ hours, minutes });
    },
    [timePickerVisible]
  );

  // https://dev.to/neeleshrj/local-notifications-using-expo-25il
  // https://docs.expo.dev/versions/latest/sdk/notifications/

  const handleSendNotification = async () => {
    // console.log('-- Send Pressed, What is the state?! --', scheduleForLater, sendToEveryone, selectedUsers, selectedDay, selectedHour, selectedMinute );
    setNotificationSending(true);
    Keyboard.dismiss();
    
    if (scheduleForLater) {
      let targetUsers = [];
      if (sendToEveryone) {
        allUsers.forEach((user) => {
          targetUsers.push(user.id);
        });
      } else {
        selectedUsers.forEach((user) => {
          targetUsers.push(user);
        });
      }
      // displayTime should be the next time the notification will be sent, based on selectedDay, selectedHour, selectedMinute
      const currentWeekDay = new Date().getDay();
      const targetWeekDay = days.find((d) => d.value === selectedDay).weekDay;
      let daysToAdd = 0;
      if (targetWeekDay < currentWeekDay) {
        daysToAdd = 7 - (currentWeekDay - targetWeekDay);
      } else if (targetWeekDay > currentWeekDay) {
        daysToAdd = targetWeekDay - currentWeekDay;
      }
      const displayTime = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + daysToAdd,
        selectedHour,
        selectedMinute
      );

      const scheduleTrigger = {
        weekDay: targetWeekDay,
        day: selectedDay,
        hour: selectedHour,
        minute: selectedMinute,
      };
      
      // console.log('-- scheduleTrigger --', scheduleTrigger);

      // Create Logic for Scheduling (Insert into that *other* table)
      // console.log('-- Target Users --', targetUsers);
      targetUsers.forEach((user) => {
        // console.log('-- Scheduling for User --', user);
        scheduleNotificationForAnotherUser(user, subject, notificationText, {}, scheduleTrigger, displayTime.toISOString());
      });
    } else {
      if (sendToEveryone) {
        sendGlobalPushNotification(subject, notificationText, {}, authStatus.userId);
      } else {
        sendUsersPushNotifications(
          selectedUsers,
          subject,
          notificationText,
          {},
          authStatus.userId,
        );
      }
    }

    setNotificationSending(false);
    setNotificationText("");
    setSubject("");
    setSnackbar({
      message: `Notification Sent!`,
      showCloseIcon: true,
    });
    navigation.goBack();
  };

  const handleRemoveUser = (userId) => {
    const newUsers = [...selectedUsers];
    setSelectedUsers(newUsers.filter((u) => u !== userId));
  };

  useEffect(() => {
    setIsValid(
      notificationText.length > 0 &&
      subject.length > 0 &&
        (!scheduleForLater || (scheduleForLater && selectedDay && selectedHour && selectedMinute)) &&
        (sendToEveryone || (!sendToEveryone && selectedUsers.length > 0))
    );
  }, [notificationText, scheduleForLater, sendToEveryone, selectedUsers, selectedDay, selectedHour, selectedMinute]);

  useEffect(() => {
    const usersSubscription = DataStore.observeQuery(Users, Predicates.ALL, {
      sort: (u) => u.name(SortDirection.ASCENDING),
    }).subscribe(({ items }) => {
      const newUsers = items.map((u) => {
        return {
          id: u.id,
          name: u.name,
          image: u.image ? JSON.parse(u.image) : undefined,
          fullObject: u,
          label: u.name,
          value: u.id,
        };
      });

      // Quick check to make sure we're only updating state if the subscription caught a change that we care about
      if (JSON.stringify(newUsers) !== JSON.stringify(allUsers)) {
        setAllUsers(newUsers);
      }
    });

    return () => {
      usersSubscription.unsubscribe();
    };
  }, []);

  return (
    <View style={ss.pageWrapper}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            padding: 10,
            justifyContent: "space-evenly",
          }}
        >
          <TextInput
            clearButtonMode="while-editing"
            maxLength={50}
            returnKeyType="next"
            label="Subject Line"
            value={subject}
            enablesReturnKeyAutomatically={true}
            keyboardType="default"
            style={[ss.textInput, ss.fullWidthTextInput, ss.textInputWrapper]}
            onChangeText={(text) => setSubject(text)}
            disabled={notificationSending}
            ref={refSubject}
            onSubmitEditing={() => refNotificationText.current.focus()}
          />
          <TextInput
            clearButtonMode="while-editing"
            maxLength={150}
            returnKeyType="done"
            label="Notification Message"
            value={notificationText}
            enablesReturnKeyAutomatically={true}
            keyboardType="default"
            style={[ss.textInput, ss.fullWidthTextInput, ss.textInputWrapper, ss.inputMultiLine, {marginTop: 10}]}
            onChangeText={(text) => setNotificationText(text)}
            disabled={notificationSending}
            ref={refNotificationText}
          />
          <View style={{ paddingTop: 10 }}>
            <Text>
              Please read this carefully, it can't be edited after it's sent
            </Text>
          </View>
          <View style={{ paddingVertical: 10, width: "100%" }}>
            <Divider />
          </View>
          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 10 }}>Schedule for Later?</Text>
            <Switch
              value={scheduleForLater}
              onValueChange={setScheduleForLater}
            />
          </View>
          {scheduleForLater && (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  paddingTop: 10,
                }}
              >
                <View style={{flex: 1}}>
                <DropdownInput
                  data={days}
                  placeholder='Which Day?'
                  focusPlaceholder='...'
                  searchPlaceholder="Search..."
                  value={selectedDay}
                  setValue={setSelectedDay}
                  renderLeftIcon={(item) => (
                    <View style={{paddingRight: 10}}>
                      <Icon
                        size={20}
                        name={'calendar'}
                      />
                    </View>
                  )}
                  renderItem={(item) => (
                    <View style={{flexDirection: 'row', padding: 5}}>
                      <View style={{paddingRight: 10}}>
                        <Icon
                          size={typography.fontSizeL}
                          name={'calendar'}
                        />
                      </View>
                      <Text size={TextSizes.M}>
                        {item.label}
                      </Text>
                    </View>
                  )}
                />
                </View>
                <Pressable onPress={() => setTimePickerVisible(true)} style={{padding: 10}}>
                  <Text>
                    at {selectedHour === 0 ? '12' : selectedHour > 12 ? selectedHour - 12 : selectedHour}:{selectedMinute < 10 ? `0${selectedMinute}` : selectedMinute}{selectedHour >= 12 ? 'pm' : 'am'}
                  </Text>
                </Pressable>
                <TimePickerModal
                  visible={timePickerVisible}
                  onDismiss={onDismissTimePicker}
                  onConfirm={onConfirmTimePicker}
                  hours={selectedHour}
                  minutes={selectedMinute}
                />
              </View>
            </>
          )}
          <View style={{ paddingVertical: 10, width: "100%" }}>
            <Divider />
          </View>
          <View
            style={{
              paddingTop: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 10 }}>Send to All Campers?</Text>
            <Switch value={sendToEveryone} onValueChange={setSendToEveryone} />
          </View>
          {!sendToEveryone && (
            <View style={{ width: "100%" }}>
              <MultiselectInput
                data={allUsers}
                search
                // placeholder={team.name}
                // maxSelect={team.maxPlayers}
                placeholder={"Select Campers"}
                label={"Select Campers"}
                focusPlaceholder="..."
                searchPlaceholder="Search..."
                values={selectedUsers}
                setValues={(item) => setSelectedUsers(item)}
                valueField="id"
                renderLeftIcon={(item) => (
                  <View style={{ paddingRight: 10 }}>
                    <Icon size={typography.fontSizeXS * 2} name={"user"} />
                  </View>
                )}
                renderItem={(item) => (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 5,
                      paddingVertical: 2,
                    }}
                  >
                    <View
                      style={{ paddingRight: 10, justifyContent: "center" }}
                    >
                      <Avatar
                        fileName={item.image?.url}
                        name={item.name}
                        size={typography.fontSizeXS * 2}
                        variant="circle"
                        absolute={false}
                        textSize={TextSizes.S}
                      />
                    </View>
                    <Text size={TextSizes.M}>{item.name}</Text>
                  </View>
                )}
                visibleSelectedItem={false}
              />
              <ConditionalWrapper
                condition={selectedUsers.length > 0}
                wrapper={(children) => (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      paddingHorizontal: 10,
                      marginBottom: 10,
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      paddingVertical: 8 / -2,
                    }}
                  >
                    {children}
                  </View>
                )}
              >
                {selectedUsers.map((player, index) => {
                  const playerData = allUsers.find((u) => u.id === player);
                  if (playerData) {
                    return (
                      <View style={{ padding: 8 / 2 }} key={index}>
                        <Chip
                          elevated
                          icon={(item) => (
                            <Avatar
                              fileName={playerData.image?.url}
                              name={playerData.name}
                              size={typography.fontSizeXS * 2}
                              textSize={TextSizes.S}
                              variant="circle"
                              absolute={false}
                            />
                          )}
                          closeIcon={() => (
                            <Icon
                              size={typography.fontSizeXS * 2}
                              name={"close"}
                            />
                          )}
                          onClose={() => handleRemoveUser(player)}
                        >
                          <Text size={TextSizes.S}>
                            {selectedUsers.length <= 2 ? playerData.name : ""}
                          </Text>
                        </Chip>
                      </View>
                    );
                  }
                  return null;
                })}
              </ConditionalWrapper>
            </View>
          )}
          <View style={{ paddingVertical: 10, width: "100%" }}>
            <Divider />
          </View>
          <View style={{ paddingTop: 10 }}>
            <Button disabled={!isValid || notificationSending} onPress={handleSendNotification}>
              Send Message
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SendNotificationScreen;
