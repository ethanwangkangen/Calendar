import React, {useState, useContext, useEffect} from 'react';
import { View, ScrollView, Text, StyleSheet,  TouchableOpacity} from 'react-native';
import styles from '../Styles.js';
import DayModal from './DayModal.js';
import UserContext from '../UserContext.js';
import {updateNotes} from '../firebaseConfig.js';
import {formatDate} from '../Utils.js';


// The small day box that shows date, M for monday, and summary of the notes and events.
// Used in detailsScreen

const DayBox = ({ dayNum, dayOfWeek, notes, date }) => {
  const { userState } = useContext(UserContext);
  const { user, email } = userState;

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const [localNotes, setLocalNotes] = useState('');
  
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleNotesChange = (newNotes) => {
    if (newNotes != null) {
      setLocalNotes(newNotes); // local
      updateNotes(user.uid, formatDate(date), newNotes); // firebase
    }
  };

  return (
    <TouchableOpacity style = {styles.dayBox} onPress={toggleModalVisibility} activeOpacity={1}>

      <View style = {{flexDirection:"row", width: "100%", }}>
        <View style = {{flex: 2, justifyContent: 'center'}} ><Text>{dayNum}</Text></View>
        <View style = {{flex: 1, justifyContent: 'flex-end',}}><Text>{dayOfWeek}</Text></View>
      </View>

      <View style = {{borderColor: "green", borderWidth: 1, alignSelf:'flex-start', width: "100%"}}>
        <Text style = {{fontSize: 8,}}>{localNotes}</Text>
      </View>

      <DayModal
          visible={modalVisible}
          onRequestClose={toggleModalVisibility}
          notes = {notes}
          onNotesChange={handleNotesChange} // Pass the handler to the modal
        />

    </TouchableOpacity >
  );
};

export default DayBox;