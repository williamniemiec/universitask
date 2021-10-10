/**
 * @format
 */
import React from 'react';
import 'react-native';
import { NativeBaseProvider } from 'native-base';
//import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from '../src/navigators/MainTab';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import { persistReducer } from 'redux-persist';
import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reducers from '../src/reducers';


const persistedReducer = persistReducer({
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['UserReducer']
}, Reducers);

const store = createStore(persistedReducer);

test('renders correctly', () => {

  const tree = renderer.create(
    <NativeBaseProvider>
    <Provider store={store}>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </Provider>
  </NativeBaseProvider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});

const Storage = ({ children }) => (
  <Provider store={store}>
    {//<PersistGate loading={null} persistor={persistor}>
     // { children }
    //</PersistGate>
    }
    { children }
  </Provider>
);


