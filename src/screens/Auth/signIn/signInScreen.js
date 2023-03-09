import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Images} from '../../../assets';
import {Button, Header, Spacer, Text, TextInput} from '../../../components';
import KeyboardAwareScrollView from '../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import * as actions from '../../../store/actions';
import {
  Colors,
  CommonStyle,
  CustomAlertWithAction,
  CustomAlertWithTwoActions,
  Metrics,
  showToastAlert,
  showToastSuccess,
} from '../../../theme';
import styles from './style';
import {PRIVACY_POLICY_URL} from '@env';
const SignInScreen = props => {
  const initialState = {
    showPasswordText: true,
    email: '',
    password: '',
    isValidData: true,
  };

  const [signInData, setSignInData] = useState(initialState);
  const dispatch = useDispatch();

  const updateState = (stateName, value) => {
    setSignInData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    if (signInData.email && signInData.password) {
      if (signInData.email.trim().length !== 0) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [signInData.email, signInData.password]);

  const handleLogin = () => {
    dispatch(
      actions.signInApiAction(
        {email: signInData.email, password: signInData.password},
        res => {
          if (res.status === 200) {
            getUserDetails(res.data.data.access_token);
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        },
      ),
    );
  };
  const getUserDetails = token => {
    dispatch(
      actions.userDetailsApiAction(
        signInData.email.toLowerCase(),
        token,
        res => {
          if (res.status === 200) {
            checkUserStatus(res.data.data[0]);
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        },
      ),
    );
  };
  const checkUserStatus = status => {
    switch (status.user_status) {
      case 'admin':
        dispatch(actions.isLoggedIn(true));
        props.navigation.replace(NavigationRoutes.DRAWER_NAVIGATION);
        break;
      case 'pending':
        navigate(NavigationRoutes.REFERRAL_SCREEN, {userId: status.id});
        break;
      case 'waiting':
        CustomAlertWithAction({
          title: Strings.AUTH_SECTION.SIGN_IN.RELAX_TITLE,
          msg: Strings.AUTH_SECTION.SIGN_IN.RELAX_SUB,
        });
        break;
      case 'approved':
        dispatch(actions.isLoggedIn(true));
        props.navigation.replace(NavigationRoutes.DRAWER_NAVIGATION);
        showToastSuccess('Login Successful');
        break;
      case 'denied':
        CustomAlertWithTwoActions({
          title: 'Oops!',
          msg: 'Sorry your friend had denied the request you have sent.Please contact him for approval or try again.',
          actionText: 'Cancel',
          actionTextSecond: 'Try Again',
          onPressSecond: () => {
            navigate(NavigationRoutes.REFERRAL_SCREEN, {userId: status.id});
          },
        });
        break;
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.SIGN_IN.LOGIN}
          hdrSubTitle={Strings.AUTH_SECTION.SIGN_IN.LGIN_SUB}
        />

        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <Image
            source={Images.LOGIN}
            style={styles.image}
            resizeMode={Metrics.RESIZE_MODE.CONTAIN}
          />
          <Spacer space={2} />
          <TextInput
            label={Strings.AUTH_SECTION.SIGN_IN.EMAIL}
            keyboardType="email-address"
            onChangeText={text => {
              updateState('email', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            label={Strings.AUTH_SECTION.SIGN_IN.CREATE_PASS}
            showRightIcon
            showPassword={signInData?.showPasswordText}
            onPressRightIcon={() => {
              signInData.showPasswordText
                ? updateState('showPasswordText', false)
                : updateState('showPasswordText', true);
            }}
            returnKeyType={Strings.done}
            onChangeText={text => {
              updateState('password', text);
            }}
          />
          <TouchableOpacity
            onPress={() => navigate(NavigationRoutes.FORGET_SCREEN)}>
            <Text variant={Const.body2} style={styles.frgtPass}>
              {Strings.AUTH_SECTION.SIGN_IN.FRGT_PASS}
            </Text>
          </TouchableOpacity>
          <Button
            buttonTxt={Strings.CONTINUE}
            textVariant={Const.button5}
            buttonStyle={CommonStyle.btnStyleFooter}
            onPress={() => handleLogin()}
            disable={!signInData.isValidData}
            shadow={signInData.isValidData}
          />
        </KeyboardAwareScrollView>
        <View>
          <TouchableOpacity
            style={CommonStyle.contentViewFooter}
            onPress={() =>
              navigate(NavigationRoutes.WEBVIEW_SCREEN, {
                headerTitle: Strings.AUTH_SECTION.SIGN_IN.TERMS_AND_CONDITIONS,
                webUrl: PRIVACY_POLICY_URL,
              })
            }>
            <Text variant={Const.body2}>
              {Strings.AUTH_SECTION.OTP.PRVCY_TXT}
            </Text>
            <Text variant={Const.body2} style={CommonStyle.btnTextFooter}>
              {Strings.AUTH_SECTION.OTP.PRVCY_TXT_RED}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    </SafeAreaView>
  );
};

export default SignInScreen;
