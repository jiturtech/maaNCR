import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Header, ItemPicker, TextInput} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../../constants';
import {
  BRANCH_DATA_B_TECH,
  BRANCH_DATA_MSC,
  BRANCH_DATA_M_TECH,
  BRANCH_DATA_PHD,
  COURSE_DATA,
} from '../../../../constants/Const';
import {goBack, navigate} from '../../../../services/navigationServices';
import {Colors, CommonStyle, Metrics} from '../../../../theme';

const EducationScreen = props => {
  const {navigation, route} = props;
  const {contactData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;

  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    graduation_year: isFromEditProfile ? userInfo?.graduation_year : 0,
    degree_course: isFromEditProfile ? userInfo?.degree_course : '',
    branch: isFromEditProfile ? userInfo?.branch : '',
    registration_no: isFromEditProfile ? userInfo?.registration_no : '',
    final_year_roll: isFromEditProfile ? userInfo?.final_year_roll : '',
    final_year_hostel: isFromEditProfile ? userInfo?.final_year_hostel : '',
    final_year_room: isFromEditProfile ? userInfo?.final_year_room : '',
    isValidData: true,
    isValidateGraduationYear: true,
    coursePickerVisible: false,
    branchPickerVisible: false,
  };
  const [educationData, setEducationData] = useState(initialState);
  const [courseData, setCourseData] = useState(COURSE_DATA);
  const [branchData, setBranchData] = useState(BRANCH_DATA_B_TECH);
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const [branch, setBranch] = useState();
  const updateState = (stateName, value) => {
    setEducationData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    console.log(branch);
    switch (branch) {
      case 'B.E./B.Tech':
        setBranchData(BRANCH_DATA_B_TECH);
        break;
      case 'BBA':
        updateState('branch', 'BBA');
        break;
      case 'M.Tech':
        setBranchData(BRANCH_DATA_M_TECH);
        break;
      case 'MBA':
        updateState('branch', 'MBA');
        break;
      case 'MCA':
        updateState('branch', 'MCA');
        break;
      case 'M.Sc':
        setBranchData(BRANCH_DATA_MSC);
        break;
      case 'Ph.D':
        setBranchData(BRANCH_DATA_PHD);
        break;
      case 'B.Pharm':
        updateState('branch', 'Bachelor of Pharmacy');
        break;
      default:
        break;
    }
  }, [branch]);
  const isModalItemShow =
    branch === 'BBA' ||
    branch === 'MBA' ||
    branch === 'MCA' ||
    branch === 'B.Pharm';

  console.log(isModalItemShow);
  useEffect(() => {
    if (
      educationData.graduation_year &&
      educationData.degree_course &&
      educationData.branch
    ) {
      if (
        educationData.graduation_year !== 0 &&
        educationData.degree_course.trim().length !== 0 &&
        educationData.branch.trim().length !== 0
      ) {
        if (
          Number(educationData?.graduation_year) >= 1996 &&
          educationData?.graduation_year <= moment().year() + 4
        ) {
          updateState('isValidData', true);
          updateState('isValidateGraduationYear', true);
        } else {
          updateState('isValidData', false);
          updateState('isValidateGraduationYear', false);
        }
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [
    educationData.graduation_year,
    educationData.degree_course,
    educationData.branch,
  ]);
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

  const setSelectedIndex = (val, id, branchStatus) => {
    setBranch(val.value);
    if (!branchStatus) {
      courseData.map((item, index) => {
        if (index === id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      setCourseData(courseData);
      updateState('degree_course', val.value);
      updateState('branch', '');
    } else {
      branchData.map((item, index) => {
        if (index === id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      setBranchData(branchData);
      updateState('branch', val.value);
    }
    setRefreshFlatList(!refreshFlatList);
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.ED}
          showProgressBar
          hdrTitleVariant={Const.h2}
          prgWidth={'45%'}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            value={educationData?.graduation_year}
            label={Strings.AUTH_SECTION.USER_INFO.GRA_YR}
            onChangeText={text => {
              updateState('graduation_year', Number(text));
            }}
            returnKeyType={Strings.next}
            keyboardType="numeric"
            maxLength={4}
            isError={!educationData.isValidateGraduationYear}
            helperText={
              !educationData.isValidateGraduationYear
                ? `Graduation year should be in between 1966 to maximum  year  ${
                    moment().year() + 4
                  }.`
                : undefined
            }
          />
          <TextInput
            value={educationData?.degree_course}
            label={Strings.AUTH_SECTION.USER_INFO.DEGREE}
            onFocus={() => {
              updateState('coursePickerVisible', true);
            }}
            returnKeyType={Strings.next}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('coursePickerVisible', true)}
          />
          <TextInput
            editable={!isModalItemShow}
            value={educationData?.branch}
            label={Strings.AUTH_SECTION.USER_INFO.BRANCH}
            returnKeyType={Strings.next}
            onFocus={() => {
              updateState('branchPickerVisible', true);
            }}
            showDropDown
            showRightIcon={!isModalItemShow}
            onPressRightIcon={() => updateState('branchPickerVisible', true)}
          />
          <TextInput
            value={educationData?.registration_no}
            label={Strings.AUTH_SECTION.USER_INFO.REG_No}
            onChangeText={text => {
              updateState('registration_no', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={educationData?.final_year_roll}
            label={Strings.AUTH_SECTION.USER_INFO.FNL_YR_RN}
            onChangeText={text => {
              updateState('final_year_roll', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={educationData?.final_year_hostel}
            label={Strings.AUTH_SECTION.USER_INFO.FNL_YR_HN}
            onChangeText={text => {
              updateState('final_year_hostel', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={educationData?.final_year_room}
            label={Strings.AUTH_SECTION.USER_INFO.FNL_YR_RMNO}
            onChangeText={text => {
              updateState('final_year_room', text);
            }}
            returnKeyType={Strings.done}
          />
        </KeyboardAwareScrollView>
        <View
          style={{
            flexDirection: Metrics.FLEX_DIRECTION.ROW,
          }}>
          {renderButton(
            Strings.BACK,
            Const.button1,
            CommonStyle.btnStyle,
            () => goBack(),
            'outlined',
            Colors.COLOR_BLACK,
            Colors.COLOR_BODR,
            true,
          )}
          {renderButton(
            Strings.NEXT,
            Const.button1,
            CommonStyle.btnStyle,
            () =>
              navigate(NavigationRoutes.RESIDENT_SCREEN, {
                educationData: {
                  ...contactData,
                  ...educationData,
                },
                isFromEditProfile,
              }),
            '',
            Colors.COLOR_WHITE,
            '',
            educationData.isValidData,
          )}
        </View>
        <ItemPicker
          data={courseData}
          visible={educationData.coursePickerVisible}
          onRequestClose={() => updateState('coursePickerVisible', false)}
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SLCT_COURSE}
          onPress={(item, index) => setSelectedIndex(item, index, false)}
          extraData={refreshFlatList}
        />
        <ItemPicker
          data={branchData}
          visible={educationData.branchPickerVisible}
          onRequestClose={() => updateState('branchPickerVisible', false)}
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SLCT_BRANCH}
          onPress={(item, index) => setSelectedIndex(item, index, true)}
          extraData={refreshFlatList}
        />
      </>
    </SafeAreaView>
  );
};

export default EducationScreen;
