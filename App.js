import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {OfflineNotice} from './src/components';
import Loader from './src/components/Loader';
import MainNavigation from './src/navigation/mainNavigation';
import {Colors} from './src/theme';
import {getState} from './src/store/configureStore';
export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    console.log('LOCAL STORAGE====>>>', getState());
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor={Colors.COLOR_WHITE} />
        <OfflineNotice />
        <MainNavigation />
        <Toast ref={ref => Toast.setRef(ref)} />
        <Loader />
      </>
    );
  }
}
