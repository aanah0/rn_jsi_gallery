import dayjs from 'dayjs';
import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {sharedStyles} from '../../../assets/styles';
import Spacer from '../Spacer';
import DayItem, {DayType, ITEM_HEIGHT} from './DayItem';
import WeekDayRow from './WeekDayRow';

interface Props {
  date: Date;
  setActiveDate: Dispatch<SetStateAction<Date>>;
  collapsible: SharedValue<number>;
}

const Calendar: FC<Props> = ({date, setActiveDate, collapsible}) => {
  const animatedActiveWeekIndex = useSharedValue<number>(0);

  const month = useMemo<Array<Array<DayType>>>(() => {
    let weekIndex = 0;
    const compute: Array<Array<DayType>> = [];

    const startOfMonth = dayjs(date).clone().startOf('month');
    const endOfMonth = dayjs(date).clone().endOf('month');

    for (let index = 0; index < endOfMonth.get('date'); index++) {
      const _date = startOfMonth.clone().add(index, 'day');
      const _indexInWeek = _date.isoWeekday() - 1;
      if (!compute[weekIndex]) {
        compute[weekIndex] = new Array(_indexInWeek)
          .fill(1)
          .map((_, _index) => {
            const _prevMonthDate = _date
              .clone()
              .subtract(_indexInWeek - _index, 'day');
            return {
              day: _prevMonthDate.get('date'),
              date: _prevMonthDate.clone().toDate(),
              isCurrentMonth: false,
            };
          });
      }
      compute[weekIndex][_indexInWeek] = {
        day: _date.get('date'),
        date: _date.clone().toDate(),
        isCurrentMonth: true,
      };
      if (_indexInWeek === 6) {
        weekIndex += 1;
      }
    }
    compute[compute.length - 1] = [
      ...compute[compute.length - 1],
      ...new Array(7 - compute[compute.length - 1].length)
        .fill(1)
        .map((_, _index) => {
          const _nextMonthDate = endOfMonth.clone().add(_index + 1, 'day');

          return {
            day: _nextMonthDate.get('date'),
            date: _nextMonthDate.clone().toDate(),
            isCurrentMonth: false,
          };
        }),
    ];

    return compute;
  }, [date]);

  useEffect(() => {
    const _activeWeekIndex = month.findIndex(_week => {
      const _date = _week.find(
        __date =>
          __date.date.toISOString() ===
          dayjs(date).startOf('day').toDate().toISOString(),
      );
      if (_date) {
        return true;
      }
      return false;
    });

    animatedActiveWeekIndex.value = withTiming(_activeWeekIndex);
  }, [animatedActiveWeekIndex, date, month]);

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        collapsible.value,
        [0, 1],
        [ITEM_HEIGHT * 6 + ITEM_HEIGHT, ITEM_HEIGHT * 2],
      ),
    };
  }, []);

  const contentStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        collapsible.value,
        [0, 1],
        [ITEM_HEIGHT * 6, ITEM_HEIGHT],
      ),
      overflow: 'hidden',
    };
  }, [animatedActiveWeekIndex]);

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            collapsible.value,
            [0, 1],
            [0, -animatedActiveWeekIndex.value * ITEM_HEIGHT],
          ),
        },
      ],
    };
  }, [animatedActiveWeekIndex]);

  const onPressDay = useCallback(
    (_date: Date) => {
      setActiveDate(_date);
    },
    [setActiveDate],
  );

  return (
    <Animated.View style={[sharedStyles.w100, containerStyle]}>
      <WeekDayRow />
      <Spacer height={8} />
      <Animated.View style={contentStyle}>
        <Animated.View style={transformStyle}>
          {month.map(_month => (
            <Animated.View
              key={`month_${_month[0].day}`}
              style={sharedStyles.rowAlignCenterJustifySpaceBetween}>
              {_month.map(_date => (
                <DayItem
                  key={`date_${_date.date.toISOString()}`}
                  date={_date}
                  onPress={onPressDay}
                  isActive={
                    _date.date.toISOString() ===
                    dayjs(date).startOf('day').toDate().toISOString()
                  }
                />
              ))}
            </Animated.View>
          ))}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(Calendar);
