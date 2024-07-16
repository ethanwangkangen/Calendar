import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView  } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';

// Modal that pops up when clicking on a dayBox.
// This constitutes the whole screen, even the top transparent portion

const DayModal = ({notes, events, visible, onRequestClose, onNotesChange, onEventsChange, handleEventCreation }) => {
    
    const [localNotes, setLocalNotes] = useState(notes);
    const [localEvents, setLocalEvents] = useState(events);

    useEffect(() => {
        setLocalNotes(notes);
        setLocalEvents(events);
      }, [notes, events]);

    const handleSave = () => {
        onNotesChange(localNotes); // Pass the updated notes back to the parent (which is DayBox)
        onEventsChange(localEvents);
        onRequestClose();
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
                        <Text style={{ color: 'white' }}>Blue View</Text>
                    </View>
                </TouchableWithoutFeedback>
            

                <View style = {styles.touchableArea}> 
                    <ScrollView style = {styles.notesScrollView}>
                        <Text style={styles.modalText} >Notes</Text>
                        <TextInput 
                            style={styles.modalText} 
                            value={localNotes} 
                            onChangeText={setLocalNotes} 
                            />                    
                    </ScrollView>    

                    <ScrollView style = {styles.eventsScrollView}  contentContainerStyle={{alignItems: 'center'}}>
                        <Text style={styles.modalText} >Events</Text>
                        {/* <Text style = {{fontSize: 10,}}>{localNotes}</Text> */}

                        {localEvents && Object.keys(localEvents).length > 0 ? (
                            Object.keys(localEvents).map(eventId => (
                                
                                <TextInput
                                key={eventId}
                                style={{backgroundColor: '#fff',
                                    width: "100%",
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                    marginBottom: 10,
                                    color: '#000', // Black text color
                                    fontSize: 16,}}
                                value={localEvents[eventId].toString()  || "nothing"}
                                
                            />

                                    
                                ))
                            ) : (
                            <Text style ={{fontSize: 10}}>No events available</Text> // Optional: Show a message when there are no events
                         )}     

                        <EventCreateBox handleEventCreation = {handleEventCreation}></EventCreateBox>              

                    </ScrollView>
                
                </View>

            </View>
            </KeyboardAvoidingView>
        
        </Modal>
    );
};

export default DayModal;