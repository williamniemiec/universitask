import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import HistoryScreen from '../screens/HistoryScreen';

const StackNavigator = createStackNavigator();

function HomeStack() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <StackNavigator.Screen name="TaskScreen" component={TaskScreen} />
      <StackNavigator.Screen name="HistoryScreen" component={HistoryScreen} />
    </StackNavigator.Navigator>
  );
}

export default HomeStack;
