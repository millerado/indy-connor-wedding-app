import { useContext } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { Text, Button, IconButton, Switch, TextInput, TextSizes } from "../../components";
import { ThemeContext, AuthContext } from "../../contexts";
import { IntroModal } from "../../containers";

const HomeScreen = () => {
  const theme = useTheme();
  // Get theme Context
  const themeContext = useContext(ThemeContext);
  const { themeName, setThemeName } = themeContext;

  return (
    <>
      <IntroModal />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.background }}>
        <Text size={TextSizes.L}>Home Screen</Text>
        <Button mode="contained">Test</Button>
        <IconButton icon="camera" mode="contained" />
        <Switch />
        <View style={{ height: 50, width: 300 }}>
          <TextInput label="Email" />
        </View>
        <View style={{height: 20, width: 20, backgroundColor: theme.colors.primary}} />
        <View style={{height: 20, width: 20, backgroundColor: theme.colors.secondary}} />
        <View style={{height: 20, width: 20, backgroundColor: theme.colors.tertiary}} />
        <Text>Theme Name: {themeName}</Text>
        <Button
          onPress={() => {
            setThemeName(themeName === "Light" ? "Dark" : "Light");
          }}
          disabled={false}
        >
          Toggle Theme
        </Button>
      </View>
    </>
  );
};

export default HomeScreen;
