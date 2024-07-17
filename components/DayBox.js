import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet,  TouchableOpacity} from 'react-native';
import styles from '../Styles.js';
import DayModal from './DayModal.js';
import UserContext from '../UserContext.js';
import {updateNotes, addEvent, updateAllEvents} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';


// The small day box that shows date, M for monday, and summary of the notes and events.
// Used in detailsScreen

const DayBox = ({ dayNum, dayOfWeek, notes, events, date, updateEvents, isToday }) => {
  const { userState } = useContext(UserContext);
  const { user, email } = userState;

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const [localNotes, setLocalNotes] = useState('');
  const handleNotesChange = (newNotes) => {
    if (newNotes != null) {
      setLocalNotes(newNotes); // local
      updateNotes(user.uid, formatDate(date), newNotes); // firebase
    }
  };

  const [localEvents, setLocalEvents] = useState({});
  // localEvents, as well as events (received from DetailsScreen), is an object with k-v pair: k = eventId, v = event
  const handleEventsChange = (newEvents) => {
    if (newEvents != null) {
      setLocalEvents(newEvents); // local
      //update firebase events
      updateAllEvents(user.uid, formatDate(date), newEvents);
    }
  };

  const handleEventCreation = async (eventDetails) => {
    addEvent(user.uid, formatDate(date), eventDetails);
    updateEvents();
  };

  useEffect(() => {
    setLocalNotes(notes);
    }, [notes]);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);


  const [isTodayLocal, setIsToday] = useState(isToday);

  useEffect(() => {
    setIsToday(isToday);
    if (isToday) {
      console.log("isToday set to true");
    }
  }, [isToday]);

  
  const MAX_NEWLINES = 3;
  const MAX_EVENTS_DISPLAY = 5;
  let EXTRA = 0;

  const truncateNotes = (no, maxNewlines) => {
      if (no == null) return '';
      const lines = no.split('\n');
      if (lines.length > maxNewlines) {
        return lines.slice(0, maxNewlines).join('\n') + ' ...';
      } else {
        EXTRA = 3 - lines.length;
      }
      return no;
  };


  return (
    <TouchableOpacity style = {isTodayLocal ? styles.highlightedDayBox:styles.dayBox} onPress={toggleModalVisibility} activeOpacity={1}>

      <View style = {{flexDirection:"row", width: "100%", }}>
        <View style = {{flex: 2, justifyContent: 'center', padding: 2, marginLeft: 2}} ><Text>{dayNum}</Text></View>
        <View style = {{flex: 1, alignItems: 'flex-end', padding: 2, marginRight: 3}}><Text>{dayOfWeek}</Text></View>

      </View>

      <View style = {{padding: 2, alignSelf:'flex-start', width: "100%"}}>
        <Text style = {{fontSize: 10,}}>{truncateNotes(localNotes, MAX_NEWLINES)}</Text>
        {localEvents && Object.keys(localEvents).length > 0 ? (
          Object.keys(localEvents).map((eventId, index) => (
            // Render only up to a certain number of events, show '...' for excess
            index < (MAX_EVENTS_DISPLAY + EXTRA) ? (
                <Text key={eventId} style={{ fontSize: 10 }}> &#8226; {localEvents[eventId]} </Text>
            ) : index === (MAX_EVENTS_DISPLAY + EXTRA) ? (
              <Text key="ellipsis" style={{ fontSize: 10 }}> ... </Text>
            ) : null
          ))
        ) : null}
      </View>

      <DayModal
          visible={modalVisible}
          onRequestClose={toggleModalVisibility}
          notes = {notes}
          events = {events}
          onNotesChange={handleNotesChange} // Pass the handler to the modal
          onEventsChange = {handleEventsChange}
          handleEventCreation = {handleEventCreation}
        />

    </TouchableOpacity >
  );
};

export default DayBox;