import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../../../assets';
import {
  Button,
  Header,
  ItemPicker,
  Text,
  TextInput,
} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {
  Const,
  ImagePicker,
  NavigationRoutes,
  Strings,
} from '../../../../constants';
import {IMAGE_PICKER} from '../../../../constants/Const';
import {goBack, navigate} from '../../../../services/navigationServices';
import {
  Colors,
  CommonStyle,
  showToastAlert,
  showToastSuccess,
} from '../../../../theme';
import Styles from './style';
import * as actions from '../../../../store/actions';
import {BASE_URL} from '@env';

const ProfileScreen = props => {
  const {navigation, route} = props;
  const {socialData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    photo_url: isFromEditProfile ? userInfo?.photo_url : '',
    isPickerVisible: false,
    isValidData: true,
    image_res_url: isFromEditProfile ? userInfo?.photo_url : '',
  };
  const [profileData, setProfileData] = useState(initialState);
  const dispatch = useDispatch();

  const updateState = (stateName, value) => {
    setProfileData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    if (profileData.photo_url) {
      if (profileData.photo_url.trim().length !== 0) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [profileData.photo_url]);

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

  const uploadImage = async type => {
    let response = await ImagePicker(type, dispatch);
    updateState('photo_url', response.path);
    updateState('isPickerVisible', false);
    const formdata = new FormData();
    formdata.append('imageOfShope', {
      uri: response.path,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    dispatch(
      actions.uploadFileApiAction(formdata, res => {
        if (res.status === 200) {
          updateState('image_res_url', res.data.data.id);
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };
  const handleFinish = () => {
    let obj = {
      ...socialData,
      photo_url: `${BASE_URL + 'assets/' + profileData.image_res_url}`,
      role: '88441068-847f-4245-be51-feac5eb71aea',
    };
    if (isFromEditProfile) {
      dispatch(
        actions.updateProfileApiAction(obj, userInfo.id, res => {
          if (res.status === 200) {
            navigate('Profile');
            showToastSuccess('Your details are saved successfully.');
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        }),
      );
    } else {
      dispatch(
        actions.signUpApiAction(obj, res => {
          if (res.status === 200) {
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: NavigationRoutes.WELCOME_SCREEN,
                },
              ],
            });
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        }),
      );
    }
  };
  const renderNotes = () => (
    <View style={CommonStyle.noteContainer}>
      <Text
        variant="h4"
        style={{
          color: 'black',
          marginTop: 5,
        }}>
        {'Note '}
      </Text>
      <Text variant="body2" style={CommonStyle.noteTxt}>
        {'Profile picture is mandatory to upload.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SET_PROFILE}
          hdrTitleVariant={Const.h2}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <View style={Styles.profileView}>
            <View style={Styles.content}>
              <Image
                source={
                  profileData.photo_url !== ''
                    ? {uri: profileData.photo_url}
                    : Images.PRFL_PLACE_HLDR
                }
                style={Styles.prfImg}
              />

              <TouchableOpacity
                onPress={() => updateState('isPickerVisible', true)}
                style={Styles.touch}>
                <Image source={Images.EDIT} style={Styles.edit} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            value={`${socialData.first_name} ${socialData.last_name}`}
            label={Strings.AUTH_SECTION.SIGN_UP.NAME}
            editable={false}
          />
          <TextInput
            value={String(socialData.graduation_year)}
            label={Strings.AUTH_SECTION.USER_INFO.GRA_YR}
            editable={false}
          />
          <TextInput
            value={socialData.degree_course}
            label={Strings.AUTH_SECTION.USER_INFO.COURSE}
            editable={false}
          />
          <TextInput
            value={socialData.branch}
            label={Strings.AUTH_SECTION.USER_INFO.BRANCH}
            editable={false}
          />
          {renderNotes()}
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
            true,
          )}
          {renderButton(
            Strings.FINISH,
            Const.button1,
            CommonStyle.btnStyle,
            () => handleFinish(),
            '',
            Colors.COLOR_WHITE,
            '',
            profileData.isValidData,
          )}
        </View>
        <ItemPicker
          type={'imagePicker'}
          data={IMAGE_PICKER}
          visible={profileData.isPickerVisible}
          onRequestClose={() => updateState('isPickerVisible', false)}
          onPress={(item, index) => uploadImage(item.value)}
        />
      </>
    </SafeAreaView>
  );
};

export default ProfileScreen;
