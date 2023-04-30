import React, {FC} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import StoriesRow from './components/StoriesRow';
import Grid from './components/Grid';

const InstaMax: FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated />
      <StoriesRow />
      <Grid />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default InstaMax;
