import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../../assets/images';
import {ItemPicker, Text} from '../../../components';
import {Const, ImagePicker, NavigationRoutes} from '../../../constants';
import {IMAGE_PICKER} from '../../../constants/Const';
import {navigate} from '../../../services/navigationServices';
import {Colors, Layout} from '../../../theme';
import DetailScreen from './details';
import GalleryScreen from './gallery';
import Styles from './style';
import TimeLineScreen from './timeLine';
const ProfileUserScreen = props => {
  const [routes] = React.useState([
    {id: 0, key: 'first', title: 'Timeline'},
    {id: 1, key: 'second', title: 'Gallery'},
    // {id: 2, key: 'third', title: 'Details'},
  ]);
  const initialState = {
    photo_url: '',
    isPickerVisible: false,
  };
  const [index, setIndex] = useState(0);
  const [profileUserData, setProfileUserData] = useState(initialState);
  const dispatch = useDispatch();
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const updateState = (stateName, value) => {
    setProfileUserData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
    });
  }, [props.navigation]);

  const renderHeaderIcons = (image, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={Styles.icons} />
    </TouchableOpacity>
  );

  const uploadImage = async type => {
    let response = await ImagePicker(type, dispatch);
    updateState('photo_url', response.path);
    updateState('isPickerVisible', false);
  };

  const FirstRoute = () => <TimeLineScreen props={props} />;

  const SecondRoute = () => <GalleryScreen props={props} />;

  // const thirdRoute = () => <DetailScreen props={props} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
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
    if (route.title === 'Timeline') {
      setIndex(0);
    } else if (route.title === 'Gallery') {
      setIndex(1);
    }
    //  else if (route.title === 'Details') {
    //   setIndex(2);
    // }
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
    <View style={Styles.container}>
      <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
      <ImageBackground
        defaultSource={images.PLACEHOLDER_PROFILE}
        source={
          profileUserData.photo_url !== ''
            ? {uri: profileUserData.photo_url}
            : images.PLACEHOLDER_PROFILE
        }
        style={Styles.imgPlace}>
        <SafeAreaView>
          <View style={Styles.content}>
            {renderHeaderIcons(images.SETTING, () => {})}
            {renderHeaderIcons(images.CAMERA, () =>
              updateState('isPickerVisible', true),
            )}
          </View>
        </SafeAreaView>
        <View style={Styles.profileView}>
          <View style={Styles.content1}>
            <Image
              defaultSource={images.PRFL_PLACE_HLDR}
              source={{uri: userInfo?.photo_url}}
              style={Styles.userImg}
            />
            <TouchableOpacity
              onPress={() =>
                navigate(NavigationRoutes.SIGN_UP_SCREEN, {
                  isFromEditProfile: true,
                })
              }
              style={Styles.touch}>
              <Image source={images.EDIT} style={Styles.edit} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={Styles.userInfo}>
        <Text numberOfLines={1} variant={Const.h3} style={Styles.userText}>
          {`${userInfo?.first_name} ${userInfo?.last_name}`}
        </Text>
        <Text numberOfLines={1} variant={Const.body2} style={Styles.userText}>
          {`${userInfo?.designation} ,${userInfo?.year_of_joining}`}
        </Text>
      </View>
      <TabView
        swipeEnabled={false}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Layout.SCREEN_WIDTH}}
        renderTabBar={renderTab}
        animationEnabled
      />
      <ItemPicker
        type={'imagePicker'}
        data={IMAGE_PICKER}
        visible={profileUserData.isPickerVisible}
        onRequestClose={() => updateState('isPickerVisible', false)}
        onPress={(item, index) => uploadImage(item.value)}
      />
    </View>
  );
};

export default ProfileUserScreen;
