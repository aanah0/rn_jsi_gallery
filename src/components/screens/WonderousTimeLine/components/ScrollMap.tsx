import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {colors} from '../../../../assets/colors';
import {screenWidth, sharedStyles} from '../../../../assets/styles';
import Spacer from '../../../common/Spacer';
import {WONDEROUS_TIMELINE_YEARS} from '../data';
import {YEAR_ITEM_DEFAULT_HEIGHT, YEAR_ITEM_EXPANDED_HEIGHT} from './YearItem';

interface Props {
  scrollY: SharedValue<number>;
  activeYear: SharedValue<number>;
}

export const WONDEROUS_SCROLL_MAP_HEIGHT = 110;

const WonderousScrollMap: FC<Props> = ({scrollY}) => {
  const maxScrollHeight =
    WONDEROUS_TIMELINE_YEARS.length * YEAR_ITEM_EXPANDED_HEIGHT -
    YEAR_ITEM_EXPANDED_HEIGHT +
    YEAR_ITEM_DEFAULT_HEIGHT;

  const lineStyle = useAnimatedStyle(() => {
    const endTranslateX = screenWidth - 40;
    const left = interpolate(
      scrollY.value,
      [0, maxScrollHeight],
      [0, endTranslateX],
      Extrapolate.CLAMP,
    );

    return {
      left,
    };
  });

  const borderStyle = useAnimatedStyle(() => {
    const endTranslateX = screenWidth - 40 - 60;
    const left = interpolate(
      scrollY.value,
      [0, maxScrollHeight],
      [0, endTranslateX],
      Extrapolate.CLAMP,
    );

    return {
      left,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={sharedStyles.textPrimaryColor}>Modern Era</Text>
      <Spacer height={8} />
      <View style={[sharedStyles.wh100, styles.mapContainer]}>
        <Animated.View style={[styles.line, lineStyle]} />
        <Animated.View style={[styles.border, borderStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WONDEROUS_SCROLL_MAP_HEIGHT,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  mapContainer: {
    height: 90,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
  },
  line: {
    position: 'absolute',
    width: 1,
    backgroundColor: colors.secondaryText,
    height: '100%',
    top: 0,
  },
  border: {
    position: 'absolute',
    width: 60,
    height: '100%',
    borderColor: colors.primaryText,
    borderWidth: 1,
  },
});

export default WonderousScrollMap;
