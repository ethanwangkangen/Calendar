import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailsScreen from './screens/DetailsScreen.js';

import createTables from './DatabaseHandler.js';

const Stack = createStackNavigator();

const App = () => {
  createTables();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen}
          initialParams={{month: "June", year: 2024 }
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
