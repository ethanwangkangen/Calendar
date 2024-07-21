import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailsScreen from './screens/DetailsScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import CalendarScreen from './screens/CalendarScreen.js';
import {UserProvider} from './UserContext.js';
import * as Font from 'expo-font';
import { auth } from './firebaseConfig.js'; 
const Stack = createStackNavigator();


const App = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Signup/Login'); // State to manage initial route


  const checkAuthStatus = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setInitialRoute('Calendar');
      } else {
        setInitialRoute('Signup/Login');
      }
      setIsReady(true);
    });
    
  };

  const loadFonts = async () => {
    await Font.loadAsync({
      'Montserrat-Black.ttf': require('./assets/fonts/Montserrat-Black.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-SemiBold.ttf': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Bold.ttf': require('./assets/fonts/Montserrat-Bold.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Light.ttf': require('./assets/fonts/Montserrat-Light.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Medium.ttf': require('./assets/fonts/Montserrat-Medium.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Thin.ttf': require('./assets/fonts/Montserrat-Thin.ttf'),
    });
    await Font.loadAsync({
      'Montserrat-Regular.ttf': require('./assets/fonts/Montserrat-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
    checkAuthStatus();
  }, []);

  const [isReady, setIsReady] = useState(false); // State to track when auth and fonts are ready


  if (!fontsLoaded || !isReady) {
    return null; // or a loading indicator
  }

  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Calendar" component={CalendarScreen}
          initialParams={{month: currentMonth, year: currentYear }
        } />
        <Stack.Screen name = "Signup/Login" component = {LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
    
  );
};

export default App;
