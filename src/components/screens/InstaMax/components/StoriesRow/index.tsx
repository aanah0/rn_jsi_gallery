import React, {FC, useCallback} from 'react';
import {ListRenderItem, StyleSheet, View} from 'react-native';
import {screenWidth} from '../../../../../assets/styles';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {STORIES} from '../../data';
import StoryItem from './StoryItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const STORIES_ROW_HEIGHT = 80;

const CellRendererComponent = (props: any) => {
  return <View {...props} />;
};

const StoriesRow: FC = () => {
  const scrollX = useSharedValue(0);

  const {top: safeAreaTopInset} = useSafeAreaInsets();
  const paddingTop = safeAreaTopInset + 16;

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const renderItem: ListRenderItem<{image: string; name: string}> = useCallback(
    ({item, index}) => {
      return <StoryItem scrollX={scrollX} {...item} index={index} />;
    },
    [scrollX],
  );

  return (
    <View style={[styles.container, {top: paddingTop}]}>
      <Animated.FlatList
        CellRendererComponent={CellRendererComponent}
        horizontal
        contentContainerStyle={styles.contentContainerStyle}
        data={STORIES}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsHorizontalScrollIndicator={false}
        // not working in Animated.FlatList
        // ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 80,
    width: screenWidth,
    zIndex: 2,
  },
  contentContainerStyle: {
    paddingLeft: 9,
    paddingRight: 20,
  },
});

export default StoriesRow;
