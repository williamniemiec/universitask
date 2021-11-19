import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableHighlight, View, Dimensions } from 'react-native';
import styles from './styles';

function CustomTabBar({ state, descriptors, navigation }) {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [landscape, setLandscape] = useState(false);

  Dimensions.addEventListener('change', () => {
    const dim = Dimensions.get('screen');
    
    setLandscape(dim.width >= dim.height);
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  if (isKeyboardVisible)
    return <></>

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
              <TouchableHighlight onPress={redirect} style={[styles.middleTab, {left: landscape ? '50%' : '40%'}]}>
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