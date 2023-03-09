import React from 'react';
import {AppRegistry, LogBox, Text, TextInput} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {getStore, getPersistor} from './src/store/configureStore';
const MaaNCRApp = () => {
  const myStore = getStore();
  const myPersistor = getPersistor();
  return (
    <Provider store={myStore}>
      <PersistGate loading={<App />} persistor={myPersistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => MaaNCRApp);
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
LogBox.ignoreLogs(['Require cycle:']);
LogBox.ignoreLogs(['Warning: Functions are not valid']);
