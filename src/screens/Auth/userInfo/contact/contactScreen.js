import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, CountryPicker, Header, TextInput} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../../constants';
import {trimPhoneNo, validateEmail} from '../../../../constants/Common';
import {placeholderDefaults} from '../../../../constants/Const';
import CountryData from '../../../../services/country.json';
import {goBack, navigate} from '../../../../services/navigationServices';
import {Colors, CommonStyle} from '../../../../theme';

const ContactScreen = props => {
  const {navigation, route} = props;
  const {personalData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    alt_phone: isFromEditProfile ? userInfo?.alt_phone : '',
    alt_email: isFromEditProfile ? userInfo?.alt_email : '',
    wa_phone: isFromEditProfile ? userInfo?.wa_phone : '',
    dial_code: '',
    flag: '',
    wp_dial_code: '',
    wp_flag: '',
    isValidData: true,
    isValidateEmail: true,
    phone_pickerVisibility: false,
    wp_pickerVisibility: false,
  };
  const [contactData, setContactData] = useState(initialState);
  const updateState = (stateName, value) => {
    setContactData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    updateState('dial_code', placeholderDefaults.dial_code);
    updateState('flag', placeholderDefaults.flag);
    updateState('wp_dial_code', placeholderDefaults.dial_code);
    updateState('wp_flag', placeholderDefaults.flag);
  }, []);

  useEffect(() => {
    if (
      contactData.alt_phone &&
      contactData.wa_phone &&
      contactData.alt_email
    ) {
      if (contactData.alt_email.trim().length !== 0) {
        if (validateEmail(contactData.alt_email.trim())) {
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
  }, [contactData.alt_phone, contactData.wa_phone, contactData.alt_email]);

  const renderButton = (
    buttonTxt,
    textVariant,
    buttonStyle,
    routeName,
    buttonVariant,
    buttonColor,
    borderColor,
  ) => (
    <Button
      buttonTxt={buttonTxt}
      textVariant={textVariant}
      buttonStyle={buttonStyle}
      onPress={() => routeName()}
      buttonVariant={buttonVariant}
      buttonColor={buttonColor}
      borderColor={borderColor}
      buttonWidth={'40%'}
    />
  );

  const AltPhoneNumber = () => (
    <View>
      <CountryPicker
        visible={contactData?.phone_pickerVisibility}
        value={contactData?.alt_phone}
        setPickerVisibility={() => updateState('phone_pickerVisibility', true)}
        pickerData={CountryData || []}
        onCancel={() => updateState('phone_pickerVisibility', false)}
        onSelectCountry={(dial_code, flag) => onPressPhone(dial_code, flag)}
        flag={contactData?.flag}
        countryCode={contactData?.dial_code}
        onChange={text => onChangeNumber(text, true)}
        placeholder={Strings.AUTH_SECTION.USER_INFO.ALT_PHONE}
        keyboardType="numeric"
      />
    </View>
  );

  const WPPhoneNumber = () => (
    <View>
      <CountryPicker
        visible={contactData?.wp_pickerVisibility}
        value={contactData?.wa_phone}
        setPickerVisibility={() => updateState('wp_pickerVisibility', true)}
        pickerData={CountryData || []}
        onCancel={() => updateState('wp_pickerVisibility', false)}
        onSelectCountry={(dial_code, flag) => onPressWP(dial_code, flag)}
        flag={contactData?.wp_flag}
        countryCode={contactData?.wp_dial_code}
        onChange={text => onChangeNumber(text, false)}
        placeholder={Strings.AUTH_SECTION.USER_INFO.WP_PHONE}
        keyboardType="numeric"
      />
    </View>
  );

  const onChangeNumber = (val, isPhoneNumber) => {
    const checkVal = trimPhoneNo(val);
    if (isPhoneNumber) {
      updateState('alt_phone', checkVal);
    } else {
      updateState('wa_phone', checkVal);
    }
  };

  const onPressPhone = (dial_code, flag) => {
    updateState('dial_code', dial_code);
    updateState('flag', flag);
    updateState('phone_pickerVisibility', false);
    updateState('alt_phone', '');
  };

  const onPressWP = (dial_code, flag) => {
    updateState('wp_dial_code', dial_code);
    updateState('wp_flag', flag);
    updateState('wp_pickerVisibility', false);
    updateState('wa_phone', '');
  };

  const handleNext = () => {
    let requestObj = {
      ...personalData,
      alt_phone: contactData.alt_phone,
      alt_email: contactData.alt_email,
      wa_phone: contactData.wa_phone,
    };
    navigate(NavigationRoutes.EDUCATION_SCREEN, {
      contactData: requestObj,
      isFromEditProfile,
    });
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.CI}
          showProgressBar
          hdrTitleVariant={Const.h2}
          prgWidth={'30%'}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          {AltPhoneNumber()}
          {WPPhoneNumber()}
          <TextInput
            value={contactData?.alt_email}
            label={Strings.AUTH_SECTION.USER_INFO.ALT_EMAIL}
            keyboardType="email-address"
            onChangeText={text => {
              updateState('alt_email', text);
            }}
            returnKeyType={Strings.next}
            isError={!contactData.isValidateEmail}
            helperText={
              !contactData.isValidateEmail ? 'Invalid Email Id' : undefined
            }
          />
        </KeyboardAwareScrollView>
        <View style={CommonStyle.btnViewStyle}>
          {renderButton(
            Strings.BACK,
            Const.button1,
            CommonStyle.btnStyle,
            () => goBack(),
            'outlined',
            Colors.COLOR_BLACK,
            Colors.COLOR_BODR,
          )}
          {renderButton(Strings.NEXT, Const.button1, CommonStyle.btnStyle, () =>
            handleNext(),
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

export default ContactScreen;
