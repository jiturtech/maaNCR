import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Button, Header, TextInput} from '../../../../components';
import KeyboardAwareScrollView from '../../../../components/kBScrollView';
import {Const, NavigationRoutes, Strings} from '../../../../constants';
import {goBack, navigate} from '../../../../services/navigationServices';
import {Colors, CommonStyle} from '../../../../theme';

const ProfessionScreen = props => {
  const {navigation, route} = props;
  const {professionData, isFromEditProfile} = route?.params;
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  console.log(userInfo);
  const initialState = {
    linkedin_url: isFromEditProfile ? userInfo?.linkedin_url : '',
    facebook_url: isFromEditProfile ? userInfo?.facebook_url : '',
    instagram_url: isFromEditProfile ? userInfo?.instagram_url : '',
    twitter_url: isFromEditProfile ? userInfo?.twitter_url : '',
    koo_link: isFromEditProfile ? userInfo?.koo_link : '',
  };
  const [socialData, setSocialData] = useState(initialState);
  const updateState = (stateName, value) => {
    setSocialData(prevState => ({
      ...prevState,
      [stateName]: value,
    }));
  };

  const renderButton = (
    buttonTxt,
    textVariant,
    buttonStyle,
    routeName,
    buttonVariant,
    buttonColor,
    borderColor,
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
    />
  );
  function bindWebUrl(baseUrl, url) {
    let webUrl;
    if (url.length === 1) {
      webUrl = `${baseUrl}${url}`;
    } else if (url.length === 2) {
      webUrl = '';
    } else webUrl = url;
    return webUrl;
  }
  return (
    <SafeAreaView style={CommonStyle.container}>
      <>
        <StatusBar backgroundColor={Colors.COLOR_BLACK} hidden={false} />
        <Header
          hdrTitle={Strings.AUTH_SECTION.USER_INFO.SLD}
          showProgressBar
          hdrTitleVariant={Const.h2}
          prgWidth={'90%'}
        />
        <KeyboardAwareScrollView
          nestedScrollEnabled={true}
          onKeyboardDidHide={() => {}}>
          <TextInput
            value={socialData.linkedin_url}
            label={Strings.AUTH_SECTION.USER_INFO.LINKEDIN}
            onChangeText={text => {
              let bindUrl = bindWebUrl('https://', text);
              updateState(
                'linkedin_url',
                bindUrl
                  .trim()
                  .replace(
                    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
                    '',
                  ),
              );
            }}
          />
          <TextInput
            value={socialData.facebook_url}
            label={Strings.AUTH_SECTION.USER_INFO.FACEBOOK}
            onChangeText={text => {
              let bindUrl = bindWebUrl('https://', text);
              updateState(
                'facebook_url',
                bindUrl
                  .trim()
                  .replace(
                    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
                    '',
                  ),
              );
            }}
          />
          <TextInput
            value={socialData.instagram_url}
            label={Strings.AUTH_SECTION.USER_INFO.INSTA}
            onChangeText={text => {
              let bindUrl = bindWebUrl('https://', text);
              updateState(
                'instagram_url',
                bindUrl
                  .trim()
                  .replace(
                    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
                    '',
                  ),
              );
            }}
          />
          <TextInput
            value={socialData.twitter_url}
            label={Strings.AUTH_SECTION.USER_INFO.TWITTER}
            onChangeText={text => {
              let bindUrl = bindWebUrl('https://', text);
              updateState(
                'twitter_url',
                bindUrl
                  .trim()
                  .replace(
                    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
                    '',
                  ),
              );
            }}
          />
          <TextInput
            value={socialData.koo_link}
            label={Strings.AUTH_SECTION.USER_INFO.KOO}
            onChangeText={text => {
              let bindUrl = bindWebUrl('https://', text);
              updateState(
                'koo_link',
                bindUrl
                  .trim()
                  .replace(
                    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,
                    '',
                  ),
              );
            }}
          />
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
          )}
          {renderButton(Strings.NEXT, Const.button1, CommonStyle.btnStyle, () =>
            navigate(NavigationRoutes.PROFILE_SCREEN, {
              socialData: {
                ...professionData,
                ...socialData,
              },
              isFromEditProfile,
            }),
          )}
        </View>
      </>
    </SafeAreaView>
  );
};

export default ProfessionScreen;
