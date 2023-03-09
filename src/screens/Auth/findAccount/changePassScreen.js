import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, StatusBar} from 'react-native';
import {Button, Header, Spacer, TextInput} from '../../../components';
import KeyboardAwareScrollView from '../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import {Colors, CommonStyle} from '../../../theme';
import Styles from './style';

const ChangePassScreen = props => {
  const {navigation, route} = props;
  const initialState = {
    new_passWord: '',
    confirm_passWord: '',
    isValidData: true,
    showNewPasswordText: true,
    showConfPasswordText: true,
  };
  const [changePassData, setChangePassData] = useState(initialState);
  const updateState = (stateName, value) => {
    setChangePassData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };
  useEffect(() => {
    if (changePassData.new_passWord && changePassData.confirm_passWord) {
      if (
        changePassData.new_passWord.trim().length !== 0 &&
        changePassData.confirm_passWord.trim().length !== 0
      ) {
        updateState('isValidData', true);
      } else {
        updateState('isValidData', false);
      }
    } else {
      updateState('isValidData', false);
    }
  }, [changePassData.new_passWord, changePassData.confirm_passWord]);

  const handleAction = () => {
    if (changePassData.new_passWord !== changePassData.confirm_passWord) {
      Alert.alert('Alert', Strings.AUTH_SECTION.FORGET.ALERT);
    } else {
      navigate(NavigationRoutes.SIGN_IN_SCREEN);
    }
  };
  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Spacer space={3} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.FORGET.CHANGE_PASS}
          hdrTitleStyle={Styles.hdrTitleStyle}
          hdrTitleVariant={Const.h2}
        />
        <Spacer space={3} />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            label={Strings.AUTH_SECTION.FORGET.NEW_PASS}
            showRightIcon
            showPassword={changePassData?.showNewPasswordText}
            onPressRightIcon={() => {
              changePassData.showNewPasswordText
                ? updateState('showNewPasswordText', false)
                : updateState('showNewPasswordText', true);
            }}
            onChangeText={text => {
              updateState('new_passWord', text);
            }}
          />

          <TextInput
            label={Strings.AUTH_SECTION.FORGET.CONF_PASS}
            showRightIcon
            showPassword={changePassData?.showConfPasswordText}
            onPressRightIcon={() => {
              changePassData.showConfPasswordText
                ? updateState('showConfPasswordText', false)
                : updateState('showConfPasswordText', true);
            }}
            onChangeText={text => {
              updateState('confirm_passWord', text);
            }}
          />
          <Spacer space={3} />
          <Button
            buttonTxt={Strings.AUTH_SECTION.FORGET.RESET}
            textVariant={Const.button5}
            buttonStyle={CommonStyle.btnStyleFooter}
            onPress={() => handleAction()}
            disable={!changePassData.isValidData}
            shadow={changePassData.isValidData}
            borderColor={Colors.COLOR_WHITE}
          />
        </KeyboardAwareScrollView>
      </>
    </SafeAreaView>
  );
};

export default ChangePassScreen;
