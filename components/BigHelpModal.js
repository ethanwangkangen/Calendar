import React, {useEffect, useContext, useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, TouchableOpacity, Platform, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import styles from '../Styles.js';
import EventCreateBox from './EventCreateBox.js';
import { parseRecurringEvents, parseSingleEvent, getTimeArr, extractRecurrenceDay, convertTo12HourFormat } from '../chrono.js';
import UserContext from '../UserContext.js';
import {addEvent} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';
import RecurringEventCreateBox from './RecurringEventCreateBox.js';

const BigHelpModal = ({visible, onRequestClose}) => {
    return (
    
        <Modal
            visible = {visible}
            style = {{backgroundColor:"green"}}
            transparent = {true}
            animationType="slide">

            <TouchableWithoutFeedback onPress={onRequestClose}>
                    <View style = {{height: '25%'}}>
                    </View>
            </TouchableWithoutFeedback>

            <View style = {[styles.modalContent, {borderColor: "black", borderWidth: 2, borderRadius: 9, padding: 15, paddingTop: -5}]}>
                  <Text style ={{fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'center'}}> 
                  {'\n'}Guide{'\n'}
                  </Text>
                  <Text style ={{fontFamily: 'Montserrat-Medium.ttf', alignSelf: 'flex-start'}}> 
                    This calendar uses Natual Language Processing to 
                    <Text style ={{fontFamily: 'Montserrat-Bold.ttf', alignSelf: 'flex-start'}}> automate </Text> 
                    Event creation. {'\n'}{'\n'}
                    You can create 
                    <Text style ={{fontFamily: 'Montserrat-Bold.ttf', alignSelf: 'flex-start'}}> general </Text>  
                    events in the
                    <Text style ={{fontFamily: 'Montserrat-Bold.ttf', alignSelf: 'flex-start'}}> 
                        {' top left hand corner.'}</Text> 
                    {'\n'}If no date is specified, it is assumed 
                    to be today. {'\n'}{'\n'}
                    Eg:{'\n'}
                    &#8226; go shopping {'\n'}
                    &#8226; tmr 1pm lunch {'\n'}
                    &#8226; mon 3-5pm class {'\n'}
                    &#8226; next week 11pm movie {'\n'}
                    &#8226; 24 jul 3pm jog {'\n'}
                    &#8226; this fri test {'\n'} {'\n'} 

                    You can also create recurring events here. {'\n'} 
                    Note that the format for this is strict.{'\n'} 
                    &#8226; [____ to ____ every ___],  [(time), event]{'\n'} {'\n'} {'\n'} 

                    You can create events 
                    <Text style ={{fontFamily: 'Montserrat-Bold.ttf', alignSelf: 'flex-start'}}> for the day </Text>   
                    by clicking on the specific day's box. {'\n'} {'\n'} 
                    Specify the time period (if applicable), and the calendar
                    <Text style ={{fontFamily: 'Montserrat-Bold.ttf', alignSelf: 'flex-start'}}> 
                    {" sorts events"} </Text> 
                    based on their start time 
                    <Text style ={{fontFamily: 'Montserrat-Bold.ttf', alignSelf: 'flex-start'}}> 
                    {" automatically."}  </Text> {'\n'} {'\n'}
                    Eg:{'\n'}
                    &#8226; 3pm lesson{'\n'}
                    &#8226; 5-6pm shopping{'\n'}
                  </Text>

                </View>
        </Modal>
    );
}

export default BigHelpModal