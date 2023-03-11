import React, {FC} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {Button, StyleSheet} from 'react-native';
import {screenHeight, screenWidth} from '../../../../../../assets/styles';
import {SelectCardScreenState} from '../../../types';

interface Props {
  selectCardScreenState: SharedValue<SelectCardScreenState>;
}

const MonoCardSelectionScreen: FC<Props> = ({selectCardScreenState}) => {
  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      selectCardScreenState.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      selectCardScreenState.value,
      [0, 1],
      [-300, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
      ],
    };
  });

  const onClose = () =>
    (selectCardScreenState.value = withTiming(SelectCardScreenState.CLOSE));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Button title="Close" onPress={onClose} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'fuchsia',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MonoCardSelectionScreen;
