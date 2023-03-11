import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {screenWidth, sharedStyles} from '../../../../../assets/styles';
import {
  BottomSheetState,
  ScreenState,
  SelectCardScreenState,
} from '../../types';
import MonoAchivesScreen from './components/MonoAchivesScreen';
import MonoCardSelectionScreen from './components/MonoCardSelectionScreen';
import MonoMainBottomSheet from './components/MonoMainScreenBottomSheet';
import MonoMainScreenHeader from './components/MonoMainScreenHeader';
import MonoSettingsScreenHeader from './components/MonoSettingsScreenHeader';

const MainScreen: FC = () => {
  const bottomSheetState = useSharedValue<BottomSheetState>(
    BottomSheetState.CLOSE,
  );
  const activeScreenState = useSharedValue<ScreenState>(ScreenState.MAIN);
  const selectCardScreenState = useSharedValue<SelectCardScreenState>(
    SelectCardScreenState.CLOSE,
  );

  const activeTabPosition = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            activeScreenState.value,
            [0, 1, 2],
            [0, -screenWidth, -screenWidth * 2],
          ),
        },
      ],
    };
  });

  return (
    <>
      <Animated.View style={[sharedStyles.row, activeTabPosition]}>
        <View style={styles.screenWrap}>
          <MonoAchivesScreen activeScreenState={activeScreenState} />
        </View>
        <View style={styles.screenWrap}>
          <MonoMainScreenHeader
            activeScreenState={activeScreenState}
            bottomSheetState={bottomSheetState}
            selectCardScreenState={selectCardScreenState}
          />
          <MonoMainBottomSheet bottomSheetState={bottomSheetState} />
        </View>
        <View style={styles.screenWrap}>
          <MonoSettingsScreenHeader
            activeScreenState={activeScreenState}
            bottomSheetState={bottomSheetState}
          />
          <MonoMainBottomSheet bottomSheetState={bottomSheetState} />
        </View>
      </Animated.View>
      <MonoCardSelectionScreen selectCardScreenState={selectCardScreenState} />
    </>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    height: '100%',
    width: screenWidth,
  },
});

export default MainScreen;
