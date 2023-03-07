import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {colors} from '../../../../../../assets/colors';
import {screenWidth} from '../../../../../../assets/styles';
import Spacer from '../../../../../common/Spacer';
import {useAvailableHeight} from '../../../hooks/useAvailableHeight';
import {BottomSheetState} from '../../../types';

interface Props {
  bottomSheetState: SharedValue<BottomSheetState>;
}

const MonoMainScreenHeader: FC<Props> = ({bottomSheetState}) => {
  const availableHeight = useAvailableHeight();

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

  return (
    <View style={[styles.header, {height: availableHeight * 0.5}]}>
      <View style={styles.moneyContainer}>
        <Animated.Text style={[styles.balanceText, balanceStyle]}>
          98 000$
        </Animated.Text>
        <Text style={styles.balanceSecondaryText}>Власні кошти: 98 000$</Text>
        <Text style={styles.balanceSecondaryText}>Кредитні кошти: 98 000$</Text>
      </View>
      <Spacer flex={1} />
      <View style={styles.actionsContainer}>
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
        <View>
          <View style={styles.actionItem} />
          <Spacer height={8} />
          <Text style={[styles.balanceSecondaryText, styles.textAlignCenter]}>
            AAAAAA{'\n'}aaa
          </Text>
        </View>
      </View>
      <Spacer height={20} />
    </View>
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
    width: 48,
    height: 48,
    borderRadius: 48,
    backgroundColor: colors.secondaryBackground,
  },
});

export default MonoMainScreenHeader;
