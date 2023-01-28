import dayjs from 'dayjs';
import React, {useCallback, useState} from 'react';
import {Button, StatusBar, StyleSheet, View} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';

import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../../assets/colors';
import {sharedStyles} from '../../../assets/styles';
import Calendar from '../../common/Calendar';
import Spacer from '../../common/Spacer';
import CalendarHeader from './components/CalendarHeader';

const CalendarScreen = () => {
  const collapsible = useSharedValue<number>(0);

  const [activeDate, setActiveDate] = useState(new Date());

  const toggleCalendarView = useCallback(() => {
    collapsible.value = withTiming(collapsible.value === 0 ? 1 : 0);
  }, [collapsible]);

  const onNextDay = useCallback(() => {
    setActiveDate(_activeDate =>
      dayjs(_activeDate).clone().add(1, 'day').toDate(),
    );
  }, []);

  const onPrevDay = useCallback(() => {
    setActiveDate(_activeDate =>
      dayjs(_activeDate).clone().subtract(1, 'day').toDate(),
    );
  }, []);

  return (
    <SafeAreaView style={[sharedStyles.flex1, styles.bg]}>
      <StatusBar barStyle="light-content" />
      <CalendarHeader date={activeDate} />
      <View style={styles.contentPadding}>
        <Spacer height={16} />
        <Calendar
          date={activeDate}
          setActiveDate={setActiveDate}
          collapsible={collapsible}
        />
      </View>
      <Button title="Toggle" onPress={toggleCalendarView} />
      <Button title="Prev Day" onPress={onPrevDay} />
      <Button title="Next Day" onPress={onNextDay} />
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
});

export default CalendarScreen;
