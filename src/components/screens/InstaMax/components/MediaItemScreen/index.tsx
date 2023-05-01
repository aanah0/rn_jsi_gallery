import React, {FC} from 'react';
import Animated from 'react-native-reanimated';
import {Pressable, Text} from 'react-native';
import {sharedStyles} from '../../../../../assets/styles';

const MediaItemScreen: FC = ({navigation, route}) => {
  const {sharedTransitionTag, media} = route.params;

  return (
    <Animated.View
      style={[sharedStyles.screenWrap, {borderRadius: 12, overflow: 'hidden'}]}>
      <Animated.Image
        sharedTransitionTag={sharedTransitionTag}
        source={{uri: media, cache: 'reload'}}
        style={[sharedStyles.wh100, {borderRadius: 12}]}
      />
      <Pressable
        style={{position: 'absolute', left: 20, top: 60}}
        onPress={() => navigation.goBack()}>
        <Text style={sharedStyles.textPrimaryColor}>Back</Text>
      </Pressable>
    </Animated.View>
  );
};

export default MediaItemScreen;
