import React, {FC} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import MainScreen from './components/MainScreen';

const MonoScreen: FC = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.screenWrap}>
      <MainScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenWrap: {
    flex: 1,
    backgroundColor: 'pink',
  },
});

export default MonoScreen;
