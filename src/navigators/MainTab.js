import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ConfigScreen from '../screens/ConfigScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HistoryScreen from '../screens/HistoryScreen';

const TabNavigator = createBottomTabNavigator();

function MainStack() {
  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="HomeStack" component={HomeStack} />
      <TabNavigator.Screen name="ConfigScreen" component={ConfigScreen} />
      <TabNavigator.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
      <TabNavigator.Screen name="HistoryScreen" component={HistoryScreen} />
    </TabNavigator.Navigator>
  );
}

export default MainStack;
