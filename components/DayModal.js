import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput  } from 'react-native';
import styles from '../Styles.js';

// Modal that pops up when clicking on a dayBox.
// This constitutes the whole screen, even the top transparent portion

const DayModal = ({notes, events, visible, onRequestClose, onNotesChange }) => {
    
    const [localNotes, setLocalNotes] = useState(notes);
    useEffect(() => {
        setLocalNotes(notes);
      }, [notes]);
    const handleSave = () => {
        onNotesChange(localNotes); // Pass the updated notes back to the parent (which is DayBox)
        onRequestClose();
      };

    return (
        <Modal
            visible = {visible}
            onRequestClose={onRequestClose}
            transparent = {true}
            animationType="slide">
        
            <View style={styles.modalOverlay}>
                
                {/* Top transparent portion. Click here to exit modal */}
                <TouchableWithoutFeedback onPress={handleSave} style = {{height: '18%'}}>
                    <View style={styles.modalTop}>
                        <Text style={{ color: 'white' }}>Blue View</Text>
                    </View>
                </TouchableWithoutFeedback>
            

                <View style = {styles.touchableArea}> 
                    <ScrollView style = {{backgroundColor: "white", width: "100%", borderColor: "black", borderWidth: 1}}>
                        <Text> Events </Text>
                        <TextInput 
                            style={styles.modalText} 
                            value={events} 
                            //onChangeText
                            />                    
                    </ScrollView>

                    <ScrollView style = {{flex: 2, backgroundColor: "white", width: "100%", borderColor: "black", borderWidth: 1}}>
                        <Text> Notes</Text>
                        <TextInput 
                            style={styles.modalText} 
                            value={localNotes} 
                            onChangeText={setLocalNotes} 
                            />                    
                    </ScrollView>                    
                </View>

            </View>
        
        </Modal>
    );
};

export default DayModal;