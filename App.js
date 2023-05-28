import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Navigation from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  btn: {
    height: 50,
    width: 100,
  },
  btnScan: {
    backgroundColor: 'red',
  },
  btnCancel: {
    backgroundColor: 'green',
  },
});

export default App;
