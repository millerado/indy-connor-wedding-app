import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './navigation/navigation';
import { lightTheme, darkTheme } from './styles';

const App = () => {
  // Will add custom contexts in here
  // Also all app-loading functionality (ex: Notification Registration)
  
  return (
    <NavigationContainer>
      <PaperProvider theme={lightTheme}>
        <Navigation />
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;