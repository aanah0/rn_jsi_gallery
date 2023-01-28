import React, {FC, memo, useCallback} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../../assets/colors';

export interface DayType {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
}

interface Props {
  date: DayType;
  onPress(date: Date): void;
  isActive: boolean;
}

export const ITEM_HEIGHT = 32;

const DayItem: FC<Props> = ({date, isActive, onPress}) => {
  const _onPress = useCallback(() => onPress(date.date), [date, onPress]);

  return (
    <TouchableOpacity
      onPress={_onPress}
      style={[styles.container, isActive && styles.activeContainer]}>
      <Text
        style={[
          styles.text,
          !date.isCurrentMonth && styles.textInactive,
          isActive && styles.textActive,
        ]}>
        {date.day}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    zIndex: -1,
  },
  activeContainer: {
    backgroundColor: colors.primaryText,
  },
  text: {
    width: 46,
    textAlign: 'center',
    color: colors.primaryText,
    fontSize: 18,
  },
  textInactive: {
    color: colors.secondaryText,
  },
  textActive: {
    color: colors.background,
  },
});

export default memo(DayItem);
