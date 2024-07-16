import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet,  TouchableOpacity} from 'react-native';
import styles from '../Styles.js';
import DayModal from './DayModal.js';
import UserContext from '../UserContext.js';
import {updateNotes, addEvent} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';


// The small day box that shows date, M for monday, and summary of the notes and events.
// Used in detailsScreen

const DayBox = ({ dayNum, dayOfWeek, notes, events, date, updateEvents }) => {
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
    }
  };

  const handleEventCreation = async (eventDetails) => {
    addEvent(user.uid, formatDate(date), eventDetails);
    updateEvents();
  };

  useEffect(() => {
    setLocalNotes(notes);
    setLocalEvents(events);
  }, [notes, events]);

  return (
    <TouchableOpacity style = {styles.dayBox} onPress={toggleModalVisibility} activeOpacity={1}>

      <View style = {{flexDirection:"row", width: "100%", }}>
        <View style = {{flex: 2, justifyContent: 'center'}} ><Text>{dayNum}</Text></View>
        <View style = {{flex: 1, justifyContent: 'flex-end',}}><Text>{dayOfWeek}</Text></View>
      </View>

      <View style = {{padding: 2, alignSelf:'flex-start', width: "100%"}}>
        <Text style = {{fontSize: 10,}}>{localNotes}</Text>
        {localEvents && Object.keys(localEvents).length > 0 ? (
            Object.keys(localEvents).map(eventId => (
              <Text key={eventId} style ={{fontSize: 10}}>{localEvents[eventId]}</Text>
            ))
           ) : (
            <Text style ={{fontSize: 10}}>No events available</Text> // Optional: Show a message when there are no events
  )}
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