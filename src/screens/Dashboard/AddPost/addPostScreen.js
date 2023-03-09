/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import images from '../../../assets/images';
import {ItemPicker, Text} from '../../../components';
import {Const, ImagePicker, Strings} from '../../../constants';
import {iconSize, IMAGE_PICKER, postType} from '../../../constants/Const';
import {Colors, showToastAlert} from '../../../theme';
import Styles from './styles';
import {SelectCountry} from 'react-native-element-dropdown';
import * as actions from '../../../store/actions';
import {BASE_URL} from '@env';
import {navigate} from '../../../services/navigationServices';

const AddPostScreen = props => {
  const initialState = {
    file: '',
    caption: '',
    isPickerVisible: false,
    selectedType: '',
    isValidData: true,
  };
  const [postData, setPostData] = useState(initialState);
  const postTextRef = useRef();
  const dispatch = useDispatch();
  const {userDetails, loginData} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const updateState = (stateName, value) => {
    setPostData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    postTextRef.current.focus();
  }, []);
  useEffect(() => {
    if (postData.caption && postData.file && postData.selectedType.label) {
      if (
        postData.caption.trim().length !== 0 ||
        postData.file.trim().length !== 0 ||
        postData.selectedType.label.trim().length !== 0
      ) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [postData.caption, postData.file, postData.selectedType.label]);

  const renderHeader = () => (
    <View style={Styles.hdrView}>
      <View style={Styles.iconCross}>
        <Icon
          name={'cross'}
          type={'entypo'}
          size={iconSize.size30}
          color={Colors.COLOR_LIGHT_GREY}
          onPress={() => navigate('Events')}
        />
      </View>
      <Text style={Styles.postTitle}>{Strings.EVENTS.POST}</Text>
      <TouchableOpacity
        disabled={!postData.isValidData}
        style={Styles.touchPostTitle}
        onPress={() => handleUploadPost()}>
        <Text
          variant={Const.h3}
          style={[
            Styles.btnPostTitle,
            {
              color: !postData.isValidData
                ? Colors.COLOR_GREY
                : Colors.COLOR_THEME,
            },
          ]}>
          {Strings.EVENTS.POST_TIMELINE}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const uploadImage = async type => {
    let response = await ImagePicker(type, dispatch);
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
          updateState('file', res.data.data.id);
        } else {
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };

  const handleUploadPost = () => {
    let request = {
      status: 'published',
      caption: postData.caption,
      file: postData.file,
      type: postData.selectedType.label.toLowerCase(),
    };
    dispatch(
      actions.uploadPostApiAction(request, loginData?.access_token, res => {
        if (res.status === 200) {
          navigate('Events');
        } else {
          navigate('Events');
          showToastAlert(res.data?.errors[0]?.message);
        }
      }),
    );
  };
  return (
    <View style={Styles.container}>
      {renderHeader()}
      <View style={Styles.nameView}>
        <Image
          style={Styles.userImg}
          defaultSource={images.PRFL_PLACE_HLDR}
          source={{uri: userInfo?.photo_url}}
        />
        <View style={Styles.userNameView}>
          <Text variant={Const.h6} style={Styles.userName} numberOfLines={1}>
            {`${userInfo?.first_name} ${userInfo?.last_name}`}
          </Text>
        </View>
        <SelectCountry
          style={Styles.dropdown}
          selectedTextStyle={Styles.selectedTextStyle}
          placeholderStyle={Styles.placeholderStyle}
          maxHeight={200}
          value={postData?.selectedType?.value}
          data={postType}
          valueField="value"
          labelField="label"
          placeholder="Select"
          onChange={e => {
            updateState('selectedType', e);
          }}
        />
      </View>
      <TextInput
        ref={postTextRef}
        value={postData.caption}
        onChangeText={text => {
          updateState('caption', text);
        }}
        style={Styles.inputStyle}
        multiline
        maxLength={150}
      />
      {postData.file !== '' && (
        <Image
          source={{uri: `${BASE_URL + 'assets/' + postData.file}`}}
          style={Styles.postImage}
        />
      )}
      <View style={Styles.footerView}>
        <TouchableOpacity onPress={() => updateState('isPickerVisible', true)}>
          <Image source={images.GALLERY} style={Styles.footerIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={images.POST_NOTES} style={Styles.footerIcon} />
        </TouchableOpacity>
      </View>
      <ItemPicker
        type={'imagePicker'}
        data={IMAGE_PICKER}
        visible={postData.isPickerVisible}
        onRequestClose={() => updateState('isPickerVisible', false)}
        onPress={(item, index) => uploadImage(item.value)}
      />
    </View>
  );
};

export default AddPostScreen;
