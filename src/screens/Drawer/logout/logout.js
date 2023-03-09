import React from 'react';
import {connect} from 'react-redux';
import {NavigationRoutes} from '../../../constants';
import {resetAuth} from '../../../store/actions/authaction';
import {CustomAlertWithTwoActions} from '../../../theme';
class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    this.props.LogoutMethod();
    this.props.navigation.reset({
      index: 0,
      routes: [
        {
          name: NavigationRoutes.WELCOME_SCREEN,
        },
      ],
    });
  };

  openAlert = () => {
    this.props.navigation.goBack();
    CustomAlertWithTwoActions({
      title: 'Alert!',
      msg: 'Do you really want to logout ?',
      actionText: 'Logout',
      onPress: () => this.logout(),
      actionTextSecond: 'Cancel',
      onPressSecond: () => {},
    });
  };

  componentDidMount() {
    this._focus = this.props.navigation.addListener('focus', () => {
      // do something
      this.openAlert(); //triggers at first render
    });
  }

  componentWillUnmount() {
    this._focus();
  }

  render() {
    return null;
  }
}
const mapDispatchToProps = dispatch => {
  return {
    LogoutMethod: () => {
      dispatch(resetAuth());
    },
  };
};
const mapStatetoProps = state => {
  return {
    auth: state.authReducer.auth,
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(Logout);
