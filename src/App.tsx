import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './navigation/navigation';
import { lightTheme, darkTheme } from './styles';
import { ThemeContext } from './contexts';

const App = () => {
  const [themeName, setThemeName] = useState("Light");
  // Will add custom contexts in here
  // Also all app-loading functionality (ex: Notification Registration)

  const theme = themeName === "Dark" ? darkTheme : lightTheme;
  
  const saveTheme = async(newThemeName) => {
    setThemeName(newThemeName);
    await AsyncStorage.setItem("themeName", newThemeName);
  }

  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        const currentTheme = await AsyncStorage.getItem("themeName");
        if (currentTheme) {
          setThemeName(currentTheme);
        }
      } catch(e) {
        console.log('error fetching current theme', e);
      }
    }
    
    fetchCurrentTheme();
  }, []);
  
  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: saveTheme }}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;