import React, {useState} from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button, Pressable } from 'react-native';
import styles from '../Styles.js';

// Box to CREATE event
const RecurringEventCreateBox = ({handleEventCreation, isFocused}) => {
    const [timeWindow, setTimeWindow] = useState({});  
    // eg. "1 jul to 21 aug every Sat" 

    const [eventDetails, setEventDetails] = useState(''); 
    // eg. "1pm - 3pm class" -> use parseSingleEvent() to get details, startTime, endTime
    return (
        <View style={[styles.eventCreationBox, {marginBottom: 20}]}>
        <View style = {{flex: 7, borderColor: "black", borderWidth: 2, borderRadius: 11, marginRight: 3}}>
            <TextInput value={timeWindow} 
                    onChangeText={setTimeWindow}
                    placeholder="eg.1 jul to 21 aug every Sat"
                    placeholderTextColor="#888"
                    style = {{padding: 2, fontFamily: 'Montserrat-Medium.ttf'}}
                    autoFocus = {isFocused}
                    >
                    </TextInput>
            
        </View>

        <View style = {{flex: 4, borderColor: "black", borderWidth: 2, borderRadius: 11, marginRight: 3}}>
            <TextInput value={eventDetails} 
                    onChangeText={setEventDetails}
                    placeholder="eg.1pm class"
                    placeholderTextColor="#888"
                    style = {{padding: 2, fontFamily: 'Montserrat-Medium.ttf'}}
                    autoFocus = {isFocused}
                    >
                    </TextInput>
            
        </View>
        

        <Pressable title = "Create"
                style = {{flex: 1.4, backgroundColor: 'limegreen', borderRadius: 11, padding: 2, paddingLeft: 1}}
                onPress = {() => { 
                    handleEventCreation(timeWindow, eventDetails);
                    setEventDetails('');
                    setTimeWindow('');
                }}>
            <Text style = {{color: "white", alignSelf: 'center', fontFamily: 'Montserrat-Medium.ttf'}}>{"Add"}</Text>
        </Pressable>

        </View>
        
    );
};

export default RecurringEventCreateBox;