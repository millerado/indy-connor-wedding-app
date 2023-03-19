import React, { useEffect, useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Avatar,
  Text,
  Divider,
} from "../../components";
import { typography } from "../../styles";

const TaggingUserSuggestions = (keyword, onSuggestionPress, allUsers) => {
  const theme = useTheme();
  // Weird fix up here to avoid screen flicker/flash
  // BUG: undefined on the first call, the correct string (fx "ma") on the second call
  // console.log(keyword)

  // FIX: Throttling the value of `keyword` into `calmKeyword` and using it later in the function
  const [calmKeyword, setCalmKeyword] = useState(keyword);
  useEffect(() => {
    const timeout = setTimeout(() => setCalmKeyword(keyword), 10);
    return () => clearTimeout(timeout);
  }, [keyword]);

  if (calmKeyword == null || allUsers.length === 0) {
    return null;
  }
  // End of weird fix up here to avoid screen flicker/flash
  const fixedUserIds = allUsers.map((user) => {
    return ({
      id: user.userId,
      name: user.name,
      image: user.image ? JSON.parse(user.image) : undefined,
    })
  });

  const filteredUsers = fixedUserIds.filter(user => user.name.toLocaleLowerCase().includes(calmKeyword.toLocaleLowerCase()));
  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={{ maxHeight: (typography.fontSizeM * 2 * Math.min(5, filteredUsers.length)) + (Math.min(5, filteredUsers.length) * 10) + 10 }}>
      {filteredUsers
        .map((user, index) => (
          <View key={user.id} style={{paddingLeft: 10, paddingRight: 10}}>
            {index > 0 && <Divider margin={0} />}
            <Pressable
              onPress={() => onSuggestionPress(user)}
              key={user.id}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5, paddingTop: 5 }}>
                <Avatar
                  fileName={user?.image?.url}
                  name={user?.name}
                  size={typography.fontSizeM * 2}
                  variant="circle"
                  absolute={false}
                />
                <Text style={{ paddingLeft: 10 }} size='L'>{user.name}</Text>
              </View>
            </Pressable>
          </View>
        ))
      }
    </ScrollView>
  );
};

export default TaggingUserSuggestions;
