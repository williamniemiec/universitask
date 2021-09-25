import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import styles from './styles'

function CustomTabBar({ state, descriptors, navigation }) {

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const options = descriptors[route.key].options;
        const icon = options.tabBarIcon();
        const focusedIndex = state.index;
        const isFocused = (focusedIndex === index);

        const redirect = () => {
          navigation.navigate(route.name);
        }

        if (route.name == 'CreateTaskScreen') {
          return (
            <View key={index} style={styles.main}>
              <TouchableHighlight onPress={redirect} style={styles.middleTab}>
                {icon}
              </TouchableHighlight>
            </View>
          );
        }
        else {
          return (
            <TouchableHighlight 
              key={index} 
              onPress={redirect} 
              style={[styles.tab, {opacity: isFocused ? 1.0 : 0.6}]} 
              underlayColor='transparent'>
              {icon}
            </TouchableHighlight>
          );
        }
      })}
    </View>
  );
}

export default CustomTabBar;