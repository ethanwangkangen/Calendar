import React, {useRef, useEffect, useContext} from 'react';
import { View, Text, ScrollView } from 'react-native';
import DayBox from '../components/DayBox.js';
import MonthBox from  '../components/MonthBox.js';
import styles from '../Styles.js';
import {monthNumberToName, getDaysInMonth, getDayOfWeek } from '../Utils.js';
import UserContext from '../UserContext.js';


// CalendarScreen shows detailsScreen. Swiping shows the next month's detailsScreen
const DetailsScreen = ({month, year, resetVerticalScroll }) => {
  const scrollViewRef = useRef(null);

  // setResetVerticalScroll is a setter function passed to from CalendarScreen
  // While resetVerticalScroll isn't updating a typical state variable, it's leveraging the mechanism of setter 
  // functions in React to trigger actions based on the current state of your application 
  // (in this case, the existence of scrollViewRef.current). 

  useEffect(() => {
    resetVerticalScroll (() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: false });
      }
    });
    // Clean up function (optional)
    return () => {
      resetVerticalScroll(null); // Clear the reset function on unmount (if needed)
    };
  }, [month, year, resetVerticalScroll]); // Listens out for changes in month/year
  
  const monthName = monthNumberToName(month);

  const dayNums = Array.from({ length: getDaysInMonth(year, month) }, (_, i) => i + 1);

  const { userState } = useContext(UserContext);
  const { user, email } = userState;

  return (
      <ScrollView ref={scrollViewRef} style= {styles.monthScrollView}>
        <MonthBox month = {monthName}></MonthBox>

        <View style = {styles.grid}>
          {dayNums.map(dayNum => (
            <DayBox key={dayNum} dayNum={dayNum} dayOfWeek={getDayOfWeek(year, month, dayNum)}  />
          ))}
        </View>


      </ScrollView>


  );
};

export default DetailsScreen;
