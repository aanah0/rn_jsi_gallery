import React, {FC} from 'react';
import {Image, StyleSheet} from 'react-native';
import {colors} from '../../../../../assets/colors';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {screenWidth, sharedStyles} from '../../../../../assets/styles';
import {randomImageSource} from '../../data';

interface Props {
  scrollX: SharedValue<number>;
  image: string;
  name: string;
  index: number;
}

const ITEM_WIDTH = 60;
const SEPARATOR_WIDTH = 11;

const StoryItem: FC<Props> = ({scrollX, index}) => {
  const itemDefaultPosition = (ITEM_WIDTH + SEPARATOR_WIDTH) * index + 9;
  const scrollPositionTransitionStartPoint =
    itemDefaultPosition - screenWidth + (ITEM_WIDTH + SEPARATOR_WIDTH) * 2;

  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        scrollPositionTransitionStartPoint,
        scrollPositionTransitionStartPoint - 300,
      ],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      scrollX.value,
      [
        scrollPositionTransitionStartPoint,
        scrollPositionTransitionStartPoint - 300,
      ],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      scrollX.value,
      [
        scrollPositionTransitionStartPoint,
        scrollPositionTransitionStartPoint - 300,
      ],
      [0, -100],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          scale,
        },
        {
          translateX,
        },
      ],
      opacity: opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image
        source={{uri: randomImageSource, cache: 'reload'}}
        style={sharedStyles.wh100}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.white,
    marginLeft: 11,
    overflow: 'hidden',
  },
});

export default StoryItem;
