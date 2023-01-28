import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../assets/colors';
import {sharedStyles} from '../../../assets/styles';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const ITEM_WIDTH = 40;

const WeekDayRow = () => {
  return (
    <View
      style={[
        sharedStyles.rowAlignCenterJustifySpaceBetween,
        sharedStyles.w100,
        styles.container,
      ]}>
      {weekDays.map(_day => (
        <View key={`weekday_row_${_day}`} style={styles.itemContainer}>
          <Text style={styles.text}>{_day}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    zIndex: 99,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.secondaryText,
  },
});

export default WeekDayRow;
