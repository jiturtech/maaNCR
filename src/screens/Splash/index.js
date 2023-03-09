/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {Image, SafeAreaView, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Images} from '../../assets';
import NavigationRoutes from '../../constants/NavigationRoutes';
import {Colors, CommonStyle, Metrics} from '../../theme';
import styles from './style';

class Splashscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    setTimeout(() => {
      if (this.props.IsLoggedIn) {
        setTimeout(() => {
          this.props.navigation.replace(NavigationRoutes.DRAWER_NAVIGATION);
        }, 3000);
      } else {
        setTimeout(() => {
         this.props.navigation.replace(NavigationRoutes.WELCOME_SCREEN);
        }, 3000);
      }
    }, 500);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <>
          <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
          <Image
            source={Images.SPLASH_IMG}
            style={styles.image}
            resizeMode={Metrics.RESIZE_MODE.CONTAIN}
          />
        </>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    IsLoggedIn: state.authReducer.loggedIn,
  };
};
export default connect(mapStateToProps, null)(Splashscreen);
