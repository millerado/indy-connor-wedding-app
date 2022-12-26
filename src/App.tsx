import { View } from 'react-native';
import { Text, Button, Divider, IconButton, Switch, TextInput } from './components';
import { Provider as PaperProvider } from 'react-native-paper';
import { lightTheme, darkTheme } from './styles';

const App = () => {
  return (
    <PaperProvider theme={lightTheme}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Hi Indy!</Text>
        <Button mode='contained'>Test</Button>
        <Divider />
        <IconButton icon="camera" mode='contained' />
        <Switch />
        <TextInput label="Email" value={'text'} />
      </View>
    </PaperProvider>
  );
};

export default App;