import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {screenWidth} from '../../../../../assets/styles';
import {BottomSheetState} from '../../types';
import MonoMainBottomSheet from './components/MonoMainScreenBottomSheet';
import MonoMainScreenHeader from './components/MonoMainScreenHeader';

const MainScreen: FC = () => {
  const bottomSheetState = useSharedValue<BottomSheetState>(
    BottomSheetState.CLOSE,
  );

  return (
    <View style={styles.screenWrap}>
      <MonoMainScreenHeader bottomSheetState={bottomSheetState} />
      <MonoMainBottomSheet bottomSheetState={bottomSheetState} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    width: screenWidth,
  },
});

export default MainScreen;
