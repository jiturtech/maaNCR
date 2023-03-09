/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  CountryPicker,
  Header,
  Spacer,
  Text,
  TextInput,
} from '../../../components';
import KeyboardAwareScrollView from '../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {trimPhoneNo, validateEmail} from '../../../constants/Common';
import {placeholderDefaults} from '../../../constants/Const';
import CountryData from '../../../services/country.json';
import {goBack, navigate} from '../../../services/navigationServices';
import {Colors, showToastAlert} from '../../../theme';
import styles from './style';
import * as actions from '../../../store/actions';

const SignUpScreen = props => {
  const {navigation, route} = props;
  const {isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();

  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    phone: isFromEditProfile ? userInfo?.phone : '',
    dial_code: '',
    flag: '',
    pickerVisibility: false,
    showPasswordText: true,
    first_name: isFromEditProfile ? userInfo?.first_name : '',
    last_name: isFromEditProfile ? userInfo?.last_name : '',
    email: isFromEditProfile ? userInfo?.email : '',
    password: '',
    isValidData: true,
    isValidateEmail: true,
  };

  const [signUpData, setSignUpData] = useState(initialState);

  const updateState = (stateName, value) => {
    setSignUpData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    updateState('dial_code', placeholderDefaults.dial_code);
    updateState('flag', placeholderDefaults.flag);
  }, []);

  useEffect(() => {
    if (
      signUpData.first_name &&
      signUpData.last_name &&
      signUpData.email &&
      signUpData.phone &&
      signUpData.password
    ) {
      if (
        signUpData.first_name.trim().length !== 0 &&
        signUpData.last_name.trim().length !== 0 &&
        signUpData.email.trim().length !== 0
      ) {
        if (validateEmail(signUpData.email.trim())) {
          updateState('isValidData', true);
          updateState('isValidateEmail', true);
        } else {
          updateState('isValidData', false);
          updateState('isValidateEmail', false);
        }
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [
    signUpData.first_name,
    signUpData.last_name,
    signUpData.email,
    signUpData.phone,
    signUpData.password,
  ]);

  const countryPickerModel = () => (
    <View>
      <CountryPicker
        visible={signUpData?.pickerVisibility}
        value={signUpData?.phone}
        setPickerVisibility={() => updateState('pickerVisibility', true)}
        pickerData={CountryData || []}
        onCancel={() => updateState('pickerVisibility', false)}
        onSelectCountry={(dial_code, flag) =>
          onPressSelectCountry(dial_code, flag)
        }
        flag={signUpData?.flag}
        countryCode={signUpData?.dial_code}
        onChange={text => onChangeNumber(text)}
        placeholder={placeholderDefaults.countryPicker}
        keyboardType="numeric"
      />
    </View>
  );

  const onChangeNumber = val => {
    const checkVal = trimPhoneNo(val);
    updateState('phone', checkVal);
  };

  const onPressSelectCountry = (dial_code, flag) => {
    updateState('dial_code', dial_code);
    updateState('flag', flag);
    updateState('pickerVisibility', false);
    updateState('phone', '');
  };

  const handleNext = () => {
    const random = 20 + Math.random() * (100 - 20);
    const random3Digits = 2000 + Math.random() * (5000 - 2000);
    let mailContent = `Hello ${signUpData.first_name}, your code is ${parseInt(
      random3Digits,
    )}. Do not share it with anyone.`;
    let bindReferCode = `${signUpData.first_name.substring(0, 4)}${parseInt(
      random,
    )}`;

    let requestObj = {
      phone: signUpData.phone,
      first_name: signUpData.first_name,
      last_name: signUpData.last_name,
      email: signUpData.email,
      password: signUpData.password,
      referalsid: bindReferCode.toUpperCase(),
    };
    let emailReq = {
      to: signUpData.email,
      subject: 'Malviyans Connect Registration Code',
      text: mailContent,
    };

    dispatch(
      actions.sendEmailApiAction(emailReq, res => {
        if (res.status === 200) {
          navigate(NavigationRoutes.OTP_SCREEN, {
            signUpData: requestObj,
            routeFrom: 'signUpScreen',
            isFromEditProfile,
            OTP_Code: parseInt(random3Digits),
          });
        } else {
          showToastAlert(res.data?.message);
        }
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrSubTitle={Strings.AUTH_SECTION.SIGN_UP.HDR_SUB_TITLE}
          hdrTitle={Strings.AUTH_SECTION.SIGN_UP.HDR_TITLE}
        />
        <Spacer space={3} />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            value={signUpData.first_name}
            label={Strings.AUTH_SECTION.SIGN_UP.FIRST_NAME}
            onChangeText={text => {
              updateState('first_name', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={signUpData.last_name}
            label={Strings.AUTH_SECTION.SIGN_UP.LAST_NAME}
            onChangeText={text => {
              updateState('last_name', text);
            }}
            returnKeyType={Strings.next}
          />
          {countryPickerModel()}
          <TextInput
            value={signUpData.email}
            label={Strings.AUTH_SECTION.SIGN_UP.EMAIL}
            keyboardType="email-address"
            onChangeText={text => {
              updateState('email', text);
            }}
            returnKeyType={Strings.next}
            isError={!signUpData.isValidateEmail}
            helperText={
              !signUpData.isValidateEmail ? 'Invalid Email Id' : undefined
            }
          />
          <TextInput
            label={Strings.AUTH_SECTION.SIGN_UP.CREATE_PASS}
            showRightIcon
            showPassword={signUpData?.showPasswordText}
            onPressRightIcon={() => {
              signUpData.showPasswordText
                ? updateState('showPasswordText', false)
                : updateState('showPasswordText', true);
            }}
            returnKeyType={Strings.done}
            onChangeText={text => {
              updateState('password', text);
            }}
          />
        </KeyboardAwareScrollView>
        <Button
          buttonTxt={Strings.CONTINUE}
          textVariant={Const.button5}
          buttonStyle={styles.btnStyle}
          onPress={() => handleNext()}
          disable={!signUpData.isValidData}
          shadow={signUpData.isValidData}
        />
        <TouchableOpacity style={styles.contentView} onPress={() => goBack()}>
          <Text>
            <Text>{Strings.AUTH_SECTION.SIGN_UP.ALRDY_ACC}</Text>
            <Text variant={Const.h3} style={styles.btnText}>
              {Strings.AUTH_SECTION.SIGN_UP.LOGIN}
            </Text>
          </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  );
};

export default SignUpScreen;
