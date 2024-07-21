import React, {useEffect, useContext, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';
import { parseRecurringEvents, parseSingleEvent, getTimeArr, extractRecurrenceDay, convertTo12HourFormat } from '../chrono.js';
import UserContext from '../UserContext.js';
import {addEvent} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';
import RecurringEventCreateBox from './RecurringEventCreateBox.js';
import HelpModal from './HelpModal.js';
import {auth} from '../firebaseConfig.js';

// Modal that pops up when clicking on a dayBox.
// This constitutes the whole screen, even the top transparent portion

const EventModal = ({ visible, onRequestClose, refreshEvents }) => {
    const { userState } = useContext(UserContext);
    const user = auth.currentUser;
    const [confirmedText, setConfirmedText] = useState('');

    const handleEvent = (eventDetails) => {
        let arr = parseSingleEvent(eventDetails);
        console.log(arr);
        try{
          addEvent(user.uid, formatDate(arr[1]), arr[0], arr[2] || null, arr[3] || null)
            //userId, date, eventDetails, timeStart, timeEnd
            const text = "Created event: \"" + arr[0] + "\" on " + 
              (arr[1].toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })) + " "
            if (arr[3]) {
              setConfirmedText(text + convertTo12HourFormat(arr[2]) + "-" + convertTo12HourFormat(arr[3]));
            } else if (arr[2]) {
              setConfirmedText(text + convertTo12HourFormat(arr[2]));
            } else {
              setConfirmedText(text);
            }
            
        refreshEvents();
        } catch (error) {
          console.log(error);
          setConfirmedText("Error, follow the format given.");
        }
            
        
    } 

    const handleRecurring = (timeWindow, eventDetails) => { //21 jul to 2 aug every sat, 1-3pm class
      try {
        let timeArray = getTimeArr(timeWindow); //21 jul to 2 aug every sat -> [21 jul, 2 aug]
        let day = extractRecurrenceDay(timeWindow); //21 jul to 2 aug every sat -> Saturday
        let dateArr = parseRecurringEvents(timeArray, day);
        console.log(timeArray);
        console.log(day);
        console.log(dateArr);
        let eventArr = parseSingleEvent(eventDetails);
        dateArr.map(date => addEvent(user.uid, formatDate(date), eventArr[0], eventArr[2] ||null, eventArr[3] ||null));

        const text = "Created recurring event every " + day + ": \"" + eventArr[0] + "\" from " + 
              (timeArray[0].toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })) + " to " +
              (timeArray[1].toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })) + " "
            if (eventArr[3]) {
              setConfirmedText(text + convertTo12HourFormat(eventArr[2]) + "-" + convertTo12HourFormat(eventArr[3]));
            } else if (eventArr[2]) {
              setConfirmedText(text + convertTo12HourFormat(eventArr[2]));
            } else {
              setConfirmedText(text);
            }

        refreshEvents();
      } catch (error) {
        console.log(error);
        setConfirmedText("Error, follow the format given.");
      }
      
    }

    const handleClose = () => {
      setConfirmedText('');
      onRequestClose();
    }

    const [helpVisible, setHelpVisible] = useState(false)
    const toggleHelpVisible = () => {
      console.log("help toggle");
      setHelpVisible(!helpVisible);
      console.log(helpVisible);
    };

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
      >
        <View style={[styles.modalOverlay,]}>
        
            <TouchableWithoutFeedback onPress={handleClose} style = {{height: '18%'}}>
                <View style={styles.eventModalTop}>
                    <Text style={{ color: 'white' }}>Blue View</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={[styles.modalContent, {borderColor: "black", borderWidth: 2, alignItems: "center"}]}>
                <View style = {{height: "2%"}}></View>
                <Text style = {{fontFamily: 'Montserrat-Medium.ttf'}}>Create a single event:</Text>
                <EventCreateBox isFocused = {true} handleEventCreation={handleEvent}/>
                <Text style = {{fontFamily: 'Montserrat-Medium.ttf'}}>Create a recurring event:</Text>
                <RecurringEventCreateBox isFocused = {false} handleEventCreation={handleRecurring}/>
                <Text style = {{fontFamily: 'Montserrat-Medium.ttf'}}>{confirmedText}</Text>

                <Pressable title = "help"
                          style = {{ width: "20%", backgroundColor: 'lightgrey', borderColor: "black", borderWidth: 2, 
                            borderRadius: 11, alignSelf: 'center'}}
                          onPress = {toggleHelpVisible}>
                            <Text style = {{color: "black", alignSelf: 'center', fontFamily: 'Montserrat-Medium.ttf'}}>{"Help"}</Text>
                </Pressable>

                <HelpModal visible = {helpVisible} onRequestClose={toggleHelpVisible}></HelpModal>

            </View>

            
        </View>
      </Modal>
    );
  };

export default EventModal;