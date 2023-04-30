import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import InstaMaxGestureDetector from './components/InstaMaxGestureDetector';
import {INSTA_MAX_MEDIA_GRID} from '../../data';
import MediaItemPreview from './components/MediaItemPreview';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Grid: FC = () => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  return (
    <View style={styles.screen}>
      <InstaMaxGestureDetector translateY={translateY} translateX={translateX}>
        <Animated.View style={style}>
          {INSTA_MAX_MEDIA_GRID.map((row, columnIndex) => {
            return row.map((media, index) => (
              <MediaItemPreview
                key={`${columnIndex}_${index}`}
                column={columnIndex}
                index={index}
                media={media}
              />
            ));
          })}
        </Animated.View>
      </InstaMaxGestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Grid;
