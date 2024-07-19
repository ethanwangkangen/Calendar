import React, {useRef, useEffect, useContext, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DayBox from '../components/DayBox.js';
import MonthBox from  '../components/MonthBox.js';
import styles from '../Styles.js';
import {formatDate, monthNumberToName, getDaysInMonth, getDayOfWeek } from '../Utils.js';
import UserContext from '../UserContext.js';
import {getNotes, getEvents} from '../firebaseConfig.js';
import EventModal from '../components/EventModal.js';


// CalendarScreen shows detailsScreen. Swiping shows the next month's detailsScreen
const DetailsScreen = ({month, year}) => {
  const scrollViewRef = useRef(null);
  const { userState } = useContext(UserContext);
  const { user, email } = userState;

  const [notes, setNotes] = useState({}); // State to store notes
  const [events, setEvents] = useState({});
  // events, as retrieved from firebase, is an object. key = eventId, value = event

  const fetchEvents = async () => {
    const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);
    const eventsData = {};

    for (const dayNum of dayNums) {
      const date = formatDate(new Date(year, month, dayNum));
      const dayEvents = await getEvents(user.uid, date);
      eventsData[date] = dayEvents;
    }
    setEvents(eventsData);
  };

  const fetchNotes = async () => {
    const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);
    const notesData = {};

    for (const dayNum of dayNums) {
      const date = formatDate(new Date(year, month, dayNum));
      const dayNotes = await getNotes(user.uid, date);
      notesData[date] = dayNotes;
    }

    setNotes(notesData);
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  useEffect(() => {
    if (month == currentMonth) {
      scrollViewRef.current.scrollTo({ y: currentDay/3 * 60, animated: false });
    }
  }, [month])

  useEffect(() => {
    // Reset y pos of vertical scroll to the top.
    if (scrollViewRef.current && month!= currentMonth) {
          scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    fetchNotes();
    fetchEvents();
    console.log("month", month, monthNumberToName(month))
  }, [month, year]); // Listens out for changes in month/year
  
  const monthName = monthNumberToName(month);

  const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  const [eventModalVisible, setEventModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setEventModalVisible(!eventModalVisible);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top:2,
          left: 2,
          backgroundColor: 'lightgrey',
          padding: 9,
          borderRadius: 8,
          zIndex: 1,
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


      <EventModal visible = {eventModalVisible} onRequestClose = {toggleModalVisibility} refreshEvents = {fetchEvents}></EventModal>

      <MonthBox month = {monthName}></MonthBox>
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