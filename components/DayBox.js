import React, {useState} from 'react';
import { View, ScrollView, Text, StyleSheet,  TouchableOpacity} from 'react-native';
import styles from '../Styles.js';
import DayModal from './DayModal.js';

// Custom DayBox Component
const DayBox = ({ dayNum }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const [notes, setNotes] = useState("notes placeholder");

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
  };

  return (
    <TouchableOpacity style = {styles.dayBox} onPress={toggleModalVisibility} activeOpacity={1}>

      <View style = {{flexDirection:"row", borderColor: "red", borderWidth: 1, alignSelf:'flex-start'}}>
        <Text>{dayNum}</Text>
      </View>

      <View style = {{borderColor: "green", borderWidth: 1, alignSelf:'flex-start', width: "100%"}}>
        <Text style = {{fontSize: 8,}}>{notes}</Text>
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