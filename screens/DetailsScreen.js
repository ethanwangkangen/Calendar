import React, {useRef, useEffect, useContext, useState, useLayoutEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DayBox from '../components/DayBox.js';
import MonthBox from  '../components/MonthBox.js';
import styles from '../Styles.js';
import {formatDate, monthNumberToName, getDaysInMonth, getDayOfWeek } from '../Utils.js';
import UserContext from '../UserContext.js';
import {getNotes, getEvents, getLocalEvents, getLocalNotes} from '../firebaseConfig.js';
import EventModal from '../components/EventModal.js';
import ExitModal from '../components/ExitModal.js';
import { auth } from '../firebaseConfig.js'; 
import { Picker, DatePicker } from 'react-native-wheel-pick';
import { set } from 'firebase/database';

// CalendarScreen shows detailsScreen. Swiping shows the next month's detailsScreen
const DetailsScreen = ({month, year, setMonth, setYear}) => {
  const scrollViewRef = useRef(null);
  const [notes, setNotes] = useState({}); // State to store notes
  const [events, setEvents] = useState({});
  // events, as retrieved from firebase, is an object. key = eventId, value = event

  const user = auth.currentUser; // if not signed in, evaluates to null
  const [firstRendered, setFirstRendered] = useState(false);

  const fetchEvents = async () => {
    const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);
    const eventsData = {};

    for (const dayNum of dayNums) {
      const date = formatDate(new Date(year, month, dayNum));
      //const dayEvents = await getEvents(user.uid, date);
      const dayEvents = await getLocalEvents(date);
      getLocalEvents
      eventsData[date] = dayEvents;
    }
    setEvents(eventsData);
  };

  const fetchNotes = async () => {
    const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);
    const notesData = {};

    for (const dayNum of dayNums) {
      const date = formatDate(new Date(year, month, dayNum));
      //const dayNotes = await getNotes(user.uid, date);
      const dayNotes = await getLocalNotes(user.uid, date);
      notesData[date] = dayNotes;
    }

    setNotes(notesData);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (month === currentMonth && scrollViewRef.current && !firstRendered) {
  //       scrollViewRef.current.scrollTo({ y: (currentDay / 3) * 60, animated: false });
  //       setFirstRendered(true);
  //     }
  //   }, 100); // Delay to ensure layout is rendered
  
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    // Reset y pos of vertical scroll to the top.
    if (scrollViewRef.current && month!= currentMonth) {
          scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    fetchNotes();
    fetchEvents();
    console.log("month", month, monthNumberToName(month))
  }, [month, year, user]); // Listens out for changes in month/year
  
  const monthName = monthNumberToName(month);

  const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  const [eventModalVisible, setEventModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setEventModalVisible(!eventModalVisible);
  };

  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const toggleQuitModalVisibility = () => {
    setQuitModalVisible(!quitModalVisible);
  };

  return (
    <View style = {{backgroundColor:"white"}}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top:1.3,
          left: 1.2,
          backgroundColor: 'gainsboro',
          padding: 9,
          borderRadius: 8,
          zIndex: 2,
          borderColor: "black",
          borderWidth: 1,
        }}
        onPress={() => {
          // Handle button press
          setEventModalVisible(true);
        }}
      >
        <Text style={{ color: 'black' }}>  +  </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: 'absolute',
          top:1.3,
          right: 1.2,
          backgroundColor: 'gainsboro',
          padding: 9,
          borderRadius: 8,
          zIndex: 2,
          borderColor: "black",
          borderWidth: 1,
        }}
        onPress={() => {
          // Handle button press
          setQuitModalVisible(true);
        }}
      >
        <Text style={{ color: 'black' }}>  x  </Text>
      </TouchableOpacity>

      <EventModal visible = {eventModalVisible} onRequestClose = {toggleModalVisibility} refreshEvents = {fetchEvents}></EventModal>
      <ExitModal visible = {quitModalVisible}  onRequestClose = {toggleQuitModalVisibility}></ExitModal>

      
      <MonthBox monthName = {monthName} setMonth = {setMonth} setYear = {setYear}></MonthBox>


      <ScrollView ref={scrollViewRef} style= {styles.monthScrollView}>
      
        <View style = {styles.grid}>
          {dayNums.map(dayNum => (
            <DayBox key={dayNum} 
            dayNum={dayNum} 
            dayOfWeek={getDayOfWeek(year, month, dayNum)}
            notes={notes[formatDate(new Date(year, month, dayNum))]}
            events = {events[formatDate(new Date(year, month, dayNum))]}
            date = {new Date(year, month, dayNum)}
            updateEvents = {fetchEvents}
            isToday = {new Date(year, month, dayNum).toDateString() === new Date().toDateString()}/>
          ))}
        </View>

      </ScrollView>

      

      </View>

  );
};

export default DetailsScreen;