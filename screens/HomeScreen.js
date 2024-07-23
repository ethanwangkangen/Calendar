import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import UserContext from '../UserContext.js';

const HomeScreen = ({ navigation }) => {
  const { userState } = useContext(UserContext);
  const { user, email } = userState;
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>

      <Button
        title="Go to Calendar"
        onPress={() => navigation.navigate('Calendar')}
      />
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />

    </View>
  );
};

export default HomeScreen;
