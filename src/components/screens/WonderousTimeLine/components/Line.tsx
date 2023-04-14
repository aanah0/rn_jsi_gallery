import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {colors} from '../../../../assets/colors';
import {screenWidth} from '../../../../assets/styles';
import {WONDEROUS_TIMELINE_START_YEAR} from '../data';

interface Props {
  availableHeight: number;
  activeYear: SharedValue<number>;
}

const round = (v: number, step: number = 10) => {
  'worklet';
  return Math.round(v / step) * step;
};

const Line: FC<Props> = ({availableHeight = screenWidth, activeYear}) => {
  const [year, setYear] = useState(`${WONDEROUS_TIMELINE_START_YEAR} BCE`);
  const top = availableHeight / 2;

  useAnimatedReaction(
    () => activeYear.value,
    (_, _activeYear) => {
      const __activeYear = _activeYear || WONDEROUS_TIMELINE_START_YEAR;
      const yearMark = __activeYear > 0 ? 'CE' : 'BCE';
      runOnJS(setYear)(
        `${Math.abs(round(__activeYear)).toFixed()} ${yearMark}`,
      );
    },
  );

  return (
    <View style={[styles.container, {top}]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{year}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    alignItems: 'flex-end',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.secondaryText,
  },
  textContainer: {
    position: 'absolute',
    right: 0,
    top: -20,
    paddingRight: 20,
    paddingBottom: 6,
  },
  text: {
    fontSize: 16,
    color: colors.primaryText,
  },
});

export default Line;
