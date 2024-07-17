import React, {useState} from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import styles from '../Styles.js';

// Box to CREATE event
const EventCreateBox = ({handleEventCreation, handleSave}) => {
  const [eventDetails, setEventDetails] = useState('');

  return (
    <View style={[styles.eventCreationBox, {marginBottom: 50}]}>
      <View style = {{flex: 8, borderColor: "black", borderWidth: 2, borderRadius: 11, marginRight: 3}}>
        <TextInput value={eventDetails} 
                  onChangeText={setEventDetails}
                  placeholder="Create an event:"
                  placeholderTextColor="#888"
                  style = {{padding: 2}}
                  >
                </TextInput>
      </View>
      

      <Pressable title = "Create"
              style = {{flex: 1, backgroundColor: 'limegreen', borderRadius: 11, padding: 2, paddingLeft: 1}}
              onPress = {() => { 
                handleEventCreation(eventDetails);
                setEventDetails('');
              }}>
          <Text style = {{color: "white", alignSelf: 'center'}}>{"Add"}</Text>
      </Pressable>

    </View>
    
  );
};

export default EventCreateBox;