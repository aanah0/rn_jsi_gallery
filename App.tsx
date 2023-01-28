import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {sharedStyles} from './src/assets/styles';
import Router from './src/components/navigation/Router';

function App(): JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider style={sharedStyles.flex1}>
        <GestureHandlerRootView style={sharedStyles.flex1}>
          <Router />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;
