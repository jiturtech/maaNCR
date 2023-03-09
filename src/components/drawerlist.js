import {DrawerItemList} from '@react-navigation/drawer';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import images from '../assets/images';
import {Const} from '../constants';
import {Colors, CommonStyle, Metrics, scale} from '../theme';
import Text from './Text';
function DrawerList({props}) {
  const {userDetails} = useSelector(state => state.authReducer);
  let userInfo;
  if (userDetails !== null && Array.isArray(userDetails)) {
    userInfo = userDetails[0];
  } else {
    userInfo = userDetails;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileView}>
        <Image
          defaultSource={images.PRFL_PLACE_HLDR}
          source={{uri: userInfo?.photo_url}}
          style={styles.imgStyle}
        />
        <View>
          <Text numberOfLines={2} variant={Const.h5} style={styles.txtStyle}>
            {`${userInfo?.first_name} ${userInfo?.last_name}`}
          </Text>
          {/* <TouchableOpacity onPress={() => navigate('Profile')}>
            <Text variant={Const.h4} style={styles.viewTxt}>
              {Strings.view_profile}
            </Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.iconView}>
          <Icon
            name="close"
            type="materialicon"
            size={25}
            color={Colors.COLOR_GREY}
            onPress={() => props.navigation.closeDrawer()}
          />
        </View>
      </View>
      <Divider style={CommonStyle.divider} />
      <ScrollView>
        <DrawerItemList {...props} />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },
  profileView: {
    width: '100%',
    height: scale(120),
    alignItems: Metrics.ALIGN.CENTER,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
  },
  imgStyle: {
    width: scale(70),
    height: scale(70),
    marginHorizontal: scale(15),
    borderRadius: scale(35),
  },
  txtStyle: {width: scale(130)},
  iconView: {
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(20),
    top: scale(38),
  },
  viewTxt: {color: Colors.COLOR_BLUE, top: scale(5)},
});

export default DrawerList;
