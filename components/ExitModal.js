import React, {useEffect, useContext, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';
import { parseRecurringEvents, parseSingleEvent, getTimeArr, extractRecurrenceDay, convertTo12HourFormat } from '../chrono.js';
import UserContext from '../UserContext.js';
import {addEvent} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';
import BigHelpModal from './BigHelpModal.js';
import RecurringEventCreateBox from './RecurringEventCreateBox.js';
import { auth } from '../firebaseConfig.js'; 
import { useNavigation } from '@react-navigation/native';


const ExitModal = ({visible, onRequestClose}) => {
    const navigation = useNavigation();
    const logout = async () => {
        onRequestClose();
        await auth.signOut();
        navigation.navigate('Login');       
    }

    const [helpVisible, setHelpVisible] = useState(false)
    const toggleHelpVisible = () => {
      console.log("help toggle");
      setHelpVisible(!helpVisible);
      console.log(helpVisible);
    };

    return (
    
        <Modal
            visible = {visible}
            style = {{backgroundColor:"green"}}
            transparent = {true}
            animationType="slide">

            <TouchableWithoutFeedback onPress={onRequestClose}>
                    <View style = {{height: '30%'}}>
                    </View>
            </TouchableWithoutFeedback>

            <View style = {[styles.modalContent, {borderColor: "black", borderWidth: 2, borderRadius: 9, padding: 15, paddingTop: -5}]}>
            <TouchableOpacity
                style={{
                marginTop: 30,
                backgroundColor: 'gainsboro',
                padding: 9,
                borderRadius: 8,
                zIndex: 2,
                borderColor: "black",
                borderWidth: 1,
                }}
                onPress={logout}
            >
                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>  Logout  </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                marginTop: 30,
                backgroundColor: 'gainsboro',
                padding: 9,
                borderRadius: 8,
                zIndex: 2,
                borderColor: "black",
                borderWidth: 1,
                }}
                onPress={toggleHelpVisible}
            >
                <Text style={{ fontSize: 20, color: 'black', fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center' }}>  Help  </Text>
            </TouchableOpacity>

            <BigHelpModal visible = {helpVisible} onRequestClose={toggleHelpVisible}></BigHelpModal>
                
            </View>
        </Modal>
    );
}

export default ExitModal