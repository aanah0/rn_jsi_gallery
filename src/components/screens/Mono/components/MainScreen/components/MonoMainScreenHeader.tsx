import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../../../../../assets/colors';
import {screenHeight, screenWidth} from '../../../../../../assets/styles';
import Spacer from '../../../../../common/Spacer';
import {useAvailableHeight} from '../../../hooks/useAvailableHeight';
import {
  BottomSheetState,
  ScreenState,
  SelectCardScreenState,
} from '../../../types';

interface Props {
  bottomSheetState: SharedValue<BottomSheetState>;
  activeScreenState: SharedValue<ScreenState>;
  selectCardScreenState: SharedValue<SelectCardScreenState>;
}

const GESTURE_DIRECTION_THRESHOLD = 10;

const MonoMainScreenHeader: FC<Props> = ({
  bottomSheetState,
  activeScreenState,
  selectCardScreenState,
}) => {
  const availableHeight = useAvailableHeight();

  const gestureContext = useSharedValue<{
    lockX: boolean;
    lockY: boolean;
  }>({
    lockX: false,
    lockY: false,
  });

  const balanceStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            bottomSheetState.value,
            [0, 1],
            [0, -40],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateX: interpolate(
            bottomSheetState.value,
            [0, 1],
            [0, 60],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            bottomSheetState.value,
            [0, 1],
            [1, 0.8],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [bottomSheetState.value]);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        bottomSheetState.value,
        [0, 1],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  }, [bottomSheetState.value]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      gestureContext.value = {
        lockX: false,
        lockY: false,
      };
    })
    .onUpdate(event => {
      if (bottomSheetState.value === BottomSheetState.OPEN) {
        return;
      }

      const lockX = gestureContext.value.lockX;
      const lockY = gestureContext.value.lockY;

      const isDirectionKnown =
        lockX ||
        lockY ||
        Math.abs(event.translationX) > GESTURE_DIRECTION_THRESHOLD ||
        Math.abs(event.translationY) > GESTURE_DIRECTION_THRESHOLD;

      if (!isDirectionKnown) {
        return;
      }

      if (
        Math.abs(event.translationX) > GESTURE_DIRECTION_THRESHOLD &&
        !lockY &&
        !lockX
      ) {
        gestureContext.value = {
          lockX: false,
          lockY: true,
        };
      }

      if (
        Math.abs(event.translationY) > GESTURE_DIRECTION_THRESHOLD &&
        !lockY &&
        !lockX
      ) {
        gestureContext.value = {
          lockX: true,
          lockY: false,
        };
      }

      if (gestureContext.value.lockY) {
        const interpolatedTranslateX = interpolate(
          -event.translationX,
          [-screenWidth, 0, screenWidth],
          [ScreenState.ACHIVES, ScreenState.MAIN, ScreenState.SETTINGS],
        );
        const desiredValue = interpolatedTranslateX;
        activeScreenState.value = desiredValue;
      }

      if (gestureContext.value.lockX) {
        const interpolatedTranslateY = interpolate(
          event.translationY,
          [0, screenHeight],
          [0, 1],
        );
        selectCardScreenState.value = interpolatedTranslateY;
      }
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

      if (selectCardScreenState.value > 0.3) {
        selectCardScreenState.value = withTiming(SelectCardScreenState.OPEN);
        return;
      }
      selectCardScreenState.value = withTiming(SelectCardScreenState.CLOSE);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.header, {height: availableHeight * 0.5}]}>
        <View style={styles.moneyContainer}>
          <Animated.Text style={[styles.balanceText, balanceStyle]}>
            98 000$
          </Animated.Text>
          <Animated.Text style={[styles.balanceSecondaryText, fadeStyle]}>
            Власні кошти: 98 000$
          </Animated.Text>
          <Animated.Text style={[styles.balanceSecondaryText, fadeStyle]}>
            Кредитні кошти: 98 000$
          </Animated.Text>
        </View>
        <Spacer flex={1} />
        <Animated.View style={[styles.actionsContainer, fadeStyle]}>
          <TouchableOpacity onPress={() => console.log('AAA')}>
            <View style={styles.actionItem} />
            <Spacer height={8} />
            <Text style={[styles.balanceSecondaryText, styles.textAlignCenter]}>
              AAAAAA{'\n'}aaa
            </Text>
          </TouchableOpacity>
          <View>
            <View style={styles.actionItem} />
            <Spacer height={8} />
            <Text style={[styles.balanceSecondaryText, styles.textAlignCenter]}>
              AAAAAA{'\n'}aaa
            </Text>
          </View>
          <View>
            <View style={styles.actionItem} />
            <Spacer height={8} />
            <Text style={[styles.balanceSecondaryText, styles.textAlignCenter]}>
              AAAAAA{'\n'}aaa
            </Text>
          </View>
        </Animated.View>
        <Spacer height={20} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  header: {
    width: screenWidth,
  },
  balanceText: {
    fontSize: 36,
    color: colors.white,
  },
  balanceSecondaryText: {
    fontSize: 14,
    color: colors.white,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  moneyContainer: {
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionItem: {
    width: 64,
    height: 64,
    borderRadius: 48,
    backgroundColor: colors.secondaryBackground,
  },
});

export default MonoMainScreenHeader;
