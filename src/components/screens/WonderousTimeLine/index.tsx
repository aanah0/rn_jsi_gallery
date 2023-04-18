import React, {FC} from 'react';
import {View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {screenHeight, sharedStyles} from '../../../assets/styles';
import Line from './components/Line';
import WonderousScrollMap, {
  WONDEROUS_SCROLL_MAP_HEIGHT,
} from './components/ScrollMap';
import WonderousHeader, {
  WONDEROUS_HEADER_HEIGHT,
} from './components/WonderousHeader';
import WonderousTimeLineItem from './components/WonderousTimeLineItem';
import YearItem, {
  YEAR_ITEM_DEFAULT_HEIGHT,
  YEAR_ITEM_EXPANDED_HEIGHT,
} from './components/YearItem';
import {
  WONDEROUS_TIMELINE_END_YEAR,
  WONDEROUS_TIMELINE_START_YEAR,
  WONDEROUS_TIMELINE_YEARS,
  WOUNDEROUS_ITEMS,
} from './data';

const WonderousTimeLine: FC = () => {
  const {top, bottom} = useSafeAreaInsets();
  const availableHeight =
    screenHeight -
    top -
    bottom -
    WONDEROUS_HEADER_HEIGHT -
    WONDEROUS_SCROLL_MAP_HEIGHT;

  const scrollY = useSharedValue(0);

  const maxScrollHeight =
    WONDEROUS_TIMELINE_YEARS.length * YEAR_ITEM_EXPANDED_HEIGHT -
    YEAR_ITEM_EXPANDED_HEIGHT +
    YEAR_ITEM_DEFAULT_HEIGHT;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const activeYear = useDerivedValue(() =>
    interpolate(
      scrollY.value,
      [0, maxScrollHeight],
      [WONDEROUS_TIMELINE_START_YEAR, WONDEROUS_TIMELINE_END_YEAR],
      Extrapolate.CLAMP,
    ),
  );

  return (
    <SafeAreaView style={sharedStyles.screenWrap}>
      <WonderousHeader />
      <View style={sharedStyles.flex1}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          style={sharedStyles.flex1}
          contentContainerStyle={{
            paddingVertical: availableHeight / 2,
          }}>
          {WONDEROUS_TIMELINE_YEARS.map(_year => (
            <YearItem
              key={String(_year)}
              year={_year}
              spacer={
                _year !==
                WONDEROUS_TIMELINE_YEARS[WONDEROUS_TIMELINE_YEARS.length - 1]
              }
            />
          ))}
          {WOUNDEROUS_ITEMS.map((_item, i) => (
            <WonderousTimeLineItem
              key={`WOUNDEROUS_ITEMS_${_item.startYear}_${i}`}
              {..._item}
              availableHeight={availableHeight}
              activeYear={activeYear}
            />
          ))}
        </Animated.ScrollView>
        <Line availableHeight={availableHeight} activeYear={activeYear} />
        <WonderousScrollMap activeYear={activeYear} scrollY={scrollY} />
      </View>
    </SafeAreaView>
  );
};

export default WonderousTimeLine;
