import React, {useEffect, useState} from 'react';
import {Image, Keyboard, SafeAreaView, StatusBar, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../../assets';
import {Button, Header, Spacer, TextInput} from '../../../components';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import {
  Colors,
  CommonStyle,
  CustomAlertWithAction,
  Metrics,
  showToastAlert,
} from '../../../theme';
import Styles from './style';
import * as actions from '../../../store/actions';

const ReferralCodeScreen = props => {
  const initialState = {
    showSuccessCode: false,
    showFailedCode: false,
    code: '',
    isValidData: true,
    isValidateEmail: true,
  };
  const {navigation, route} = props;
  const {userId} = route?.params;
  const [referData, setReferData] = useState(initialState);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.authReducer);

  const updateState = (stateName, value) => {
    setReferData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isKeyboardVisible]);

  const onchangeText = text => {
    updateState('code', text);
    if (text.length === 6) {
      dispatch(
        actions.checkCodeExistApiAction(text, loginData?.access_token, res => {
          if (res.status === 200) {
            if (res.data.data.length > 0) {
              dispatch(
                actions.sendInviteApiAction(
                  {invite_code: text},
                  loginData?.access_token,
                  res => {
                    console.log('sendInviteApiActionsendInviteApiAction', res);
                    if (res.status === 200) {
                      updateState('showSuccessCode', true);
                      updateState('showFailedCode', false);
                    } else {
                      showToastAlert(res.data?.errors[0]?.message);
                    }
                  },
                ),
              );
            } else {
              updateState('showSuccessCode', false);
              updateState('showFailedCode', true);
            }
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        }),
      );
    } else {
      updateState('showSuccessCode', false);
      updateState('showFailedCode', false);
    }
  };
  const handleContinue = () => {
    dispatch(
      actions.changeUserStatusApiAction(
        {user_status: 'waiting'},
        userId,
        loginData?.access_token,
        res => {
          console.log(res);
          if (res.status === 200) {
            CustomAlertWithAction({
              title: Strings.AUTH_SECTION.SIGN_IN.RELAX_TITLE,
              msg: Strings.AUTH_SECTION.SIGN_IN.RELAX_SUB,
              onPress: () => navigate(NavigationRoutes.SIGN_IN_SCREEN),
            });
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        },
      ),
    );
  };
  return (
    <SafeAreaView style={Styles.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Image
          source={Images.SIGN_IN_IMG}
          style={Styles.image}
          resizeMode={Metrics.RESIZE_MODE.CONTAIN}
        />
        <Spacer space={2} />
        <View
          style={[Styles.content, {height: isKeyboardVisible ? '85%' : '45%'}]}>
          <Spacer space={5} />
          <Header
            hdrTitle={Strings.AUTH_SECTION.SIGN_IN.SIGN_SUCCESS}
            hdrTitleStyle={Styles.hdrTitleStyle}
            hdrSubTitleStyle={Styles.hdrTitleStyle}
            hdrSubTitle={Strings.AUTH_SECTION.SIGN_IN.SIGN_CONTENT}
            hdrTitleVariant={Const.h2}
          />
          <Spacer space={3} />
          <TextInput
            label={Strings.AUTH_SECTION.SIGN_IN.CODE}
            returnKeyType={Strings.done}
            onChangeText={text => {
              onchangeText(text);
            }}
            maxLength={6}
            isReferCode={
              referData?.showSuccessCode || referData?.showFailedCode
            }
            isReferCodeSuccess={referData?.showFailedCode}
            referrerName={
              referData?.showSuccessCode
                ? 'Accepted'
                : Strings.AUTH_SECTION.SIGN_IN.WRONG
            }
            value={referData.code.toUpperCase()}
          />
          <Spacer space={3} />
          <Button
            buttonTxt={Strings.SUBMIT}
            textVariant={Const.button5}
            buttonStyle={CommonStyle.btnStyleFooter}
            onPress={() => handleContinue()}
            disable={!referData.showSuccessCode}
            shadow={referData.showSuccessCode}
            borderColor={Colors.COLOR_WHITE}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

export default ReferralCodeScreen;
