import React, {useEffect, useContext, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';
import { parseRecurringEvents, parseSingleEvent, getTimeArr, extractRecurrenceDay, convertTo12HourFormat } from '../chrono.js';
import UserContext from '../UserContext.js';
import {addEvent} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';
import RecurringEventCreateBox from './RecurringEventCreateBox.js';

const HelpModal = ({visible, onRequestClose}) => {
    return (
    
        <Modal
            visible = {visible}
            style = {{backgroundColor:"green"}}
            transparent = {true}
            animationType="slide">

            <TouchableWithoutFeedback onPress={onRequestClose}>
                    <View style = {{height: '60%'}}>
                    </View>
            </TouchableWithoutFeedback>

            <View style = {[styles.modalContent, {borderColor: "black", borderWidth: 2, borderRadius: 9, padding: 15, paddingTop: -5}]}>
                  <Text style ={{fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center'}}> 
                    {'\n'}
                    Accepted formats:

                  </Text>
                  <Text style ={{fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'flex-start'}}> 
                    Single event:{'\n'}
                    &#8226; go shopping {'\n'}
                    &#8226; tmr 1pm lunch {'\n'}
                    &#8226; mon 3-5pm class {'\n'}
                    &#8226; next week 11pm movie {'\n'}
                    &#8226; 24 jul 3pm jog {'\n'}
                    &#8226; this fri test {'\n'} {'\n'} 
                    * [date] and [time (if applicable)] should be together {'\n'}
                    * if no date, assumed to be today. {'\n'} 
                  </Text>
                  <Text style ={{fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'flex-start'}}> 
                    Recurring event:{'\n'}
                    &#8226; [____ to ____ every ___],  [(time), event]{'\n'}
                  </Text>
                </View>
        </Modal>
    );
}

export default HelpModal