import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {Images} from '../../../assets';
import {Button, Text} from '../../../components';
import {Strings, Const, NavigationRoutes} from '../../../constants';
import {navigate} from '../../../services/navigationServices';
import {Colors, Metrics} from '../../../theme';
import styles from './style';

const WelcomeScreen = props => {
  const renderText = (textStyle, value, textVariant) => (
    <Text variant={textVariant} style={textStyle}>
      {value}
    </Text>
  );

  const renderButton = (
    buttonTxt,
    textVariant,
    buttonStyle,
    routeName,
    buttonVariant,
    buttonColor,
  ) => (
    <Button
      buttonTxt={buttonTxt}
      textVariant={textVariant}
      buttonStyle={buttonStyle}
      onPress={() =>
        navigate(
          routeName,
          routeName === NavigationRoutes.SIGN_UP_SCREEN && {
            isFromEditProfile: false,
          },
        )
      }
      buttonVariant={buttonVariant}
      buttonColor={buttonColor}
    />
  );
  return (
    <>
      <Image source={Images.WLCM_IMG_NEW} style={styles.image} />

      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />

        {renderText(
          styles.titleTxt,
          Strings.AUTH_SECTION.WLCM_CMS.TITLE,
          Const.h5,
        )}
        {renderText(
          styles.sub_titleTxt,
          Strings.AUTH_SECTION.WLCM_CMS.SUB_TITLE,
          Const.body2,
        )}
        <View style={styles.btnViewStyle}>
          {renderButton(
            Strings.AUTH_SECTION.WLCM_CMS.SIGN_UP,
            Const.button1,
            styles.btnStyle,
            NavigationRoutes.SIGN_UP_SCREEN,
          )}
          {renderButton(
            Strings.AUTH_SECTION.WLCM_CMS.SIGN_IN,
            Const.button1,
            styles.outerlineStyle,
            NavigationRoutes.SIGN_IN_SCREEN,
            'outlined',
            Colors.COLOR_BLACK,
          )}
        </View>
      </View>
    </>
  );
};

export default WelcomeScreen;
