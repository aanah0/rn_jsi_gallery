import React, {FC, useCallback} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../../../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {sharedStyles} from '../../../../../../assets/styles';
import Animated from 'react-native-reanimated';

const SPACER = 14;
const WIDTH = 130;
const HEIGHT = 278;

interface Props {
  column: number;
  index: number;
  media: string;
}

const MediaItemPreview: FC<Props> = ({column, index, media}) => {
  const leftOffset = column % 2 === 0 ? WIDTH / 2 : 0;

  const top = column * HEIGHT + (column - 1) * SPACER;
  const left = index * WIDTH + (index - 1) * SPACER - leftOffset;

  const sharedTransitionTag = `${column}_${index}_${media}`;

  const navigation = useNavigation();

  const onPress = useCallback(() => {
    navigation.navigate('MediaItemScreen', {
      sharedTransitionTag,
      media,
    });
  }, [media, navigation, sharedTransitionTag]);

  return (
    <TouchableOpacity
      containerStyle={[styles.container, {top, left}]}
      onPress={onPress}>
      <Animated.View sharedTransitionTag={sharedTransitionTag}>
        <Animated.Image
          sharedTransitionTag={sharedTransitionTag}
          source={{uri: media, cache: 'reload'}}
          style={sharedStyles.wh100}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 14,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: colors.secondaryBackground,
    zIndex: 5,
    overflow: 'hidden',
  },
});

export default MediaItemPreview;
