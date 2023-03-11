import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../../../../../assets/colors';
import {screenWidth} from '../../../../../../assets/styles';
import {useAvailableHeight} from '../../../hooks/useAvailableHeight';
import {BottomSheetState, ScreenState} from '../../../types';

interface Props {
  bottomSheetState: SharedValue<BottomSheetState>;
  activeScreenState: SharedValue<ScreenState>;
}

const MonoSettingsScreenHeader: FC<Props> = ({
  bottomSheetState,
  activeScreenState,
}) => {
  const availableHeight = useAvailableHeight();

  const gestureContext = useSharedValue<{
    initialActiveScreenState: ScreenState;
  }>({initialActiveScreenState: activeScreenState.value});

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            bottomSheetState.value,
            [BottomSheetState.CLOSE, BottomSheetState.OPEN],
            [0, -350],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            activeScreenState.value,
            [ScreenState.MAIN, ScreenState.SETTINGS],
            [-60, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [bottomSheetState.value]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      gestureContext.value = {
        initialActiveScreenState: activeScreenState.value,
      };
    })
    .onUpdate(event => {
      if (bottomSheetState.value === BottomSheetState.OPEN) {
        return;
      }
      const interpolatedTranslateX = interpolate(
        -event.translationX,
        [-screenWidth, 0],
        [ScreenState.MAIN, ScreenState.SETTINGS],
      );
      const desiredValue = interpolatedTranslateX;
      activeScreenState.value = desiredValue;
    })
    .onEnd(() => {
      if (activeScreenState.value > 1.5) {
        activeScreenState.value = withTiming(ScreenState.SETTINGS);
        return;
      }
      if (activeScreenState.value < 0.5) {
        activeScreenState.value = withTiming(ScreenState.ACHIVES);
        return;
      }
      activeScreenState.value = withTiming(ScreenState.MAIN);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.header, {height: availableHeight * 0.5}]}>
        <Animated.View
          style={[styles.card, {height: availableHeight * 0.3}, cardStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
    paddingVertical: 16,
  },
  card: {
    width: screenWidth - 32,
    marginLeft: 16,
    borderRadius: 32,
    backgroundColor: colors.background,
  },
});

export default MonoSettingsScreenHeader;
