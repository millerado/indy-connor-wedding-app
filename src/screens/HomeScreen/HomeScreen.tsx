import { View } from "react-native";
import { Text, Button, IconButton, Switch, TextInput, TextSizes } from "../../components";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text size={TextSizes.L}>Home Screen</Text>
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
