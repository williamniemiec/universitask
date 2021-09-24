import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ConfigScreen from '../screens/ConfigScreen';
import TaskScreen from '../screens/TaskScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';

const StackNavigator = createStackNavigator();

function MainStack() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="HomeScreen" component={HomeScreen} />
      <StackNavigator.Screen name="ConfigScreen" component={ConfigScreen} />
      <StackNavigator.Screen name="TaskScreen" component={TaskScreen} />
      <StackNavigator.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
      <StackNavigator.Screen name="HistoryScreen" component={HistoryScreen} />
      <StackNavigator.Screen name="CreateCategoryScreen" component={CreateCategoryScreen} />
    </StackNavigator.Navigator>
  );
}

export default MainStack;
