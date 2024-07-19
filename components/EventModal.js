import React, {useEffect, useContext, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';
import { parseSingleEvent } from '../chrono.js';
import UserContext from '../UserContext.js';
import {addEvent} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';

// Modal that pops up when clicking on a dayBox.
// This constitutes the whole screen, even the top transparent portion

const EventModal = ({ visible, onRequestClose, refreshEvents }) => {
    const { userState } = useContext(UserContext);
    const { user, email } = userState;

    const handleEvent = (eventDetails) => {
        let arr = parseSingleEvent(eventDetails);
        console.log(arr);
        if (arr != null && arr[1] !=null) {
            addEvent(user.uid, formatDate(arr[1]), arr[0], arr[2] || null, arr[3] || null)
        refreshEvents();
        }
        
    } 

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
      >
        <View style={[styles.modalOverlay,]}>
        
            <TouchableWithoutFeedback onPress={onRequestClose} style = {{height: '18%'}}>
                <View style={styles.eventModalTop}>
                    <Text style={{ color: 'white' }}>Blue View</Text>
                </View>
            </TouchableWithoutFeedback>

            <View style={[styles.modalContent, {borderColor: "black", borderWidth: 2, alignItems: "center"}]}>
                <View style = {{height: "8%"}}></View>
                <EventCreateBox style = {{backgroundColor: "green"}} isFocused = {true} handleEventCreation={handleEvent}/>
            </View>

        </View>
      </Modal>
    );
  };

export default EventModal;