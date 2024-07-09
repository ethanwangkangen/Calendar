import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import styles from '../Styles.js';

// Custom MonthBox Component
const MonthBox = ({ month }) => {
  return (
    <View style = {styles.monthBox}>
      <Text style = {{fontSize: 30}}>{month}</Text>
    </View>
  );
};

export default MonthBox;