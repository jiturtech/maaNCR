import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images} from '../../../assets';
import {Button, Header, Spacer, Text, TextInput} from '../../../components';
import KeyboardAwareScrollView from '../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import {Colors, CommonStyle} from '../../../theme';
import Styles from './style';

const AccountSelection = props => {
  const {navigation, route} = props;

  const [forgetData, setForgetData] = useState();

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
        <View style={Styles.profileView}>
          <Image source={Images.PRFL_PLACE_HLDR} style={Styles.prfImg} />
        </View>
        <Text variant={Const.h3} style={Styles.nameStyle}>
          {'Vinay P.'}
        </Text>
        <Spacer space={3} />
        <Button
          buttonTxt={Strings.AUTH_SECTION.FORGET.SEND_SMS}
          textVariant={Const.button1}
          buttonStyle={CommonStyle.btnStyleFooter}
          onPress={() =>
            navigate(NavigationRoutes.OTP_SCREEN, {
              routeFrom: 'forget_SMS',
            })
          }
          buttonColor={Colors.COLOR_BLACK}
          borderColor={Colors.COLOR_BODR}
          buttonVariant="outlined"
          outlineBackgroundColor={Colors.COLOR_GREY_NEW}
        />
        <Button
          buttonTxt={Strings.AUTH_SECTION.FORGET.SEND_EMAIL}
          textVariant={Const.button1}
          buttonStyle={CommonStyle.btnStyleFooter}
          onPress={() =>
            navigate(NavigationRoutes.OTP_SCREEN, {
              routeFrom: 'forget_EMAIL',
            })
          }
          buttonColor={Colors.COLOR_BLACK}
          borderColor={Colors.COLOR_BODR}
          buttonVariant="outlined"
          outlineBackgroundColor={Colors.COLOR_GREY_NEW}
        />
      </>
    </SafeAreaView>
  );
};

export default AccountSelection;
