import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const StackNavigator = createStackNavigator();

function MainStack() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen name="home" component={HomeScreen} />
    </StackNavigator.Navigator>
  );
}

export default MainStack;
