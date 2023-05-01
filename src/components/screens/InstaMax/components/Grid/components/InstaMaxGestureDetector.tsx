import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {screenHeight, screenWidth} from '../../../../../../assets/styles';
import {STORIES_ROW_HEIGHT} from '../../StoriesRow';

interface Props extends PropsWithChildren {
  translateY: SharedValue<number>;
  translateX: SharedValue<number>;
}

const InstaMaxGestureDetector: FC<Props> = ({
  children,
  translateY,
  translateX,
}) => {
  const {top: safeAreaTopInset} = useSafeAreaInsets();
  const paddingTop = safeAreaTopInset + 16 + STORIES_ROW_HEIGHT;
  const gestureDetectorHeight = screenHeight - paddingTop;

  const ctx = useSharedValue({
    translateY: 0,
    translateX: 0,
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      ctx.value = {
        translateX: translateX.value,
        translateY: translateY.value,
      };
    })
    .onUpdate(event => {
      translateY.value = event.translationY + ctx.value.translateY;
      translateX.value = event.translationX + ctx.value.translateX;
    })
    .onEnd(event => {
      translateY.value = withDecay({
        velocity: event.velocityY,
      });
      translateX.value = withDecay({
        velocity: event.velocityX,
      });
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.gestureDetector,
          {
            top: paddingTop,
            height: gestureDetectorHeight,
          },
        ]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  gestureDetector: {
    width: screenWidth,
  },
});

export default InstaMaxGestureDetector;
