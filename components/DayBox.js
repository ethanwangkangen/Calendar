import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet,  TouchableOpacity} from 'react-native';
import styles from '../Styles.js';
import DayModal from './DayModal.js';
import UserContext from '../UserContext.js';
import {updateNotes, addEvent, updateAllEvents} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';
import {parseTimes, formatDetails} from '../chrono.js';


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
    try {
      let arr = parseTimes(eventDetails);
      addEvent(user.uid, formatDate(date), formatDetails(eventDetails), arr[0] || null, arr[1] ||null); //placeholder time
      updateEvents();
    } catch (error) {
      console.log(error);
    }
    
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
  }, [isToday]);

  
  const MAX_NEWLINES = 4;
  const MAX_EVENTS_DISPLAY = 6;
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

  const truncateEvent = (input) => {
    max = 18
    if (input.length > 18) {
      return input.substring(0, 18) + "..";
    } 
    return input;
  }


  return (
    <TouchableOpacity style = {isTodayLocal ? styles.highlightedDayBox:styles.dayBox} onPress={toggleModalVisibility} activeOpacity={1}>

      <View style = {{flexDirection:"row", width: "100%", }}>
        <View style = {{flex: 2, justifyContent: 'center', padding: 2, marginLeft: 2}} >
          <Text style = {{fontFamily: 'Montserrat-Bold.ttf'}}>{dayNum}</Text>
        </View>

        {dayOfWeek == "MON" ? (
          <View style = {{flex: 1.4, alignItems: 'flex-end', padding: 2, marginRight: 3}}>
            <Text  style = {{fontFamily: 'Montserrat-Medium.ttf'}}>* {dayOfWeek}</Text>
          </View>) : 

          (<View style = {{flex: 1, alignItems: 'flex-end', padding: 2, marginRight: 3}}>
            <Text  style = {{fontFamily: 'Montserrat-Medium.ttf'}}>{dayOfWeek}</Text>
          </View>)}
        

      </View>

      <View style = {{padding: 2, alignSelf:'flex-start', width: "100%"}}>
        <Text style = {{fontSize: 9, margin: -1, marginLeft: 1, fontFamily: 'Montserrat-Medium.ttf'}}>{truncateNotes(localNotes, MAX_NEWLINES)}</Text>

        {localEvents && Object.keys(localEvents).length > 0 ? (
          Object.keys(localEvents).map((eventId, index) => (
            // Render only up to a certain number of events, show '...' for excess
            index < (MAX_EVENTS_DISPLAY + EXTRA) ? (
                <Text numberOfLines={1} ellipsizeMode="tail" key={eventId} 
                style={{ fontSize: 9, margin: -1, fontFamily: 'Montserrat-Medium.ttf'}}> &#8226; {localEvents[eventId].details} </Text>
            ) : index === (MAX_EVENTS_DISPLAY + EXTRA) ? (
              <Text key="ellipsis" style={{ fontSize: 9, margin: -1 }}> ... </Text>
            ) : null
          ))
        ) : null}

      </View>

      <DayModal
          visible={modalVisible}
          onRequestClose={toggleModalVisibility}
          date = {date}
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