import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import styles from '../Styles.js';

// Box that displays the Month, eg "July". Used in detailsScreen
const MonthBox = ({ month }) => {
  return (
    <View style = {styles.monthBox}>
      <Text style = {{fontSize: 30}}>{month}</Text>
    </View>
  );
};

export default MonthBox;