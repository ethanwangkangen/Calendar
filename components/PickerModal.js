import React, {useState, useEffect} from 'react';
import { View, Modal, TouchableWithoutFeedback,  } from 'react-native';
import styles from '../Styles.js';
import { Picker, DatePicker } from 'react-native-wheel-pick';
// import DatePicker from 'react-native-date-picker'

const PickerModal = ({visible, onRequestClose, setMonth, setYear}) => {
    const [localDate, setLocalDate] = useState(new Date());

    useEffect(() => {
        setLocalDate(new Date());
    }, [visible])

    const handleSave = () => {
        if (localDate != null) {
            setMonth(localDate.getMonth());
            setYear(localDate.getFullYear());
            onRequestClose();
        }
    }

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="slide"
    >
      <View style={[styles.modalOverlay, {animationType: "none"}]}>

        <TouchableWithoutFeedback onPress={(event) => {
          event.persist();
          handleSave();
        }} style={{height: '18%'}}>
          <View style={styles.modalTop}></View>
        </TouchableWithoutFeedback>


        <View style={[styles.touchableArea, ]}>
          <DatePicker
                style={{ backgroundColor: 'dimgrey', width: "100%"}} 
                onDateChange={date => { setLocalDate(date) }}
                textStyle = {{fontFamily: 'Montserrat-Medium.ttf'}}
                />
        </View>

        <TouchableWithoutFeedback onPress={(event) => {
          event.persist();
          handleSave();
        }} style={{height: '18%'}}>
          <View style={styles.modalTop}></View>
        </TouchableWithoutFeedback>

      </View>
    </Modal>
  );
};

export default PickerModal;
