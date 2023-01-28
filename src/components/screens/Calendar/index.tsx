import React, {useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../assets/colors';
import {sharedStyles} from '../../../assets/styles';
import Calendar from '../../common/Calendar';
import Spacer from '../../common/Spacer';
import CalendarHeader from './components/CalendarHeader';

enum CollappseState {
  OPEN = 0,
  CLOSED = 1,
}

const CalendarScreen = () => {
  const collapsible = useSharedValue<CollappseState>(CollappseState.OPEN);

  const [activeDate, setActiveDate] = useState(new Date());

  const gesture = Gesture.Pan().onUpdate(e => {
    if (collapsible.value === CollappseState.OPEN && e.translationY < -40) {
      collapsible.value = withTiming(CollappseState.CLOSED);
    }
    if (collapsible.value === CollappseState.CLOSED && e.translationY > 40) {
      collapsible.value = withTiming(CollappseState.OPEN);
    }
  });

  return (
    <SafeAreaView style={[sharedStyles.flex1, styles.bg]}>
      <StatusBar barStyle="light-content" />

      <CalendarHeader date={activeDate} />

      <GestureDetector gesture={gesture}>
        <Animated.View>
          <View style={styles.contentPadding}>
            <Spacer height={16} />

            <Calendar
              date={activeDate}
              setActiveDate={setActiveDate}
              collapsible={collapsible}
            />
          </View>

          <Spacer height={2} />

          <View style={sharedStyles.rowAlignCenterJustifyCenter}>
            <View style={styles.gestureMark} />
          </View>

          <Spacer height={8} />

          <View style={styles.calendarDelimiter} />
        </Animated.View>
      </GestureDetector>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.background,
  },
  contentPadding: {
    paddingHorizontal: 20,
  },
  calendarDelimiter: {
    width: '100%',
    backgroundColor: colors.delimiter,
    height: 1,
  },
  gestureMark: {
    backgroundColor: colors.border,
    width: 48,
    height: 6,
  },
});

export default CalendarScreen;
