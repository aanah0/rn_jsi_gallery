import React, {FC, memo, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../assets/colors';
import {sharedStyles} from '../../../../assets/styles';

import dayjs from 'dayjs';

interface Props {
  date: Date;
}

const CalendarHeader: FC<Props> = ({date}) => {
  const month = useMemo(() => {
    return dayjs(date).format('MMMM YYYY');
  }, [date]);

  return (
    <View style={[sharedStyles.rowAlignCenter, styles.container]}>
      <Text style={styles.monthText}>{month}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  monthText: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.primaryText,
    textAlign: 'center',
  },
});

export default memo(CalendarHeader);
