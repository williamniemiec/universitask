import 'react-native-gesture-handler';
import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './Store';
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './navigators/MainTab';


//-----------------------------------------------------------------------------
//		Components
//-----------------------------------------------------------------------------
const App = () => {
  return (
    <NativeBaseProvider>
      <Storage>
        <Navigation />
      </Storage>
    </NativeBaseProvider>
  );
}

export default App;

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
