import 'react-native-gesture-handler';
import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './Store';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './navigators/MainTab';

function App() {
  return (
    <Storage>
      <Navigation />
    </Storage>
  );
}

const Storage = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      { children }
    </PersistGate>
  </Provider>
);

const Navigation = ({ children }) => (
  <NavigationContainer>
    <MainTab />
  </NavigationContainer>
);

export default App;
