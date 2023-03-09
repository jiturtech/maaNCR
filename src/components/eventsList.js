import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import images from '../assets/images';
import {Divider, Text} from '../components';
import {CalculateTime, Const} from '../constants';
import {iconSize} from '../constants/Const';
import {Colors, CommonStyle, Metrics, scale} from '../theme';
import {BASE_URL} from '@env';

const EventsList = ({item, onPress, onMarkFav, onShare}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.nameView}>
          <Image
            style={styles.userImg}
            defaultSource={images.PRFL_PLACE_HLDR}
            source={{uri: item?.user_created?.photo_url}}
          />
          <View style={styles.userNameView}>
            <Text variant={Const.h4} style={styles.userName} numberOfLines={1}>
              {`${item?.user_created?.first_name} ${item?.user_created?.last_name}`}
            </Text>
            <Text variant={Const.smallerText} style={styles.userTime}>
              {CalculateTime(item.date_created)}
            </Text>
          </View>

          {/* <TouchableOpacity style={styles.iconDots}>
            <Icon name="dots-three-vertical" type="entypo" />
          </TouchableOpacity> */}
        </View>
        <Image source={{uri: item.media}} style={styles.postImage} />
        <View style={styles.likeView}>
          <Icon
            name="ios-heart"
            type="ionicon"
            size={iconSize.size20}
            color={Colors.COLOR_RED}
          />
          <Text variant={Const.body2} style={styles.likeCount}>
            {item.likescount}
          </Text>
          {/* <Text variant={Const.body2} style={styles.commentCount}>
            {`${item.commentscount} comments`}
          </Text> */}
        </View>
        <Divider style={CommonStyle.divider} />
        <View style={styles.actionView}>
          <TouchableOpacity onPress={onMarkFav}>
            <Icon
              name={item.isLikedByUser ? 'ios-heart' : 'heart-outline'}
              type="ionicon"
              size={iconSize.size25}
              color={item.isLikedByUser ? Colors.COLOR_RED : Colors.COLOR_BLACK}
              style={styles.iconActions}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => {}}>
            <Image source={images.COMMENT} style={styles.iconActions} />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={onShare}>
            <Image source={images.SEND} style={styles.iconActions} />
          </TouchableOpacity>
        </View>
        <Text variant={Const.body2} style={styles.descStyle}>
          {item?.caption}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.COLOR_WHITE,
    flex: 1,
  },
  searchBarView: {
    height: scale(42),
    marginVertical: scale(20),
    marginHorizontal: scale(20),
  },
  content: {
    ...CommonStyle.shadowStyle,
    width: '95%',
    backgroundColor: Colors.COLOR_WHITE,
    marginVertical: scale(10),
    alignSelf: Metrics.ALIGN.CENTER,
    borderRadius: scale(10),
  },
  nameView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    padding: scale(15),
    marginLeft: scale(5),
  },
  userImg: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
  },
  userNameView: {
    width: '77%',
    alignSelf: Metrics.ALIGN.CENTER,
  },
  userName: {
    marginLeft: scale(12),
  },
  userTime: {
    marginLeft: scale(12),
    color: Colors.COLOR_NEW_GRAY,
  },
  iconDots: {marginLeft: scale(5), alignSelf: Metrics.ALIGN.CENTER},
  postImage: {
    width: '100%',
    height: scale(220),
    marginVertical: scale(5),
    backgroundColor: Colors.COLOR_BODR,
  },
  likeView: {
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    padding: scale(3),
    marginLeft: scale(10),
    marginVertical: scale(5),
  },
  likeCount: {
    marginLeft: scale(5),
    color: Colors.COLOR_NEW_GRAY,
    alignSelf: Metrics.ALIGN.CENTER,
  },
  commentCount: {
    marginLeft: scale(5),
    color: Colors.COLOR_NEW_GRAY,
    alignSelf: Metrics.ALIGN.FLEX_END,
    position: Metrics.POSITION.ABSOLUTE,
    right: scale(20),
  },
  iconActions: {
    marginLeft: scale(15),
    width: iconSize.size25,
    height: iconSize.size25,
  },
  actionView: {
    alignSelf: Metrics.ALIGN.FLEX_START,
    flexDirection: Metrics.FLEX_DIRECTION.ROW,
    marginVertical: scale(5),
  },
  descStyle: {
    marginHorizontal: scale(20),
    color: Colors.COLOR_NEW_GRAY,
    marginVertical: scale(10),
  },
});
export default EventsList;
