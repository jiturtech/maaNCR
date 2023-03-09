import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Header, Spacer, TextInput} from '../../../components';
import KeyboardAwareScrollView from '../../../components/kBScrollView';
import {Const, Strings} from '../../../constants';
import {validateEmail} from '../../../constants/Common';
import {goBack} from '../../../services/navigationServices';
import * as actions from '../../../store/actions';
import {Colors, CommonStyle, showToastAlert} from '../../../theme';
import Styles from './style';

const ForgetScreen = props => {
  const {navigation, route} = props;
  const initialState = {
    email: '',
    isValidData: true,
  };
  const [forgetData, setForgetData] = useState(initialState);
  const dispatch = useDispatch();
  const updateState = (stateName, value) => {
    setForgetData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  useEffect(() => {
    if (forgetData.email) {
      if (
        forgetData.email.trim().length !== 0 &&
        validateEmail(forgetData.email.trim())
      ) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [forgetData.email]);

  const handleForgetPass = () => {
    dispatch(
      actions.forgetPasswordApiAction({email: forgetData.email}, res => {
        if (res.status === 204 || res.status === 200) {
          goBack();
        } else {
          showToastAlert(res.data?.message);
        }
      }),
    );
  };

  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Spacer space={3} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.FORGET.FIND}
          hdrTitleStyle={Styles.hdrTitleStyle}
          hdrSubTitleStyle={Styles.hdrTitleStyle}
          hdrSubTitle={Strings.AUTH_SECTION.FORGET.MOBILE_TITLE}
          hdrTitleVariant={Const.h2}
        />
        <Spacer space={3} />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            label={Strings.AUTH_SECTION.SIGN_IN.EMAIL}
            keyboardType="email-address"
            onChangeText={text => {
              updateState('email', text);
            }}
            returnKeyType={Strings.next}
          />
          <Spacer space={3} />
          <Button
            buttonTxt={Strings.NEXT}
            textVariant={Const.button5}
            buttonStyle={CommonStyle.btnStyleFooter}
            onPress={() => handleForgetPass()}
            disable={!forgetData.isValidData}
            shadow={forgetData.isValidData}
            borderColor={Colors.COLOR_WHITE}
          />
        </KeyboardAwareScrollView>
      </>
    </SafeAreaView>
  );
};

export default ForgetScreen;
