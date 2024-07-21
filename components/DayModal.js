import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';
import {parseTimes, formatDetails} from '../chrono.js';
import {auth} from '../firebaseConfig.js';
// Modal that pops up when clicking on a dayBox.
// This constitutes the whole screen, even the top transparent portion

const DayModal = ({notes, events, visible, onRequestClose, onNotesChange, onEventsChange, handleEventCreation, date }) => {
    
    const [localNotes, setLocalNotes] = useState(notes);
    const [localEvents, setLocalEvents] = useState(events);

    const [tempText, setTempText] = useState({});

    useEffect(() => {
        setLocalNotes(notes);
        }, [notes]);
    
    useEffect(() => {
        setLocalEvents(events);
      }, [events]);
    

    const handleSave = () => {
        onNotesChange(localNotes); // Pass the updated notes back to the parent (which is DayBox)
        onEventsChange(localEvents);
        onRequestClose();
      };

    const handleTempTextChange = (eventId, text) => {
        setTempText(prevTempText => ({
          ...prevTempText,
          [eventId]: text,
        }));
      };

    const handleEventChange = (eventId, text) => {
        const arr = parseTimes(tempText[eventId]);
        setLocalEvents(prevEvents => {
          const updatedEvents = {
            ...prevEvents,
            [eventId]: {
              ...prevEvents[eventId],
              details: formatDetails(tempText[eventId]) || '',
              timeStart: arr[0] || null,
              timeEnd: arr[1] || null,
            },
          };
          onEventsChange(updatedEvents); // setLocalEvents is async, so i need to onEventsChange within it if not wont be updated
          return updatedEvents;
        });
      };

      const deleteEvent = (eventId) => {
        // Filter out the event with the specified eventId from localEvents
        const updatedEvents = { ...localEvents };
        delete updatedEvents[eventId];
        setLocalEvents(updatedEvents);
        onEventsChange(updatedEvents);
      };

      const handleKeyPress = ({ nativeEvent }) => {
        if (nativeEvent.key === 'Enter') {
            setLocalNotes(localNotes + '\n'); // Append newline character to the text
        }
      };
    


    return (
        <Modal
            visible = {visible}
            onRequestClose={onRequestClose}
            transparent = {true}
            animationType="slide">
        
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}> 
        
            <View style={styles.modalOverlay}>
                
                {/* Top transparent portion. Click here to exit modal */}
                <TouchableWithoutFeedback onPress={handleSave} style = {{height: '18%'}}>
                    <View style={styles.modalTop}>
                    </View>
                </TouchableWithoutFeedback>
            

                <View style = {styles.touchableArea}> 
                    <View style = {{borderColor: "black", borderWidth: 2, width: "35%", 
                        alignItems: "center", borderRadius: 9, backgroundColor: "white",marginBottom: .5}}>

                        <Text style = {{fontFamily: 'Montserrat-Medium.ttf'}}>
                            {date.toDateString()}
                        </Text>
                    </View>
                    <ScrollView style = {styles.notesScrollView}>
                    <Text style={[styles.modalText, {alignSelf: 'center',}]}>Notes</Text>
                            <TextInput 
                            style={[styles.modalText, {flexGrow: 1, height: "100%", paddingBottom: 20 }]} 
                            multiline={true}
                            value={localNotes} 
                            onChangeText={setLocalNotes} 
                            onKeyPress = {handleKeyPress}
                            />      
                                      
                    </ScrollView>    

                    <ScrollView style = {styles.eventsScrollView}  contentContainerStyle={{alignItems: 'center'}}>
                        <Text style={styles.modalText} >Events</Text>
                        {/* <Text style = {{fontSize: 10,}}>{localNotes}</Text> */}

                        {localEvents && Object.keys(localEvents).length > 0 ? (
                            Object.keys(localEvents).map(eventId => (
                                <View key={eventId} 
                                    style={styles.eventCreationBox}>
                                    <View style = {{flex: 8, borderColor: "lightgrey", borderWidth: 2, borderRadius: 11, marginRight: 3}}>
                                        <TextInput
                                            value={tempText[eventId] || localEvents[eventId].details.toString()}
                                            onChangeText={text => handleTempTextChange(eventId, text)}
                                            onBlur={() => handleEventChange(eventId)}
                                            style = {{padding: 2, fontFamily: 'Montserrat-Medium.ttf'}}
                                            
                                            />
                                    </View>
                                    
                                    <Pressable title = "del"
                                        style = {{flex: 1, backgroundColor: 'red', borderRadius: 11, alignSelf: 'center', padding: 2, paddingLeft: 1, fontFamily: 'Montserrat-Medium.ttf'}}
                                        onPress = {() => { 
                                            deleteEvent(eventId);
                                        }}>
                                        <Text style = {{color: "white", alignSelf: 'center'}}>{"Del"}</Text>
                                    </Pressable>
                                </View>
                                
                                    
                                ))
                            ) : (
                            null
                         )}     

                        <EventCreateBox handleEventCreation = {handleEventCreation} isFocused = {false}></EventCreateBox>              

                    </ScrollView>
                
                </View>

            </View>
            </KeyboardAvoidingView>
        
        </Modal>
    );
};

export default DayModal;