import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CalendarScreen from '../screens/Calendar';
import HomeScreen from '../screens/Home';
import MonoScreen from '../screens/Mono';

const StackNavigator = createNativeStackNavigator();

const EmptyComponent = () => <></>;

const StackNavigation = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: EmptyComponent,
      }}>
      <StackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <StackNavigator.Screen name="CalendarScreen" component={CalendarScreen} />
      <StackNavigator.Screen name="MonoScreen" component={MonoScreen} />
    </StackNavigator.Navigator>
  );
};

export default StackNavigation;
