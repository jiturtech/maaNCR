import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {
  Button,
  CheckBox,
  DatePicker,
  Header,
  ItemPicker,
  Text,
  TextInput,
} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../../constants';
import {BLOOD_GROUP, MARITAL_STATUS} from '../../../../constants/Const';
import {navigate} from '../../../../services/navigationServices';
import {Colors, CommonStyle, Metrics} from '../../../../theme';
import * as _ from 'lodash';
import {useSelector} from 'react-redux';
import Styles from './style';

const PersonalScreen = props => {
  const {navigation, route} = props;
  const {signUpData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    dob: isFromEditProfile ? userInfo?.dob : '',
    blood_group: isFromEditProfile ? userInfo?.blood_group : '',
    marital_status: isFromEditProfile ? userInfo?.marital_status : '',
    spouse_name: isFromEditProfile ? userInfo?.spouse_name : '',
    anniversary_date: isFromEditProfile ? userInfo?.anniversary_date : '',
    isValidExpiry: true,
    itemPickerVisible: false,
    marital_picker_Visible: false,
    isDOBDateVisible: false,
    isAnnyDateVisible: false,
    isValidData: true,
    isChecked: false,
    gender: isFromEditProfile ? userInfo?.gender : 'Male',
  };
  const [personalData, setPersonalDataData] = useState(initialState);
  const [bloodGroupData, setBloodGroupData] = useState(BLOOD_GROUP);
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const [maritalData, setMaritalData] = useState(MARITAL_STATUS);
  const updateState = (stateName, value) => {
    setPersonalDataData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    if (personalData.dob) {
      if (personalData?.dob !== '') {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [personalData.dob]);

  useEffect(() => {
    if (isFromEditProfile) {
      updateState('isChecked', userInfo?.gender === 'Female' ? true : false);
      updateState('gender', userInfo?.gender === 'Female' ? 'Female' : 'Male');
    }
  }, []);

  const renderButton = (
    buttonTxt,
    textVariant,
    buttonStyle,
    routeName,
    buttonVariant,
    buttonColor,
    borderColor,
    disabled,
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
      disable={!disabled}
      shadow={disabled}
    />
  );

  const setSelectedIndex = (val, id, maritalStatus) => {
    if (!maritalStatus) {
      bloodGroupData.map((item, index) => {
        if (index === id) {
          bloodGroupData[index].selected = true;
        } else {
          bloodGroupData[index].selected = false;
        }
      });
      setBloodGroupData(bloodGroupData);
      updateState('blood_group', val.value);
    } else {
      maritalData.map((item, index) => {
        if (index === id) {
          maritalData[index].selected = true;
        } else {
          maritalData[index].selected = false;
        }
      });
      setMaritalData(maritalData);
      if (val.value !== 'Married') {
        updateState('spouse_name', '');
        updateState('anniversary_date', '');
      }
      updateState('marital_status', val.value);
    }
    setRefreshFlatList(!refreshFlatList);
  };

  const renderMaritalTextInputs = () => (
    <>
      <TextInput
        value={personalData.spouse_name}
        label={Strings.AUTH_SECTION.USER_INFO.SPOUSE}
        onChangeText={text => {
          updateState('spouse_name', text);
        }}
      />
      <TextInput
        value={
          personalData?.anniversary_date !== '' &&
          moment(personalData?.anniversary_date).format('DD-MMM')
        }
        label={Strings.AUTH_SECTION.USER_INFO.ANNIVERSARY}
        onFocus={() => {
          updateState('isAnnyDateVisible', true);
        }}
        placeholder={'DD-MMM'}
        dropIcon={'calendar-outline'}
        maxLength={5}
        showDropDown
        showRightIcon
        onPressRightIcon={() => updateState('isAnnyDateVisible', true)}
      />
    </>
  );

  const handleAnnyDate = value => {
    updateState('anniversary_date', value);
    updateState('isAnnyDateVisible', false);
  };

  const handleDOBDate = value => {
    updateState('dob', value);
    updateState('isDOBDateVisible', false);
  };

  const handleNext = () => {
    let requestObj = {
      ...personalData,
      ...signUpData,
      dob: moment(personalData?.dob).format('YYYY-MM-DD'),
      anniversary_date: moment(personalData?.anniversary_date).format(
        'YYYY-MM-DD',
      ),
    };
    requestObj = _.pickBy(requestObj, value => {
      return !(value === true || value === false);
    });
    navigate(NavigationRoutes.CONTACT_SCREEN, {
      personalData: requestObj,
      isFromEditProfile,
    });
  };

  const handleGender = res => {
    if (personalData.isChecked) {
      updateState('isChecked', false);
      updateState('gender', res);
    } else {
      updateState('isChecked', true);
      updateState('gender', res);
    }
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.PI}
          showProgressBar
          hdrTitleVariant={Const.h2}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            value={
              personalData?.dob !== '' &&
              moment(personalData?.dob).format('DD-MMM')
            }
            label={Strings.AUTH_SECTION.USER_INFO.DOB}
            placeholder={'DD-MMM'}
            dropIcon={'calendar-outline'}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('isDOBDateVisible', true)}
            onFocus={() => updateState('isDOBDateVisible', true)}
            maxLength={5}
          />
          <View style={Styles.genderView}>
            <Text variant={Const.body1} style={Styles.genderTitle}>
              {'Gender'}
            </Text>
            <CheckBox
              check={!personalData.isChecked}
              name={'Male'}
              Action={() => handleGender('Male')}
            />
            <CheckBox
              check={personalData.isChecked}
              name={'Female'}
              Action={() => handleGender('Female')}
            />
          </View>

          <TextInput
            value={personalData.blood_group}
            label={Strings.AUTH_SECTION.USER_INFO.BLOOD_GRP}
            onFocus={() => {
              updateState('itemPickerVisible', true);
            }}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('itemPickerVisible', true)}
          />
          <TextInput
            value={personalData.marital_status}
            label={Strings.AUTH_SECTION.USER_INFO.MARITAL_STATUS}
            onFocus={() => {
              updateState('marital_picker_Visible', true);
            }}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('marital_picker_Visible', true)}
          />
          {personalData?.marital_status === 'Married' &&
            renderMaritalTextInputs()}
        </KeyboardAwareScrollView>
        <View style={CommonStyle.btnStyleNew}>
          {renderButton(
            Strings.BACK,
            Const.button1,
            CommonStyle.btnStyle,
            () =>
              navigate(NavigationRoutes.SIGN_UP_SCREEN, {
                isFromEditProfile,
              }),
            'outlined',
            Colors.COLOR_BLACK,
            Colors.COLOR_BODR,
            true,
          )}
          {renderButton(
            Strings.NEXT,
            Const.button1,
            CommonStyle.btnStyle,
            () => handleNext(),
            '',
            Colors.COLOR_WHITE,
            '',
            personalData.isValidData,
          )}
        </View>
        <ItemPicker
          data={bloodGroupData}
          visible={personalData.itemPickerVisible}
          onRequestClose={() => updateState('itemPickerVisible', false)}
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SLCT_BG}
          onPress={(item, index) => setSelectedIndex(item, index, false)}
          extraData={refreshFlatList}
        />
        <ItemPicker
          data={maritalData}
          visible={personalData.marital_picker_Visible}
          onRequestClose={() => updateState('marital_picker_Visible', false)}
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SLCT_MS}
          onPress={(item, index) => setSelectedIndex(item, index, true)}
          extraData={refreshFlatList}
        />
        <DatePicker
          isDatePickerVisible={personalData.isAnnyDateVisible}
          onCancelDate={() => updateState('isAnnyDateVisible', false)}
          onConfirmDate={i => {
            handleAnnyDate(i);
          }}
          pickerType={'date'}
        />
        <DatePicker
          isDatePickerVisible={personalData.isDOBDateVisible}
          onCancelDate={() => updateState('isDOBDateVisible', false)}
          onConfirmDate={i => {
            handleDOBDate(i);
          }}
          pickerType={'date'}
        />
      </>
    </SafeAreaView>
  );
};

export default PersonalScreen;
