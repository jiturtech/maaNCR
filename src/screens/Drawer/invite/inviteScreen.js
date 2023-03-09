import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../../assets';
import {
  Button,
  Header,
  InvitationModal,
  ItemPicker,
  Spacer,
  TextInput,
} from '../../../components';
import KeyboardAwareScrollView from '../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {iconSize, IMAGE_PICKER} from '../../../constants/Const';
import {goBack, navigate} from '../../../services/navigationServices';
import {Colors, CommonStyle, Metrics, showToastAlert} from '../../../theme';
import Styles from './style';
import ImagePicker from 'react-native-image-crop-picker';
import {isIos} from '../../../constants/Strings';
import {validateEmail} from '../../../constants/Common';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../store/actions';

const InviteFriends = props => {
  const {navigation, route} = props;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  const initialState = {
    name: '',
    email: '',
    code: userInfo?.referalsid ? userInfo?.referalsid : '',
    isValidData: true,
    isValidateEmail: true,
    isInviteModal: false,
  };
  const [data, setData] = useState(initialState);
  const dispatch = useDispatch();
  const updateState = (stateName, value) => {
    setData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    if (data.name && data.email && data.code) {
      if (
        data.name.trim().length !== 0 &&
        data.email.trim().length !== 0 &&
        data.code.trim().length !== 0
      ) {
        if (validateEmail(data.email.trim())) {
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
  }, [data.name, data.email, data.code]);

  const handleInvite = () => {
    let mailContent = `Hello ${data.name}, your invitation code is ${userInfo?.referalsid} you can use this for signing in to the app . Do not share it with anyone.`;
    let emailReq = {
      to: data.email,
      subject: 'Malviyans Connect Invitation Code',
      text: mailContent,
    };
    dispatch(
      actions.sendEmailApiAction(emailReq, res => {
        if (res.status === 200) {
          updateState('isInviteModal', true);
        } else {
          showToastAlert(res.data?.message);
        }
      }),
    );
  };
  return (
    <View style={CommonStyle.container}>
      <>
        <Spacer space={3} />
        <Header
          hdrTitle={Strings.EVENTS.INVITE_HDR}
          hdrTitleVariant={Const.h2}
        />
        <TextInput
          value={data.name}
          label={Strings.REFER_FORM.NAME}
          onChangeText={text => {
            updateState('name', text);
          }}
        />
        <TextInput
          label={Strings.REFER_FORM.EMAIL_ID}
          keyboardType="email-address"
          onChangeText={text => {
            updateState('email', text);
          }}
          isError={!data.isValidateEmail}
          helperText={!data.isValidateEmail ? 'Invalid Email Id' : undefined}
        />
        <TextInput
          value={data.code}
          label={Strings.REFER_FORM.REFER_TXT}
          onChangeText={text => {
            updateState('code', text);
          }}
          maxLength={6}
          editable={false}
        />
        <View
          style={[CommonStyle.btnViewStyle, {alignSelf: Metrics.ALIGN.CENTER}]}>
          <Button
            buttonTxt={Strings.EVENTS.SEND_INVITE}
            textVariant={Const.button1}
            buttonStyle={CommonStyle.btnStyleFooter}
            disable={!data.isValidData}
            shadow={data.isValidData}
            onPress={() => {
              handleInvite();
            }}
          />
        </View>
      </>
      <InvitationModal
        visible={data.isInviteModal}
        status="success"
        onCloseModal={() => {
          goBack(), updateState('isInviteModal', false);
        }}
      />
      <View style={Styles.iconView}>
        <Icon
          name={'cross'}
          type={'entypo'}
          size={iconSize.size20}
          color={Colors.COLOR_BLACK}
          onPress={() => goBack()}
        />
      </View>
    </View>
  );
};

export default InviteFriends;
