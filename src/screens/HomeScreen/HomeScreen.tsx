import { View } from "react-native";
import { Text, Button, IconButton, Switch, TextInput } from "../../components";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button mode="contained">Test</Button>
      <IconButton icon="camera" mode="contained" />
      <Switch />
      <View style={{ height: 50, width: 300 }}>
        <TextInput label="Email" />
      </View>
    </View>
  );
};

export default HomeScreen;
