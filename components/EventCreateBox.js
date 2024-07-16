import React, {useState} from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import styles from '../Styles.js';

// Box to CREATE event
const EventCreateBox = ({handleEventCreation}) => {
  const [eventDetails, setEventDetails] = useState('');

  return (
    <View style = {styles.eventBox}>
      <TextInput value={eventDetails} 
                  onChangeText={setEventDetails}
                  placeholder="Create an event:"
                  placeholderTextColor="#888"
                  style = {{flex: 1, borderColor: "black", borderWidth: 2, borderRadius: 11,}}>
                </TextInput>

      <Pressable title = "Create"
              style = {{backgroundColor: 'limegreen', borderRadius: 11, alignSelf: 'flex-end', padding: 2, paddingLeft: 1}}
              onPress = {() => { 
                handleEventCreation(eventDetails);
                setEventDetails('');
              }}>
          <Text style = {{color: "white"}}>{" Add "}</Text>
      </Pressable>

    </View>
    
  );
};

export default EventCreateBox;