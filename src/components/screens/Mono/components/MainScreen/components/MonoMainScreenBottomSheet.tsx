import React, {FC, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import {colors} from '../../../../../../assets/colors';
import {screenWidth, sharedStyles} from '../../../../../../assets/styles';
import {useAvailableHeight} from '../../../hooks/useAvailableHeight';
import {BottomSheetState} from '../../../types';

interface Props {
  bottomSheetState: SharedValue<BottomSheetState>;
}

const MonoMainBottomSheet: FC<Props> = ({bottomSheetState}) => {
  const availableHeight = useAvailableHeight();

  const gestureContext = useSharedValue<{initialBottomSheetState: number}>({
    initialBottomSheetState: bottomSheetState.value,
  });

  const openStateTranslation = useMemo(
    () => -availableHeight * 0.5 + 80,
    [availableHeight],
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            bottomSheetState.value,
            [0, 1],
            [0, openStateTranslation],
          ),
        },
      ],
    };
  }, [bottomSheetState, availableHeight]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      gestureContext.value = {
        initialBottomSheetState: bottomSheetState.value,
      };
    })
    .onUpdate(event => {
      const interpolatedTranslateY = interpolate(
        event.translationY,
        [0, openStateTranslation],
        [0, 1],
      );
      const desiredValue =
        interpolatedTranslateY + gestureContext.value.initialBottomSheetState;
      if (desiredValue < BottomSheetState.OPEN) {
        bottomSheetState.value = desiredValue;
      }
    })
    .onEnd(() => {
      if (bottomSheetState.value > 0.4) {
        bottomSheetState.value = withTiming(BottomSheetState.OPEN);
        return;
      }
      bottomSheetState.value = withTiming(BottomSheetState.CLOSE);
    });

  return (
    <Animated.View
      style={[
        styles.container,
        containerStyle,
        {height: availableHeight - 80},
      ]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={sharedStyles.flex1} />
      </GestureDetector>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBackground,
    width: screenWidth,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});

export default MonoMainBottomSheet;
