import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../assets/colors';
import {sharedStyles} from '../../assets/styles';
import Spacer from '../common/Spacer';

const ROUTES = [
  {
    title: 'Calendar',
    route: 'CalendarScreen',
  },
  {
    title: 'Mono',
    route: 'MonoScreen',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = useCallback<
    ListRenderItem<{
      title: string;
      route: string;
    }>
  >(
    ({item}) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.route)}
          style={styles.itemContainer}>
          <Text style={sharedStyles.textPrimaryColor}>{item.title}</Text>
        </TouchableOpacity>
      );
    },
    [navigation],
  );

  const ItemSeparatorComponent = useCallback(() => <Spacer height={20} />, []);

  return (
    <SafeAreaView style={sharedStyles.screenWrap}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={ROUTES}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contentContainerStyle: {
    padding: 20,
  },
});

export default HomeScreen;
