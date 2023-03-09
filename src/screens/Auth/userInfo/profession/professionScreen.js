import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Divider,
  Header,
  ItemPicker,
  SearchBar,
  Text,
  TextInput,
} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../../constants';
import {OCCUPATIONS} from '../../../../constants/Const';
import {goBack, navigate} from '../../../../services/navigationServices';
import {Colors, CommonStyle, Metrics} from '../../../../theme';
import * as _ from 'lodash';
import Styles from '../resident/style';
import {useSelector} from 'react-redux';
import {validateEmail} from '../../../../constants/Common';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@env';
import StateData from '../../../../constants/states.json';
// import CitiesData from '../../../../constants/cities.json';
import CountryData from '../../../../services/country.json';
import Style from '../resident/style';

const ProfessionScreen = props => {
  const {navigation, route} = props;
  const {residentData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    occupation: isFromEditProfile ? userInfo?.occupation : '',
    company_name: isFromEditProfile ? userInfo?.company_name : '',
    designation: isFromEditProfile ? userInfo?.designation : '',
    year_of_joining: isFromEditProfile ? userInfo?.year_of_joining : 0,
    office_email: isFromEditProfile ? userInfo?.office_email : '',
    office_state: isFromEditProfile ? userInfo?.office_state : '',
    office_city: isFromEditProfile ? userInfo?.office_city : '',
    office_zip_code: isFromEditProfile ? userInfo?.office_zip_code : '',
    office_address_line1: isFromEditProfile
      ? userInfo?.office_address_line1
      : '',
    office_address_line2: isFromEditProfile
      ? userInfo?.office_address_line2
      : '',
    office_country: isFromEditProfile ? userInfo?.office_country : 'India',
    isPickerVisible: false,
    isValidData: true,
    isValidateEmail: true,
    filteredData: [],
    searchTxt: '',
    isCountryPickerVisible: false,
    filteredStateData: [],
    isStatePickerVisible: false,
    searchStateTxt: '',
    searchStateData: [],

    filteredCityData: [],
    isCityPickerVisible: false,
    searchCityTxt: '',
    searchCityData: [],
  };

  const [professionData, setProfessionData] = useState(initialState);
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const [occupationData, setOccupationData] = useState(OCCUPATIONS);

  const updateState = (stateName, value) => {
    setProfessionData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    let arr = [];
    updateState('filteredData', CountryData);
    StateData.map(item => {
      if (professionData.office_country === item.country_name) {
        arr.push({name: item.name, flag: '🇮🇳', dial_code: '+91'});
      }
    });
    updateState('searchStateData', arr);
    updateState('filteredStateData', arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      professionData.occupation &&
      professionData.company_name &&
      professionData.designation &&
      professionData.office_state &&
      professionData.office_city &&
      professionData.office_address_line1
    ) {
      if (
        professionData.occupation.trim().length !== 0 &&
        professionData.company_name.trim().length !== 0 &&
        professionData.designation.trim().length !== 0 &&
        professionData.office_state.trim().length !== 0 &&
        professionData.office_city.trim().length !== 0 &&
        professionData.office_address_line1.trim().length !== 0
      ) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [
    professionData.occupation,
    professionData.company_name,
    professionData.designation,
    professionData.office_state,
    professionData.office_city,
    professionData.office_address_line1,
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

  const setSelectedIndex = (val, id) => {
    occupationData.map((item, index) => {
      if (index === id) {
        occupationData[index].selected = true;
      } else {
        occupationData[index].selected = false;
      }
    });
    setOccupationData(occupationData);
    updateState('occupation', val.value);
    setRefreshFlatList(!refreshFlatList);
  };

  const handleNext = latLong => {
    let requestObj = {
      ...residentData,
      ...professionData,
      office_lat: latLong.lat,
      office_long: latLong.lng,
    };
    requestObj = _.pickBy(requestObj, value => {
      return !(value === true || value === false);
    });
    navigate(NavigationRoutes.SOCIAL_SCREEN, {
      professionData: requestObj,
      isFromEditProfile,
    });
  };

  const getLocationAddress = async () => {
    let bindAddrString = `${professionData.office_address_line1},${professionData.office_address_line2},${professionData.office_city},${professionData.office_state},${residentData.country},${professionData.office_zip_code}`;
    Geocoder.init(GOOGLE_API_KEY);
    await Geocoder.from(bindAddrString)
      .then(json => {
        var location = json.results[0].geometry.location;
        handleNext(location);
      })
      .catch(error => console.warn(error));
  };
  const renderOrView = () => (
    <View style={CommonStyle.orView}>
      <View style={CommonStyle.separator} />
      <Text style={CommonStyle.orTxt}>OR</Text>
      <View style={CommonStyle.separator} />
    </View>
  );
  const renderCountryPicker = () => (
    <Modal
      animationType="slide"
      transparent
      visible={professionData.isCountryPickerVisible}>
      <View style={Style.modalView}>
        <View style={Style.searchBarView}>
          <SearchBar
            variant="active"
            onPressClose={() => onClose()}
            label="Search country"
            onPressClear={() => onChangeText('')}
            onChangeText={text => onChangeText(text)}
            value={professionData.searchTxt}
            color={Colors.COLOR_GREY}
          />
        </View>
        <ScrollView>
          <View style={Style.pickerView}>
            {professionData?.filteredData?.map(item => (
              <>
                <TouchableOpacity
                  style={[
                    Style.rowContainer,
                    {
                      backgroundColor:
                        professionData?.office_country === item.name
                          ? Colors.COLOR_THEME_OPACITY
                          : null,
                    },
                  ]}
                  onPress={() => {
                    onPressSelectCountry(item.name, item.flag, item.dial_code);
                    onChangeText('');
                  }}>
                  <Text style={Style.codeText}>{item.flag}</Text>
                  <View style={Style.content}>
                    {/* <Text variant={Const.caption} style={Style.itemText}>
                      {`(${item.dial_code})`}
                    </Text> */}
                    <Text
                      variant={Const.h4}
                      style={[Style.itemText, {width: '80%'}]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderStatePicker = () => (
    <Modal
      animationType="slide"
      transparent
      visible={professionData.isStatePickerVisible}>
      <View style={Style.modalView}>
        <View style={Style.searchBarView}>
          <SearchBar
            variant="active"
            onPressClose={() => onCloseState()}
            label="Search state"
            onPressClear={() => onChangeStateText('')}
            onChangeText={text => onChangeStateText(text)}
            value={professionData.searchStateTxt}
            color={Colors.COLOR_GREY}
          />
        </View>
        <ScrollView>
          <View style={Style.pickerView}>
            {professionData?.filteredStateData?.map(item => (
              <>
                <TouchableOpacity
                  style={[
                    Style.rowContainer,
                    {
                      backgroundColor:
                        professionData?.office_state === item.name
                          ? Colors.COLOR_THEME_OPACITY
                          : null,
                    },
                  ]}
                  onPress={() => {
                    onPressSelectState(item.name, item.flag, item.dial_code);
                    onChangeStateText('');
                  }}>
                  <Text style={Style.codeText}>{item.flag}</Text>
                  <View style={Style.content}>
                    {/* <Text variant={Const.caption} style={Style.itemText}>
                      {`(${item.dial_code})`}
                    </Text> */}
                    <Text
                      variant={Const.h4}
                      style={[Style.itemText, {width: '80%'}]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const renderCityPicker = () => (
    <Modal
      animationType="slide"
      transparent
      visible={professionData.isCityPickerVisible}>
      <View style={Style.modalView}>
        <View style={Style.searchBarView}>
          <SearchBar
            variant="active"
            onPressClose={() => onCloseCity()}
            label="Search city"
            onPressClear={() => onChangeCityText('')}
            onChangeText={text => onChangeCityText(text)}
            value={professionData.searchCityTxt}
            color={Colors.COLOR_GREY}
          />
        </View>
        <ScrollView>
          <View style={Style.pickerView}>
            {professionData?.filteredCityData?.map(item => (
              <>
                <TouchableOpacity
                  style={[
                    Style.rowContainer,
                    {
                      backgroundColor:
                        professionData?.office_city === item.name
                          ? Colors.COLOR_THEME_OPACITY
                          : null,
                    },
                  ]}
                  onPress={() => {
                    onPressSelectCity(item.name);
                    onChangeCityText('');
                  }}>
                  <Text style={Style.codeText}>{item.flag}</Text>
                  <View style={Style.content}>
                    {/* <Text variant={Const.caption} style={Style.itemText}>
                      {`(${item.dial_code})`}
                    </Text> */}
                    <Text
                      variant={Const.h4}
                      style={[Style.itemText, {width: '80%'}]}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Divider />
              </>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const onChangeText = text => {
    updateState('searchTxt', text);
    const filteredData = professionData.searchTxt
      ? CountryData?.filter(x =>
          x.name?.toLowerCase().includes(text.toLowerCase()),
        )
      : CountryData;
    updateState('filteredData', filteredData);
  };

  const onChangeStateText = async text => {
    if (text.trim().length === 0) {
      updateState('searchStateTxt', text);
      updateState('filteredStateData', professionData.searchStateData);
    } else {
      updateState('searchStateTxt', text);
      const filteredData = professionData.searchStateData?.filter(x =>
        x.name?.toLowerCase().includes(text.toLowerCase()),
      );
      updateState('filteredStateData', filteredData);
    }
  };

  const onChangeCityText = async text => {
    if (text.trim().length === 0) {
      updateState('searchCityTxt', text);
      updateState('filteredCityData', professionData.searchCityData);
    } else {
      updateState('searchCityTxt', text);
      const filteredData = professionData.searchCityData?.filter(x =>
        x.name?.toLowerCase().includes(text.toLowerCase()),
      );
      updateState('filteredCityData', filteredData);
    }
  };

  const onPressSelectCountry = async (name, flag, dial_code) => {
    let arr = [];
    updateState('isCountryPickerVisible', false);
    updateState('office_country', name);
    StateData.map(item => {
      if (name === item.country_name) {
        arr.push({name: item.name, flag, dial_code});
      }
    });
    updateState('office_state', '');
    updateState('office_city', '');
    updateState('searchStateData', arr);
    updateState('filteredStateData', arr);
  };

  const onClose = () => {
    onChangeText('');
    updateState('isCountryPickerVisible', false);
  };

  const onPressSelectState = (name, flag, dial_code) => {
    let arr = [];
    updateState('isStatePickerVisible', false);
    updateState('office_state', name);
    // CitiesData.map(item => {
    //   if (name === item.state_name) {
    //     arr.push({name: item.name, flag, dial_code});
    //   }
    // });
    // updateState('searchCityData', arr);
    // updateState('filteredCityData', arr);
  };

  const onCloseState = () => {
    onChangeStateText('');
    updateState('isStatePickerVisible', false);
  };

  const onPressSelectCity = name => {
    updateState('isCityPickerVisible', false);
    updateState('office_city', name);
  };

  const onCloseCity = () => {
    onChangeCityText('');
    updateState('isCityPickerVisible', false);
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.PD}
          showProgressBar
          hdrTitleVariant={Const.h2}
          prgWidth={'75%'}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            value={professionData.occupation}
            label={Strings.AUTH_SECTION.USER_INFO.OCCUPATION}
            onFocus={() => {
              updateState('isPickerVisible', true);
            }}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('isPickerVisible', true)}
          />
          <TextInput
            value={professionData.company_name}
            label={Strings.AUTH_SECTION.USER_INFO.CMPNY_NAME}
            onChangeText={text => {
              updateState('company_name', text);
            }}
          />
          <TextInput
            value={professionData.designation}
            label={Strings.AUTH_SECTION.USER_INFO.DESIGNATION}
            onChangeText={text => {
              updateState('designation', text);
            }}
          />
          <TextInput
            value={professionData.year_of_joining}
            label={Strings.AUTH_SECTION.USER_INFO.YR_JOIN}
            onChangeText={text => {
              updateState('year_of_joining', text);
            }}
            keyboardType={'numeric'}
            maxLength={4}
          />
          <TextInput
            value={professionData.office_email}
            label={Strings.AUTH_SECTION.USER_INFO.OFFICE_EMAIL}
            keyboardType="email-address"
            onChangeText={text => {
              updateState('office_email', text);
            }}
            returnKeyType={Strings.next}
            // isError={!professionData.isValidateEmail}
            // helperText={
            //   !professionData.isValidateEmail ? 'Invalid Email Id' : undefined
            // }
          />
          <TextInput
            value={professionData.office_country}
            label={Strings.AUTH_SECTION.USER_INFO.COUNTRY}
            returnKeyType={Strings.next}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('isCountryPickerVisible', true)}
            onFocus={() => updateState('isCountryPickerVisible', true)}
          />
          <TextInput
            value={professionData.office_state}
            label={Strings.AUTH_SECTION.USER_INFO.STATE}
            onChangeText={text => {
              updateState('office_state', text);
            }}
            returnKeyType={Strings.next}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('isStatePickerVisible', true)}
            onFocus={() => updateState('isStatePickerVisible', true)}
          />
          <View style={Styles.contentView}>
            <TextInput
              value={professionData.office_city}
              label={Strings.AUTH_SECTION.USER_INFO.CITY}
              onChangeText={text => {
                updateState('office_city', text);
              }}
              returnKeyType={Strings.next}
              width={159}
              showDropDown
              // showRightIcon
              // onPressRightIcon={() => updateState('isCityPickerVisible', true)}
              // onFocus={() => updateState('isCityPickerVisible', true)}
              // isHalfField={true}
            />
            <TextInput
              value={professionData.office_zip_code}
              label={Strings.AUTH_SECTION.USER_INFO.ZIP}
              onChangeText={text => {
                updateState('office_zip_code', text);
              }}
              returnKeyType={Strings.next}
              width={159}
              maxLength={7}
            />
          </View>
          <TextInput
            value={professionData.office_address_line1}
            label={Strings.AUTH_SECTION.USER_INFO.ADDR_1}
            onChangeText={text => {
              updateState('office_address_line1', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={professionData.office_address_line2}
            label={Strings.AUTH_SECTION.USER_INFO.ADDR_2}
            onChangeText={text => {
              updateState('office_address_line2', text);
            }}
            returnKeyType={Strings.next}
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
            () => getLocationAddress(),
            '',
            Colors.COLOR_WHITE,
            '',
            professionData.isValidData,
          )}
        </View>
        <ItemPicker
          data={occupationData}
          visible={professionData.isPickerVisible}
          onRequestClose={() => updateState('isPickerVisible', false)}
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SLCT_OCC}
          onPress={(item, index) => setSelectedIndex(item, index, false)}
          extraData={refreshFlatList}
        />
        {renderCountryPicker()}
        {renderStatePicker()}
        {renderCityPicker()}
      </>
    </SafeAreaView>
  );
};

export default ProfessionScreen;
