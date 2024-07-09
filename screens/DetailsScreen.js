import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import DayBox from '../components/DayBox.js';
import MonthBox from  '../components/MonthBox.js';
import styles from '../Styles.js';
import { monthNameToNumber } from '../Utils.js';

const DetailsScreen = ({route}) => {
  const {month, year} = route.params;
  const monthNum = monthNameToNumber(month);

  const dayNums = Array.from({ length: 30 }, (_, i) => i + 1);
  const userId = "ethanwang";

  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
    justifyContent: "flex-start", borderWidth: 10, borderColor: 'plum',}}>

      <ScrollView style= {styles.monthScrollView}>
        <MonthBox month = {month}></MonthBox>

        <View style = {styles.grid}>
          {dayNums.map(dayNum => (
            <DayBox key={dayNum} dayNum={dayNum} />
          ))}
        </View>


      </ScrollView>
      
    </View>
  );
};

export default DetailsScreen;
