import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from '../../../assets';
import {Button, DrawerHeader, Text} from '../../../components';
import {Const} from '../../../constants';
import NavigationRoutes from '../../../constants/NavigationRoutes';
import {navigate} from '../../../services/navigationServices';
import * as actions from '../../../store/actions';
import {
  Colors,
  CommonStyle,
  CustomAlertWithAction,
  showToastAlert,
} from '../../../theme';
import styles from './style';

const RequestScreen = props => {
  const [requestData, setRequestData] = useState([]);
  const dispatch = useDispatch();
  const {userDetails, loginData} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }

  useEffect(() => {
    getPendingUsers();
  }, []);
  const getPendingUsers = () => {
    dispatch(
      actions.invitedUsersApiAction(
        userInfo.referalsid,
        loginData?.access_token,
        res => {
          console.log(res.data.data);
          if (res.status === 200) {
            setRequestData(res.data.data);
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        },
      ),
    );
  };

  const renderItems = ({item, index}) => {
    const userData = item?.user_created;
    return (
      <View style={styles.touch}>
        <Image source={{uri: userData?.photo_url}} style={styles.image} />
        <View style={styles.content1}>
          <Text variant="button1" style={styles.btnTxt}>
            {`${userData.first_name} ${userData.last_name}`}
          </Text>

          <Text variant="body1" style={styles.text1} numberOfLines={1}>
            {`Course: ${userData.degree_course}`}
          </Text>
          <Text variant="body1" style={styles.text1} numberOfLines={1}>
            {`Branch: ${userData.branch}`}
          </Text>

          <Text variant="body1" style={styles.text1}>
            {`Graduation Year: ${userData?.graduation_year}`}
          </Text>
          <View style={styles.imageView}>
            {renderSocialImages(Images.KOO, userData?.koo_link, 'Koo')}
            {renderSocialImages(
              Images.LINKEDIN,
              userData?.linkedin_url,
              'LinkedIn',
            )}
            {renderSocialImages(
              Images.TWITTER,
              userData?.twitter_url,
              'Twitter',
            )}
            {renderSocialImages(
              Images.FACEBOOK,
              userData?.facebook_url,
              'Facebook',
            )}
            {renderSocialImages(
              Images.INSTAGRAM,
              userData?.instagram_url,
              'Instagram',
            )}
          </View>
          {renderButtonContent(userData, item.id)}
        </View>
      </View>
    );
  };
  const renderSocialImages = (image, PRIVACY_POLICY_URL, hdrTitle) => (
    <TouchableOpacity
      onPress={() =>
        navigate(NavigationRoutes.WEBVIEW_SCREEN, {
          headerTitle: hdrTitle,
          webUrl: PRIVACY_POLICY_URL,
        })
      }>
      <Image source={image} style={styles.socialIcon} />
    </TouchableOpacity>
  );
  const renderButtonContent = (userData, inviteId) => (
    <View style={styles.btnView}>
      {renderButton(
        'Reject',
        Const.button1,
        styles.btnStyle,
        () => handleReject(userData, inviteId),
        'outlined',
        Colors.COLOR_THEME,
        Colors.COLOR_THEME,
      )}
      {renderButton(
        'Accept',
        Const.button1,
        styles.btnStyle,
        () => handleAccept(userData, inviteId),
        '',
        Colors.COLOR_WHITE,
        '',
      )}
    </View>
  );
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
    />
  );

  const handleAccept = (userData, inviteId) => {
    dispatch(
      actions.updateInvitedUserStatusApiAction(
        {status: 'approved'},
        inviteId,
        loginData?.access_token,
        res => {
          console.log(res);
          if (res.status === 200) {
            handleChangeUserStatus(userData.id, 'approved');
          } else {
            showToastAlert(res.data?.message);
          }
        },
      ),
    );
  };
  const handleReject = (userData, inviteId) => {
    dispatch(
      actions.updateInvitedUserStatusApiAction(
        {status: 'denied'},
        inviteId,
        loginData?.access_token,
        res => {
          console.log('denied', res);
          if (res.status === 200) {
            handleChangeUserStatus(userData.id, 'denied');
          } else {
            showToastAlert(res.data?.message);
          }
        },
      ),
    );
  };

  const handleChangeUserStatus = (userId, status) => {
    dispatch(
      actions.changeUserStatusApiAction(
        {user_status: status},
        userId,
        loginData?.access_token,
        res => {
          console.log('changeUserStatusApiAction', res);
          if (res.status === 200) {
            CustomAlertWithAction({
              title: 'Accepted',
              msg: 'You have invited your referral successfully.',
              onPress: () =>
                props.navigation.replace(NavigationRoutes.DRAWER_NAVIGATION),
            });
          } else {
            showToastAlert(res.data?.errors[0]?.message);
          }
        },
      ),
    );
  };
  return (
    <>
      <DrawerHeader
        title={'Pending Requests'}
        action={() => props.navigation.openDrawer()}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={requestData}
            renderItem={renderItems}
            ListEmptyComponent={
              <View style={CommonStyle.emptyList}>
                <Image
                  source={Images.EMPTY_LIST}
                  style={CommonStyle.emptyImage}
                />
              </View>
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default RequestScreen;
