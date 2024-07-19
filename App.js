import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailsScreen from './screens/DetailsScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import CalendarScreen from './screens/CalendarScreen.js';
import {UserProvider} from './UserContext.js';

const Stack = createStackNavigator();


const App = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  return (
    <UserProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Details" component={DetailsScreen}
          initialParams={{month: currentMonth, year: currentYear }
        } /> */}
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
