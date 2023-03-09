import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Divider,
  Header,
  SearchBar,
  Text,
  TextInput,
} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../../constants';
import {goBack, navigate} from '../../../../services/navigationServices';
import {Colors, CommonStyle, Metrics} from '../../../../theme';
import Style from './style';
import CountryData from '../../../../services/country.json';
import {useSelector} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@env';
import StateData from '../../../../constants/states.json';
// import CitiesData from '../../../../constants/cities.json';
const ResidentScreen = props => {
  const {navigation, route} = props;
  const {educationData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    country: isFromEditProfile ? userInfo?.country : 'India',
    state: isFromEditProfile ? userInfo?.state : '',
    city: isFromEditProfile ? userInfo?.city : '',
    zip_code: isFromEditProfile ? userInfo?.zip_code : '',
    address_line1: isFromEditProfile ? userInfo?.address_line1 : '',
    address_line2: isFromEditProfile ? userInfo?.address_line2 : '',
    landMark: isFromEditProfile ? userInfo?.landMark : '',
    isValidData: true,
    filteredData: [],
    searchTxt: '',
    isPickerVisible: false,
    filteredStateData: [],
    isStatePickerVisible: false,
    searchStateTxt: '',
    searchStateData: [],

    filteredCityData: [],
    isCityPickerVisible: false,
    searchCityTxt: '',
    searchCityData: [],
  };

  const [residentData, setResidentData] = useState(initialState);

  const updateState = (stateName, value) => {
    setResidentData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    let arr = [];
    updateState('filteredData', CountryData);
    StateData.map(item => {
      if (residentData.country === item.country_name) {
        arr.push({name: item.name, flag: '🇮🇳', dial_code: '+91'});
      }
    });
    updateState('searchStateData', arr);
    updateState('filteredStateData', arr);
  }, []);

  useEffect(() => {
    if (
      residentData.country &&
      residentData.state &&
      residentData.city &&
      residentData.zip_code &&
      residentData.address_line1
    ) {
      if (
        residentData.country.trim().length !== 0 &&
        residentData.state.trim().length !== 0 &&
        residentData.city.trim().length !== 0 &&
        residentData.zip_code.trim().length !== 0 &&
        residentData.address_line1.trim().length !== 0
      ) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [
    residentData.country,
    residentData.state,
    residentData.city,
    residentData.zip_code,
    residentData.address_line1,
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

  const renderCountryPicker = () => (
    <Modal
      animationType="slide"
      transparent
      visible={residentData.isPickerVisible}>
      <View style={Style.modalView}>
        <View style={Style.searchBarView}>
          <SearchBar
            variant="active"
            onPressClose={() => onClose()}
            label="Search country"
            onPressClear={() => onChangeText('')}
            onChangeText={text => onChangeText(text)}
            value={residentData.searchTxt}
            color={Colors.COLOR_GREY}
          />
        </View>
        <ScrollView>
          <View style={Style.pickerView}>
            {residentData?.filteredData?.map(item => (
              <>
                <TouchableOpacity
                  style={[
                    Style.rowContainer,
                    {
                      backgroundColor:
                        residentData?.country === item.name
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
      visible={residentData.isStatePickerVisible}>
      <View style={Style.modalView}>
        <View style={Style.searchBarView}>
          <SearchBar
            variant="active"
            onPressClose={() => onCloseState()}
            label="Search State"
            onPressClear={() => onChangeStateText('')}
            onChangeText={text => onChangeStateText(text)}
            value={residentData.searchStateTxt}
            color={Colors.COLOR_GREY}
          />
        </View>
        <ScrollView>
          <View style={Style.pickerView}>
            {residentData?.filteredStateData?.map(item => (
              <>
                <TouchableOpacity
                  style={[
                    Style.rowContainer,
                    {
                      backgroundColor:
                        residentData?.country === item.name
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
      visible={residentData.isCityPickerVisible}>
      <View style={Style.modalView}>
        <View style={Style.searchBarView}>
          <SearchBar
            variant="active"
            onPressClose={() => onCloseCity()}
            label="Search City"
            onPressClear={() => onChangeCityText('')}
            onChangeText={text => onChangeCityText(text)}
            value={residentData.searchCityTxt}
            color={Colors.COLOR_GREY}
          />
        </View>
        <ScrollView>
          <View style={Style.pickerView}>
            {residentData?.filteredCityData?.map(item => (
              <>
                <TouchableOpacity
                  style={[
                    Style.rowContainer,
                    {
                      backgroundColor:
                        residentData?.country === item.name
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
    const filteredData = residentData.searchTxt
      ? CountryData?.filter(x =>
          x.name?.toLowerCase().includes(text.toLowerCase()),
        )
      : CountryData;
    updateState('filteredData', filteredData);
  };

  const onChangeStateText = async text => {
    if (text.trim().length === 0) {
      updateState('searchStateTxt', text);
      updateState('filteredStateData', residentData.searchStateData);
    } else {
      updateState('searchStateTxt', text);
      const filteredData = residentData.searchStateData?.filter(x =>
        x.name?.toLowerCase().includes(text.toLowerCase()),
      );
      updateState('filteredStateData', filteredData);
    }
  };

  const onChangeCityText = async text => {
    if (text.trim().length === 0) {
      updateState('searchCityTxt', text);
      updateState('filteredCityData', residentData.searchCityData);
    } else {
      updateState('searchCityTxt', text);
      const filteredData = residentData.searchCityData?.filter(x =>
        x.name?.toLowerCase().includes(text.toLowerCase()),
      );
      updateState('filteredCityData', filteredData);
    }
  };

  const onPressSelectCountry = async (name, flag, dial_code) => {
    let arr = [];
    updateState('isPickerVisible', false);
    updateState('country', name);
    StateData.map(item => {
      if (name === item.country_name) {
        arr.push({name: item.name, flag, dial_code});
      }
    });
    updateState('state', '');
    updateState('city', '');
    updateState('searchStateData', arr);
    updateState('filteredStateData', arr);
  };

  const onClose = () => {
    onChangeText('');
    updateState('isPickerVisible', false);
  };

  const onPressSelectState = (name, flag, dial_code) => {
    let arr = [];
    updateState('isStatePickerVisible', false);
    updateState('state', name);
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
    updateState('city', name);
  };

  const onCloseCity = () => {
    onChangeCityText('');
    updateState('isCityPickerVisible', false);
  };
  const handleNext = latLong => {
    let requestObj = {
      ...educationData,
      country: residentData.country,
      state: residentData.state,
      city: residentData.city,
      zip_code: residentData.zip_code,
      address_line1: residentData.address_line1,
      address_line2: residentData.address_line2,
      landMark: residentData.landMark,
      residence_lat: latLong.lat,
      residence_long: latLong.lng,
    };
    navigate(NavigationRoutes.PROFESSION_SCREEN, {
      residentData: requestObj,
      isFromEditProfile,
    });
  };

  const getLocationAddress = async () => {
    let bindAddrString = `${residentData.address_line1},${residentData.address_line2},${residentData.city},${residentData.state},${residentData.country},${residentData.zip_code}`;
    Geocoder.init(GOOGLE_API_KEY);
    await Geocoder.from(bindAddrString)
      .then(json => {
        var location = json.results[0].geometry.location;
        handleNext(location);
      })
      .catch(error => console.warn(error));
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.RI}
          showProgressBar
          hdrTitleVariant={Const.h2}
          prgWidth={'60%'}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            value={residentData.country}
            label={Strings.AUTH_SECTION.USER_INFO.COUNTRY}
            returnKeyType={Strings.next}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('isPickerVisible', true)}
            onFocus={() => updateState('isPickerVisible', true)}
          />
          <TextInput
            value={residentData?.state}
            label={Strings.AUTH_SECTION.USER_INFO.STATE}
            onChangeText={text => {
              updateState('state', text);
            }}
            returnKeyType={Strings.next}
            showDropDown
            showRightIcon
            onPressRightIcon={() => updateState('isStatePickerVisible', true)}
            onFocus={() => updateState('isStatePickerVisible', true)}
          />
          <View style={Style.contentView}>
            <TextInput
              value={residentData?.city}
              label={Strings.AUTH_SECTION.USER_INFO.CITY}
              onChangeText={text => {
                updateState('city', text);
              }}
              returnKeyType={Strings.next}
              width={159}
              // showDropDown
              // showRightIcon
              // onPressRightIcon={() => updateState('isCityPickerVisible', true)}
              // onFocus={() => updateState('isCityPickerVisible', true)}
              // isHalfField={true}
            />
            <TextInput
              value={residentData?.zip_code}
              label={Strings.AUTH_SECTION.USER_INFO.ZIP}
              onChangeText={text => {
                updateState('zip_code', text);
              }}
              returnKeyType={Strings.next}
              width={159}
              maxLength={7}
            />
          </View>
          <TextInput
            value={residentData?.address_line1}
            label={Strings.AUTH_SECTION.USER_INFO.ADDR_1}
            onChangeText={text => {
              updateState('address_line1', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={residentData?.address_line2}
            label={Strings.AUTH_SECTION.USER_INFO.ADDR_2}
            onChangeText={text => {
              updateState('address_line2', text);
            }}
            returnKeyType={Strings.next}
          />
          <TextInput
            value={residentData?.landMark}
            label={Strings.AUTH_SECTION.USER_INFO.LANDMARK}
            onChangeText={text => {
              updateState('landMark', text);
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
            residentData.isValidData,
          )}
        </View>

        {renderCountryPicker()}
        {renderStatePicker()}
        {renderCityPicker()}
      </>
    </SafeAreaView>
  );
};

export default ResidentScreen;
