import React, {FC} from 'react';
import {ColorValue, Image, ImageSourcePropType, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {screenWidth, sharedStyles} from '../../../../assets/styles';
import {
  WONDEROUS_TIMELINE_END_YEAR,
  WONDEROUS_TIMELINE_START_YEAR,
  WONDEROUS_TIMELINE_YEARS,
} from '../data';
import {
  YEAR_ITEM_DEFAULT_HEIGHT,
  YEAR_ITEM_EXPANDED_HEIGHT,
  YEAR_ITEM_WIDTH,
} from './YearItem';

const WOUNDEROUS_TIMELINE_COLUMNS_COUNT = 3;
const WOUNDEROUS_TIMELINE_COLUMNS_SPACER = 20;
const WOUNDEROUS_TIMELINE_COLUMNS_WIDTH =
  (screenWidth - YEAR_ITEM_WIDTH) / WOUNDEROUS_TIMELINE_COLUMNS_COUNT -
  WOUNDEROUS_TIMELINE_COLUMNS_SPACER -
  5;

const WOUNDEROUS_TIMELINE_MINIMUM_HEIGHT = 100;
const WOUNDEROUS_TIMELINE_IMAGE_PADDING = 5;

interface Props {
  column: number;
  startYear: number;
  endYear: number;
  image: ImageSourcePropType;
  color: ColorValue;
  availableHeight: number;
  activeYear: SharedValue<number>;
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
const range = (x1: number, y1: number, x2: number, y2: number, a: number) =>
  lerp(x2, y2, invlerp(x1, y1, a));

const maxScrollHeight =
  WONDEROUS_TIMELINE_YEARS.length * YEAR_ITEM_EXPANDED_HEIGHT -
  YEAR_ITEM_EXPANDED_HEIGHT +
  YEAR_ITEM_DEFAULT_HEIGHT;

const WonderousTimeLineItem: FC<Props> = ({
  column,
  startYear,
  endYear,
  image,
  activeYear,
  color,
  availableHeight,
}) => {
  const columnIndex = column - 1;
  const leftPosition =
    WOUNDEROUS_TIMELINE_COLUMNS_SPACER +
    YEAR_ITEM_WIDTH +
    WOUNDEROUS_TIMELINE_COLUMNS_WIDTH * columnIndex +
    columnIndex * WOUNDEROUS_TIMELINE_COLUMNS_SPACER;

  const topPosition =
    range(
      WONDEROUS_TIMELINE_START_YEAR,
      WONDEROUS_TIMELINE_END_YEAR,
      0,
      maxScrollHeight,
      startYear,
    ) +
    availableHeight / 2;

  const height = ((endYear - startYear) / 100) * YEAR_ITEM_EXPANDED_HEIGHT;

  const parallaxStyle = useAnimatedStyle(() => {
    const translateYEndPoint =
      height <= WOUNDEROUS_TIMELINE_MINIMUM_HEIGHT
        ? WOUNDEROUS_TIMELINE_IMAGE_PADDING
        : height -
          WOUNDEROUS_TIMELINE_MINIMUM_HEIGHT +
          WOUNDEROUS_TIMELINE_IMAGE_PADDING;

    const translateY = interpolate(
      activeYear.value,
      [startYear, endYear],
      [WOUNDEROUS_TIMELINE_IMAGE_PADDING, translateYEndPoint],
      Extrapolate.CLAMP,
    );

    return {
      width: '90%',
      height:
        WOUNDEROUS_TIMELINE_MINIMUM_HEIGHT -
        WOUNDEROUS_TIMELINE_IMAGE_PADDING * 2,
      borderRadius: 999,
      overflow: 'hidden',
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: topPosition,
          left: leftPosition,
          backgroundColor: color,
          height,
        },
      ]}>
      <Animated.View style={parallaxStyle}>
        <Image style={sharedStyles.wh100} resizeMode="stretch" source={image} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WOUNDEROUS_TIMELINE_COLUMNS_WIDTH,
    position: 'absolute',
    borderRadius: WOUNDEROUS_TIMELINE_COLUMNS_WIDTH / 2,
    minHeight: WOUNDEROUS_TIMELINE_MINIMUM_HEIGHT,
    alignItems: 'center',
  },
});

export default WonderousTimeLineItem;
