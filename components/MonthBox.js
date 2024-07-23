import React, {useState} from 'react';
import { View, Text } from 'react-native';
import styles from '../Styles.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PickerModal from './PickerModal.js';

const MonthBox = ({monthName, setMonth, setYear }) => {
  const [pickerVisible, setPickerVisible] = useState(false);

  const togglePickerVisible = () => {
    setPickerVisible(!pickerVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={togglePickerVisible}>
        <View style={styles.monthBox}>
          <Text style={{fontSize: 30, fontFamily: 'Montserrat-Bold.ttf'}}>{monthName}</Text>
        </View>
      </TouchableOpacity>

      <PickerModal visible={pickerVisible} onRequestClose={togglePickerVisible} setMonth = {setMonth} setYear = {setYear}/>
    </View>
  );
};

export default MonthBox;
