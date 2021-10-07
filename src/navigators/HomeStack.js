import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import HistoryScreen from '../screens/HistoryScreen';
import colors from '../colors';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const StackNavigator = createStackNavigator();

const HomeStack = () => {

  return (
    <StackNavigator.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.lightText
      }}
    >
      <StackNavigator.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: "Tasks",
          headerShown: false
        }}
      />
      <StackNavigator.Screen 
        name="TaskScreen" 
        component={TaskScreen} 
        options={{
          title: "Task"
        }}
      />
      <StackNavigator.Screen 
        name="HistoryScreen" 
        component={HistoryScreen}
        options={{
          title: "History"
        }} 
      />
    </StackNavigator.Navigator>
  );
}

export default HomeStack;
