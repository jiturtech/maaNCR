import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {SearchBar, Text} from '../../../components';
import {Const, Strings} from '../../../constants';
import {Colors, Layout, showToastAlert} from '../../../theme';
import Styles from './style';
import LiveScreen from './liveScreen';
import OfficeScreen from './officeScreen';
import ResidentScreen from './residentScreen';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../store/actions';
import {GOOGLE_API_KEY} from '@env';

const LocationScreen = props => {
  const [index, setIndex] = React.useState(0);
  const initialState = {
    locListData: [
      {
        latitude: 23.0350842,
        longitude: 72.666122,
        businessName: '',
        imagePath: '',
        businessDescription: '',
        address: '',
      },
      {
        latitude: '',
        longitude: '',
        businessName: '',
        imagePath: '',
        businessDescription: '',
        address: '',
      },
      {
        latitude: '',
        longitude: '',
        businessName: '',
        imagePath: '',
        businessDescription: '',
        address: '',
      },
    ],
    search: '',
    isKeyboardVisible: false,
  };
  const [locationData, setLocationData] = useState(initialState);
  const dispatch = useDispatch();
  const {loginData} = useSelector(state => state.authReducer);
  const [users, setUsers] = useState([]);
  const [routes] = React.useState([
    {id: 0, key: 'first', title: 'Live'},
    {id: 1, key: 'second', title: 'Residence'},
    {id: 2, key: 'third', title: 'Office'},
  ]);
  const updateState = (stateName, value) => {
    setLocationData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        updateState('isKeyboardVisible', true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        updateState('isKeyboardVisible', false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [locationData.isKeyboardVisible]);

  const onChangeText = text => {
    updateState('search', text);
    if (text === '') {
      updateState('locationData', locationData.locListData);
    } else {
      const filteredData = locationData.locListData?.filter(x =>
        x?.name?.toLowerCase().includes(text.toLowerCase()),
      );
      updateState('locationData', [...filteredData]);
    }
  };
  useEffect(() => {
    requestLocation();
    getUsers();
  }, []);

  const getUsers = () => {
    dispatch(
      actions.getUsersApiAction(loginData?.access_token, res => {
        if (res.status === 200) {
          setUsers(res.data);
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };
  const requestLocation = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse').then(res => {
        if (res === 'granted') {
          getCurrentLocation();
        } else if (res === 'denied') {
          Alert.alert('Alert', res);
        } else if (res === 'disabled') {
          Alert.alert('Alert', res);
        } else if (res === 'restricted') {
          Alert.alert('Alert', res);
        }
      });
    } else {
      requestLocationPermission();
    }
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Current Location Permission',
          message:
            'MAA NCR App needs access to your Location ' +
            'so you can get best stores near you',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        getLocationAddress(latitude, longitude);
      },
      error => {},
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getLocationAddress = (lat, lng) => {
    Geocoder.init(GOOGLE_API_KEY);
    Geocoder.from(lat, lng)
      .then(json => {
        let address1 = json.results[0].address_components[1].long_name;
        let address2 = json.results[0].address_components[2].long_name;
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const FirstRoute = () => <LiveScreen props={props} data={users} />;

  const SecondRoute = () => <ResidentScreen props={props} data={users} />;

  const thirdRoute = () => <OfficeScreen props={props} data={users} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: thirdRoute,
  });
  const _renderLabel = ({route}) => (
    <View style={Styles.mainLabelView}>
      <Text
        variant={index === route.id ? Const.h4 : Const.body2}
        style={{
          color: index === route.id ? Colors.COLOR_BLACK : Colors.COLOR_GREY,
          width: 100,
          textAlign: 'center',
        }}>
        {route.title}
      </Text>
      {index === route.id && <View style={Styles.indicatorStyle} />}
    </View>
  );

  const onPressTab = ({route, preventDefault}) => {
    if (route.title === 'Live') {
      setIndex(0);
    } else if (route.title === 'Residence') {
      setIndex(1);
    } else if (route.title === 'Office') {
      setIndex(2);
    }
  };
  const renderTab = props => {
    return (
      <TabBar
        {...props}
        onTabPress={onPressTab}
        indicatorStyle={{height: 0}}
        renderLabel={_renderLabel}
        style={Styles.tabStyle}
      />
    );
  };
  return (
    <SafeAreaView style={Styles.container}>
      <TabView
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Layout.SCREEN_WIDTH}}
        renderTabBar={renderTab}
      />
      <View
        style={[
          Styles.searchBarView,
          {bottom: locationData.isKeyboardVisible ? 350 : 70},
        ]}>
        <SearchBar
          onPressClose={() => {}}
          label={Strings.EVENTS.SEARCH_TEXT}
          onPressClear={() => onChangeText('')}
          onChangeText={text => onChangeText(text)}
          value={locationData.search}
          color={Colors.COLOR_BLACK}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;
