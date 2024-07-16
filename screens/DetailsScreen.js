import React, {useRef, useEffect, useContext, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import DayBox from '../components/DayBox.js';
import MonthBox from  '../components/MonthBox.js';
import styles from '../Styles.js';
import {formatDate, monthNumberToName, getDaysInMonth, getDayOfWeek } from '../Utils.js';
import UserContext from '../UserContext.js';
import {getNotes, getEvents} from '../firebaseConfig.js';


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
      console.log("Events " + dayEvents);
      eventsData[date] = dayEvents;
    }
    setEvents(eventsData);
  };


  useEffect(() => {
    // Reset y pos of vertical scroll to the top.
    if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }

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

    fetchNotes();

    fetchEvents();

  }, [month, year]); // Listens out for changes in month/year
  
  const monthName = monthNumberToName(month);

  const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  return (
      <ScrollView ref={scrollViewRef} style= {styles.monthScrollView}>
        <MonthBox month = {monthName}></MonthBox>

        <View style = {styles.grid}>
          {dayNums.map(dayNum => (
            <DayBox key={dayNum} 
            dayNum={dayNum} 
            dayOfWeek={getDayOfWeek(year, month, dayNum)}
            notes={notes[formatDate(new Date(year, month, dayNum))]}
            events = {events[formatDate(new Date(year, month, dayNum))]}
            date = {new Date(year, month, dayNum)}
            updateEvents = {fetchEvents}/>
          ))}
        </View>


      </ScrollView>


  );
};

export default DetailsScreen;
