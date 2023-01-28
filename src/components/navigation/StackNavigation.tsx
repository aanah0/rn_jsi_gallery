import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CalendarScreen from '../screens/Calendar';

const StackNavigator = createNativeStackNavigator();

const EmptyComponent = () => <></>;

const StackNavigation = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        header: EmptyComponent,
      }}>
      <StackNavigator.Screen name="CalendarScreen" component={CalendarScreen} />
    </StackNavigator.Navigator>
  );
};

export default StackNavigation;
