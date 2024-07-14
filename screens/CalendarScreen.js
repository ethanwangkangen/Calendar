import React, {useContext, useRef, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import DayBox from '../components/DayBox.js';
import styles from '../Styles.js';
import {monthNumberToName, getDaysInMonth, getPreviousMonth, getNextMonth } from '../Utils.js';
import UserContext from '../UserContext.js';
import DetailsScreen from './DetailsScreen.js';

const CalendarScreen = ({route}) => {
  const {month, year} = route.params;
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const [resetVerticalScroll, setResetVerticalScroll] = useState(null);
  // In CalendarScreen, setResetVerticalScroll is a state setter function that manages the resetVerticalScroll function. 
  // By passing setResetVerticalScroll down to DetailsScreen, you enable DetailsScreen to invoke resetVerticalScroll, which in turn 
  // resets the vertical scroll position of its ScrollView.
  
  const { userState } = useContext(UserContext);
  const { user, email } = userState;

  const { width: screenWidth } = Dimensions.get('window');
  const scrollViewHorizontalRef = useRef(null);


  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const pageIndex = Math.round(contentOffsetX / screenWidth);

    if (pageIndex === 0) {
      const { prevMonth, prevYear } = getPreviousMonth(currentMonth, currentYear);
      setCurrentMonth(prevMonth);
      setCurrentYear(prevYear);
      scrollViewHorizontalRef.current.scrollTo({ x: screenWidth, animated: false });
    } else if (pageIndex === 2) {
      const { nextMonth, nextYear } = getNextMonth(currentMonth, currentYear);
      setCurrentMonth(nextMonth);
      setCurrentYear(nextYear);
      scrollViewHorizontalRef.current.scrollTo({ x: screenWidth, animated: false });
    }
  };

  const { prevMonth, prevYear } = getPreviousMonth(currentMonth, currentYear);
  const { nextMonth, nextYear } = getNextMonth(currentMonth, currentYear);


  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', 
    width: screenWidth, height: "100%"}}>


      <ScrollView
        ref={scrollViewHorizontalRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd ={handleScroll}
        scrollEventThrottle={16}
        contentOffset={{ x: screenWidth, y: 0 }}>
          
        <View style={{ width: screenWidth }}>
          <DetailsScreen month={prevMonth} year={prevYear} resetVerticalScroll={setResetVerticalScroll}/>
        </View>
        <View style={{ width: screenWidth }}>
          <DetailsScreen month={currentMonth} year={currentYear} resetVerticalScroll={setResetVerticalScroll}/>
        </View>
        <View style={{ width: screenWidth }}>
          <DetailsScreen month={nextMonth} year={nextYear} resetVerticalScroll={setResetVerticalScroll}/>
        </View>
      </ScrollView>
        
      
    </View>
  );
};

export default CalendarScreen;
