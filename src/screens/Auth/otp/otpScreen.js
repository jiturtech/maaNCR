/* eslint-disable radix */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Button, Header, Text} from '../../../components';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import {Colors, CommonStyle, showToastAlert} from '../../../theme';
import styles from './style';

const OTPScreen = props => {
  const {navigation, route} = props;
  const {signUpData, routeFrom, isFromEditProfile, OTP_Code} = route?.params;
  const [value, setValue] = useState('');
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [CellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [time, setTime] = useState(30);
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => setTime(time - 1), 1000);
    }
  });

  const renderCell = ({index, symbol, isFocused}) => {
    return (
      <Text
        variant={Const.h3}
        key={index}
        style={
          isFocused
            ? [
                styles.cell,
                {
                  backgroundColor: Colors.COLOR_THEME,
                  color: Colors.COLOR_WHITE,
                },
              ]
            : styles.cell
        }
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </Text>
    );
  };

  const onResend = () => {
    setTime(30);
  };

  const handleRoutes = () => {
    switch (routeFrom) {
      case 'signUpScreen':
        handleSignUp();
        break;
      case 'forget_EMAIL':
        navigate(NavigationRoutes.CHANGE_PASS_SCREEN);
        break;
      case 'forget_SMS':
        navigate(NavigationRoutes.CHANGE_PASS_SCREEN);
        break;
      default:
        break;
    }
  };

  const handleSignUp = () => {
    if (parseInt(value) === OTP_Code) {
      navigate(NavigationRoutes.PERSONAL_SCREEN, {
        signUpData,
        isFromEditProfile,
      });
    } else {
      showToastAlert('code is not valid please enter valid code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.OTP.VERIFICATION}
          hdrSubTitle={Strings.AUTH_SECTION.OTP.VERIFY_OTP_SUB}
          underLineTxt={signUpData?.email}
          showUnderLineText={false}
        />
        <View style={styles.otpView}>
          <CodeField
            ref={ref}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            renderCell={renderCell}
          />
          <View style={styles.hdrSubView}>
            <Text style={styles.codeFieldRoot}>
              {Strings.AUTH_SECTION.OTP.RESEND_CODE}
            </Text>
            <TouchableOpacity
              disabled={time > 0 && true}
              onPress={() => onResend()}>
              <Text variant={Const.h5} style={styles.timerTxt}>
                {time > 0 ? '00:' + time : Strings.AUTH_SECTION.OTP.RESEND}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={CommonStyle.footerStyle}>
          <Button
            buttonTxt={Strings.CONTINUE}
            textVariant={Const.button5}
            buttonStyle={CommonStyle.btnStyleFooter}
            onPress={() => handleRoutes()}
          />
          <TouchableOpacity
            style={CommonStyle.contentViewFooter}
            onPress={() => {}}>
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

export default OTPScreen;
