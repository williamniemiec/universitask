import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ConfigScreen from '../screens/ConfigScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CustomTabBar from '../components/CustomTabBar';
import colors from '../colors';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const TabNavigator = createBottomTabNavigator();

const MainStack = () => {
  return (
    <TabNavigator.Navigator
      initialRouteName="HomeStack"
      tabBar={(props) => <CustomTabBar { ...props } />}
      screenOptions={({route}) => ({
        tabBarIcon: () => buildTabBarIcon(route),
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: colors.primary
        },
        headerTintColor: colors.lightText
      })}
    >
      <TabNavigator.Screen 
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false
        }}
      />
      <TabNavigator.Screen 
        name="CreateTaskScreen" 
        component={CreateTaskScreen} 
        options={{
          title: "New task",
          headerShown: false
        }}
      />
      <TabNavigator.Screen 
        name="HistoryScreen" 
        component={HistoryScreen}
        options={{
          title: "History",
          headerShown: false
        }}
      />
      <TabNavigator.Screen 
        name="ConfigScreen" 
        component={ConfigScreen} 
        options={{
          title: "Settings",
          headerShown: false
        }}
      />
    </TabNavigator.Navigator>
  );
}

export default MainStack;


//-----------------------------------------------------------------------------
//		Functions
//-----------------------------------------------------------------------------
function buildTabBarIcon(route) {
  let img = null;
  
  switch (route.name) {
    case 'HistoryScreen':
      img = require('../assets/img/icon/history.png');
      break;
    case 'CreateTaskScreen':
      img = require('../assets/img/icon/add.png');
      break;
    case 'HomeStack':
      img = require('../assets/img/icon/home.png');
      break;
    case 'ConfigScreen':
      img = require('../assets/img/icon/config.png');
      break;
  }

  return <Image 
    source={img}
    style={{width: 24, height: 24}}
  />
}
