import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList, Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {screenWidth, sharedStyles} from '../../../../../../assets/styles';
import Spacer from '../../../../../common/Spacer';
import {ScreenState} from '../../../types';

interface Props {
  activeScreenState: SharedValue<ScreenState>;
}

const array = new Array(99).fill(1);

const MonoAchivesScreen: FC<Props> = ({activeScreenState}) => {
  const gestureContext = useSharedValue<{
    initialActiveScreenState: ScreenState;
  }>({initialActiveScreenState: activeScreenState.value});

  const renderItem = () => {
    return <View style={styles.itemContainer} />;
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      gestureContext.value = {
        initialActiveScreenState: activeScreenState.value,
      };
    })
    .onUpdate(event => {
      const interpolatedTranslateX = interpolate(
        -event.translationX,
        [0, screenWidth],
        [ScreenState.ACHIVES, ScreenState.MAIN],
      );
      const desiredValue = interpolatedTranslateX;
      if (desiredValue < 0) {
        return;
      }
      activeScreenState.value = desiredValue;
    })
    .onEnd(() => {
      if (activeScreenState.value < 0.5) {
        activeScreenState.value = withTiming(ScreenState.ACHIVES);
        return;
      }
      activeScreenState.value = withTiming(ScreenState.MAIN);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={sharedStyles.flex1}>
        <FlatList
          data={array}
          renderItem={renderItem}
          numColumns={3}
          ItemSeparatorComponent={() => <Spacer height={20} />}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: '20%',
    height: 60,
    backgroundColor: 'red',
    marginHorizontal: 20,
  },
});

export default MonoAchivesScreen;
